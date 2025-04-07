const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { verifyToken } = require('../middleware/auth')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ message: 'User already exists' })

    const hashed = await bcrypt.hash(password, 10)
    const newUser = new User({ username, email, password: hashed })
    await newUser.save()
    res.status(201).json({ message: 'User created' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, username: user.username })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

router.get('/user', verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password') // important: select('-password')
      if (!user) return res.status(404).json({ message: 'User not found' })
      res.json(user)
    } catch (err) {
      res.status(500).json({ message: 'Server error' })
    }
  })
  

module.exports = router