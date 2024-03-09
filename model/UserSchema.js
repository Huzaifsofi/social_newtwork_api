const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    uuid: { type: String, required: true},
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    followerUserID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    }],
    followingUserID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    }],
})

const User = mongoose.model("social_user", UserSchema)

module.exports = User