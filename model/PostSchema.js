const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    text_content: { type: String },
    upload_time: { type: Date, default: Date.now},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'social_user'
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post