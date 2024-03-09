const mongoose = require('mongoose')

const UserDetailSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    },
    bio: { type: String },
    profile: { type: String },
})

const UserDetail = mongoose.model('social_user_detail', UserDetailSchema)

module.exports = UserDetail