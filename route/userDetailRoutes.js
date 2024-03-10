const express = require('express')
const route = express.Router()
const multer = require('multer')
const path = require('path')

const UserDetailRoutes = require('../controller/UserDetailController')
const authRoute = require('../controller/authController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'../profile'))
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    } 
})

const upload = multer({ storage: storage });

route.post('/userdetial/' , authRoute.jwtverify, upload.single('profile') ,UserDetailRoutes.createUserDetail)
route.get('/userdetial/:id', UserDetailRoutes.getUserDetailByID)
route.get('/userdetial', UserDetailRoutes.getALLUserDetail)
route.delete('/userdetial/:id', UserDetailRoutes.deleteUserDetail)

route.get('/', UserDetailRoutes.allUsers)
route.delete('/:id', UserDetailRoutes.deleteUser)

module.exports = route
