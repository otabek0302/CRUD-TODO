const { Router } = require('express')
const router = Router()
const User = require('../model/User')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// Register users
router.post(
  '/registration',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Некореектный пароль').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }
      const { email, password } = req.body

      const isUser = await User.findOne({ email: email })
      if (isUser) {
        return res.status(300).json({ message: 'User already exists' })
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ 
            email, 
            password: hashPassword 
        })

      await user.save()
      res.status(200).json({ message: 'User successfully created' })
    } catch (error) {
      console.log('Error: ' + error)
    }
  }
)

// Login users
router.post(
    '/login',
    [
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Некореектный пароль').exists()
    ],
    async (req, res) => {
      try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Некорректные данные при регистрации'
          })
        }
        const { email, password } = req.body
  
        const user = await User.findOne({ email: email })
        if (!user) {
          return res.status(300).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(300).json({ message: 'Wrong password' })
        }

        const jwtSecret = '4nkj23n4kjn5r489nf9ukdfsj99023u490urjdhinsakaruy935oh48t5982890hrdnuri3r098f43fujksd'

        const token = jwt.sign({userId: user.id}, jwtSecret, {expiresIn: "1h"})

        res.json({token, userId: user.id});

        res.status(200).json({ message: 'User successfully login' })
    } catch (error) {
        console.log('Error: ' + error)
      }
    }
  )
  
module.exports = router
