const express = require('express')
var User = require('../mongodb/models/user');
const jwt = require('jsonwebtoken')
const ejwt = require('express-jwt')
var mongoose = require('mongoose');
const Grid = require('gridfs-stream');

var {upload,mongooseConnection} = require('../mongodb/connect');

// Init gfs
var gfs;

mongooseConnection.once('open', () => {
  // Init stream
  gfs = Grid(mongooseConnection.db, mongoose.mongo);
  gfs.collection('uploads');
 
});

const router = express.Router()

// @route POST /reg
// @desc User registration.
router.post('/reg', async (req, res) => {

  //user registration
  try {
    const user = new User(req.body)
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).json({ 
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      gender:user.gender,
      day:user.day,
      month:user.month,
      year:user.year
    })
  } catch (error) {
    res.status(401).send(error)
  }
})

// @route POST /login
// @desc User login
router.post('/login', async(req, res) => {
  console.log(req.body)
  try {
      const { email, password } = req.body
      const user = await User.findByCredentials(email, password)

      if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }

      const token = await user.generateAuthToken()
/*       let data = {
        token : token,
        id : user._id
      } */
      res.status(201).json({token:token,id:user._id})
  } catch (error) {
    console.log(error)
      res.status(400).send({ error: error.message })
  }

})

// @route GET /user
// @desc Fing and get a user by id
  router.get('/user',ejwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }),async (req, res,next) => {
    const {firstname,lastname,email,_id} = await User.findOne({ _id: req.user._id})

    const user = {
      firstname,
      lastname,
      email,
      _id
    }
   res.json({ user})
  })

  // @route POST /getPublicUserById
  // @desc Get public information about a user by id
  router.post('/getPublicUserById', async (req, res) => {
 if(mongoose.Types.ObjectId.isValid(req.body.id))
    var doesUserExists = await User.exists({ _id: req.body.id })

if(!doesUserExists) {
  res.status(404).end()  
}else{
  await User.findById( req.body.id, (err, user) => {
    if(err) {
      res.status(404).end()  
    }
    else {
      res.status(201).json({
        firstname : user.firstname,
        lastname : user.lastname,
        gender : user.gender,
        day : user.day,
        month : user.month,
        year : user.year
      })
    }
})
}
  })


  // @route POST /getNotifications
  // @desc Getting user notifications
  router.post('/getNotifications', async (req, res) => {
//req.body.id
   
let {notifications} = await User.findById( req.body.id)
         res.status(201).json(notifications)
  })

    // @route POST /getAvatarById
  // @desc Getting user's avatar by id
  router.post('/getAvatarById', async (req, res) => {
    //req.body.id
    let {avatar} = await User.findById(req.body.id)
             res.status(201).json(avatar)
      })

  // @route POST /getNumberOfPhotos
  // @desc Getting the number of user's photos
  router.post('/getNumberOfPhotos', async (req, res) => {
    //req.body.id
    let {photos} = await User.findById(req.body.id)
    res.status(201).json(photos.length)
      })

  // @route POST /uploadPhoto
  // @desc Uploading a photo
  router.post('/uploadAvatar', upload.single('file'), (req, res) => {
   /*console.log(req.file)
   console.log(req.body.userId)
   console.log('avatar')
   console.log(req.body.avatar)
   console.log('is')*/
   // delete the avatar from main array of photos, if an avatar already exists there.
   console.log(req.body.avatar)
   if(req.body.avatar) 
User.updateOne( {_id: req.body.userId}, { $pull: {photos: [req.body.avatar] } } )
   // Adding the avatar to the main array of photos and to the avatar field 
   User.updateOne({ _id: req.body.userId },{
     avatar: req.file.filename,
     $push: { photos: req.file.filename }
    },function (err, docs) { 
      if (err){ 
          console.log(err) 
      } 
      else{ 
          console.log("Updated Docs : ", docs); 
      } 
  });
   // console.log(resu)

  

    //res.json({ file: req.file });
    res.redirect('/');
  });


  // @route GET /image/:filename
// @desc Display Image.
router.get('/image/:filename', (req, res) => {

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
module.exports = router
