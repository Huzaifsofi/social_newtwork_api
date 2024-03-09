const mongoose = require('mongoose')

const FollowersSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    },
    followerUserID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    }],
    followingUserID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    }],
})

const Follower = require('follower', FollowersSchema)

module.exports = Follower