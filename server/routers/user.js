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
      let lastActivity = 'just now'
      let minutesOffline  =  Math.floor((new Date().getTime() - user.lastActivity.getTime())
      /(1000 * 60));
      let hoursOffline    =  Math.floor((new Date().getTime() - user.lastActivity.getTime())
      /(1000 * 60 * 60));
      let daysOffline     =  Math.floor((new Date().getTime() - user.lastActivity.getTime())
      /(1000 * 60 * 60 * 24));
console.log(minutesOffline)
console.log(hoursOffline)
console.log(daysOffline)
      if (hoursOffline < 1 && minutesOffline > 0) lastActivity = 
         `last seen ${minutesOffline}${minutesOffline == 1 ? ' minute': ' minutes'} ago`
      if (daysOffline  < 1 && hoursOffline   > 0) lastActivity = 
         `last seen ${hoursOffline}${hoursOffline == 1 ? ' hour': ' hours'} ago`
      if (daysOffline  < 28 && daysOffline   > 0) lastActivity = 
          `last seen ${daysOffline}${daysOffline == 1 ? ' day': ' days'} ago`
      if (daysOffline > 28) lastActivity = 
          `last seen 
          ${user.lastActivity.getDate()} 
          ${user.lastActivity.toLocaleString('en', { month: 'long' })}
          ${user.lastActivity.getFullYear()}`;

      res.status(201).json({
        firstname : user.firstname,
        lastname : user.lastname,
        gender : user.gender,
        day : user.day,
        month : user.month,
        year : user.year,
        publicAvatar : user.avatar,
        online : user.isOnline,
        lastActivity : lastActivity
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
  router.post('/uploadAvatar', upload.single('file'), async (req, res) => {

   // delete the avatar from main array of photos, if an avatar already exists there.

   if(req.body.avatar) 
await User.updateOne( {_id: req.body.userId}, { $pull: {photos: [req.body.avatar] } } )
   // Adding the avatar to the main array of photos and to the avatar field 
  await User.updateOne({ _id: req.body.userId },{
     avatar: req.file.filename,
     $push: { photos: req.file.filename }
    });
   // res.status(200).json({avatar:'avatarechik'})
   res.status(201).end()
  });


  // @route DELETE /deleteAvatar
// @desc Deleting current user's avatar
router.delete('/deleteAvatar', async (req, res) => {
  await User.updateOne( { avatar: req.body.avatar }, { $pull: {photos: req.body.avatar } } )
  await User.updateOne({ avatar: req.body.avatar },{avatar: ''})
  res.status(200)
})

  // @route GET /image/:filename
// @desc Display Image.
router.get('/image/:filename', async (req, res) => {
  await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
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

router.get('/time', async (req, res) => {
  res.json({time: new Date()})
})
  // @route PUT /changeOnline
  // @desc Changing online status or when a user was online
  router.put('/changeOnline', async (req, res) => {
    await User.updateOne({ _id: req.body.id },{isOnline: req.body.bool})
    if(!req.body.bool)
      await User.updateOne({ _id: req.body.id },{lastActivity: req.body.lastActivity})
    res.end()
      })
module.exports = router
