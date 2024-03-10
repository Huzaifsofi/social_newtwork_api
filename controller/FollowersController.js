const User = require('../model/UserSchema')

const followUser = async (req, res) => {
    const user = req.user.id;
    const follower_peroson = req.params.id;

    let following_person;
    let followed_person;
    try {
        following_person = await User.findById(user);
        following_person.followingUserID.push(follower_peroson)
        await following_person.save();

        followed_person = await User.findById(follower_peroson)
        followed_person.followerUserID.push(user)
        await followed_person.save()
        
        res.status(200).json({ message: 'Follow successful' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const UnfollowUser = async (req, res) => {
    const user = req.user.id;
    const follower_person = req.params.id;

    try {
        // Find the user who is following
        const following_person = await User.findById(user);
        // Remove the follower's ID from the following person's followingUserID array
        const index = following_person.followingUserID.indexOf(follower_person);
        if (index !== -1) {
            following_person.followingUserID.splice(index, 1);
        }
        await following_person.save(); // Save changes to the database

        // Find the follower
        const followed_person = await User.findById(follower_person);
        // Remove the user's ID from the follower's followerUserID array
        const followerIndex = followed_person.followerUserID.indexOf(user);
        if (followerIndex !== -1) {
            followed_person.followerUserID.splice(followerIndex, 1);
        }
        await followed_person.save(); // Save changes to the database

        // Optionally, you might want to send a response indicating success
        res.status(200).json({ message: 'Unfollow successful' });
    } catch (err) {
        console.log(err);
        // Handle the error appropriately, such as sending an error response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.followUser = followUser
exports.UnfollowUser = UnfollowUser