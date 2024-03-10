const Post = require('../controller/PostController')

const ViewRecentPost = async (req, res) => {
    let viewposts;

    try {
        viewposts = await Post.find().sort({ upload_time: -1 });
    } catch (err) {
        console.log(err)
    }
    if (!viewposts) {
        return res.status(200).json({ message: "unable to get post" })
    }
    return res.status(200).json({ viewposts })
}

const ViewFollowingPost = async (req, res) => {
    let viewposts;
    const currentUser = req.user.id;

    try {
        const followingUsers = await User.findById(currentUser).populate('followingUserID');
    } catch (err) {
        console.log(err)
    }
    if (!viewposts) {
        return res.status(200).json({ message: "unable to get post" })
    }
    return res.status(200).json({ viewposts })
}

exports.ViewFollowingPost = ViewFollowingPost
exports.ViewRecentPost = ViewRecentPost