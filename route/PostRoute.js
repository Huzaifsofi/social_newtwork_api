const express = require('express')
const route = express.Router()

const PostRoutes = require('../controller/PostController')
const authRoute = require('../controller/authController')

route.post('/', authRoute.jwtverify ,PostRoutes.createPost)
route.get('/', authRoute.jwtverify ,PostRoutes.viewALLPost)
route.put('/:id', authRoute.jwtverify ,PostRoutes.UpdatePost)
route.delete('/:id', authRoute.jwtverify ,PostRoutes.DeletePost)

route.get('/recentpost', authRoute.jwtverify ,PostRoutes.userViewReacent)
route.get('/followpost', authRoute.jwtverify ,PostRoutes.userViewFollowPost)

module.exports = route