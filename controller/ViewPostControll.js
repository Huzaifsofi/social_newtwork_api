const Post = require('../controller/PostController')

const ViewRecentPost = async (req, res) => {
    let viewposts;

    try {
        viewposts = await Post.findOne({}, {}, { sort: { 'createdAt' : -1 } }, (err, latestPost) => {
            if (err) {
              console.error('Error finding latest post:', err);
              return;
            }
        });  
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

    try {

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