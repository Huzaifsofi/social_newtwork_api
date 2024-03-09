const express = require('express')
const route = express.Router()

const authRoutes = require('../controller/authController')

route.post('/signup', authRoutes.Signup)
route.post('/login', authRoutes.login)
route.get('/user', authRoutes.jwtverify, authRoutes.checkuser)

module.exports = route