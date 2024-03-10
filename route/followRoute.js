const express = require('express')
const route = express.Router()

const followRoute = require('../controller/FollowersController')
const authController = require('../controller/authController')

route.get('/' , authController.jwtverify, followRoute.followUser)
route.get('/unfollow', authController.jwtverify, followRoute.UnfollowUser)

module.exports = route