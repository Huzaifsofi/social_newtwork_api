const Post = require('../model/PostSchema')


const createPost = async (req, res) => {
    const { text_content } = req.body;
    const user = req.user.id; 

    let posts;
    try {
        posts = new Post({
            user,
            text_content
        })
        await posts.save()
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: "unable to create post" })
    }
    return res.status(201).json({ posts })
}

const viewALLPost = async (req, res) => {
    const user = req.user.id; 

    let posts;
    try {
        posts = await Post.find({ user })
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: "unable to view post"  })
    }
    return res.status(201).json({ posts })
}

const DeletePost = async (req, res) => {
    const id = req.params.id;

    let posts;
    try {
        posts = await Post.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: "unable to delete post" })
    }
    return res.status(201).json({ posts })
}


const UpdatePost = async (req, res) => {
    const id = req.params.id;
    const { text_content } = req.body;

    let posts;
    try {
        posts = await Post.findByIdAndUpdate(id, {
            text_content
        }, { new: true })
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: "unable to update post" })
    }
    return res.status(201).json({ message: "unable to delete post" })
}

exports.createPost = createPost
exports.viewALLPost = viewALLPost
exports.DeletePost = DeletePost
exports.UpdatePost = UpdatePost