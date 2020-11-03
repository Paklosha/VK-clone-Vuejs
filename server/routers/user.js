const express = require('express')
var User = require('../mongodb/models/user');
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken')
const ejwt = require('express-jwt')

const upload = require('../mongodb/connect')

const router = express.Router()

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
      year:user.year,
      token: token 
    })
  } catch (error) {
    res.status(401).send(error)
  }
})

router.post('/login', async(req, res) => {
  console.log('NOuuuuseeer')
  //Login a registered user
  try {
      const { email, password } = req.body
      console.log('Email is ' + email+ ' Password is '+ password)
      const user = await User.findByCredentials(email, password)
      if (!user) {
          return res.status(401).send({error: 'Login failed! Check authentication credentials'})
      }
      const token = await user.generateAuthToken()
      res.status(201).json({ 
        token: token 
      })
  } catch (error) {
    console.log(error)
      res.status(400).send({ error: error.message })
  }

})
  router.get('/user',ejwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }),async (req, res,next) => {
    console.log(await User.findOne({ _id: req.user._id}))
    //const data = jwt.verify(token, process.env.TOKEN_SECRET)
    const {firstname,lastname,email} = await User.findOne({ _id: req.user._id})
    const user = {
      firstname,
      lastname,
      email
    }
   res.json({ user})
  })

  router.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router