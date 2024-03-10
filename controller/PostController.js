const Post = require('../model/PostSchema')
const User = require('../model/UserSchema')


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

const userViewReacent = async (req, res) => {
    let posts;

    try {
        posts = await Post.find().sort({ upload_time: -1 })
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: "unable to update post" })
    }
    return res.status(201).json({ posts })
    
}

const userViewFollowPost = async (req, res) => {
    try {
        const currentUser = req.user.id;
        console.log(currentUser)

        // Find users that the current user is following
        const followingUsers = await User.findById(currentUser).populate('followingUserID');
        console.log(followingUsers)

        // Extract user IDs from the followingUsers list
        const followingUserIds = followingUsers.followingUserID.map(user => user._id);

        // Find posts from users in the followingUserIds list
        const posts = await Post.find({ user: { $in: followingUserIds } }).sort({ upload_time: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createPost = createPost
exports.viewALLPost = viewALLPost
exports.DeletePost = DeletePost
exports.UpdatePost = UpdatePost
exports.userViewReacent = userViewReacent
exports.userViewFollowPost = userViewFollowPost