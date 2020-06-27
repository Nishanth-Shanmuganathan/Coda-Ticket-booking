const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const User = require('./../models/user')

const authRouter = express.Router()

authRouter.use(bodyParser.json())

authRouter.post('/login',async (req, res) => {
  // console.log('Login');
  
  const email =req.body.email;
  const password =req.body.password;
  try {
    const fetchedUser = await User.findOne({email})
    if (!fetchedUser) {
        return res.status(401).json({
        message: "AUTHENTICATION_DENIED"
      })
    }
    
    console.log(fetchedUser, fetchedUser.password);
    
    const passwordMatch = await bcrypt.compare(password, fetchedUser.password)
    if (!passwordMatch) {
       return res.status(401).json({
        message: "AUTHENTICATION_DENIED"
      })
    }

    const id =fetchedUser._id;
      const token = jwt.sign( {id} , process.env.JWT_STRING)
      res.status(200).json({
        token
      })
  } catch(error) {
    console.log(error);
    return res.status(401).json({
      message: 'AUTHENTICATION_DENIED',
    })
  }
})

authRouter.post('/register',async (req, res) => {
    const password = req.body.password
    const confirm = req.body.confirmPassword
    if (password !== confirm) {
      res.status(400).json({
        message: 'PASSWORD_MISMATCH'
      })
    }
    
  try {
      const hash = await bcrypt.hash(password, 8)
    const user = new User({
        email: req.body.email,
        password: hash
      })
      console.log(user);
      
      const response = await user.save()

      const token = jwt.sign({ id: user._id }, process.env.JWT_STRING)
      res.status(201).json({
        token
      });
  } catch (error) {
      console.log(error);
        res.status(400).json({
          message: 'EMAIL_ALREADY_EXISTS'      
    })
}
})

authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const id = jwt.verify(token, process.env.JWT_STRING)
    req.body._id = id.id
    next()
  } catch {
    res.status(401).json({
      message: 'AUTHENTICATION_DENIED',
    })
  }
}
module.exports = {authRouter,authenticate}