const UserDetail = require('../model/UserDetailSchema')
const User = require('../model/UserSchema')


const createUserDetail = async (req, res) => {
    const {bio} = req.body
    const profile = req.file
    const UserId = req.user.id



    const checkuserDEtail = await UserDetail.findOne({ UserId })

    if (checkuserDEtail) {
        let userdetails;
        try {
            userdetails = await UserDetail.findByIdAndUpdate(checkuserDEtail._id, {
                bio,
                profile: profile.filename
            }, { new: true }) 
    
        } catch (err) {
            console.log(err)
        }
        if (!userdetails) {
            return res.status(400).json({ message: "unable to create" })
        }
        return res.status(200).json({ userdetails })

    } else {
        let userdetail;

        try {
            userdetail = new UserDetail({
                UserId,
                bio,
                profile: profile.filename
            })
            userdetail.save()

        } catch (err) {
            console.log(err)
        }
        if (!userdetail) {
            return res.status(400).json({ message: "unable to create" })
        }
        return res.status(200).json({ userdetail })
    }

}

const getALLUserDetail = async (req, res) => {

    let userdetails;

    try {
        userdetails = await UserDetail.find()
    } catch (err) {
        console.log(err)
    }
    if (!userdetails) {
        return res.status(400).json({ message: "unable to get" })
    }
    return res.status(200).json({ userdetails })
}

const deleteUserDetail = async (req, res) => {
    const id = req.params.id;
    let userdetails;

    try {
        userdetails = await UserDetail.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!userdetails) {
        return res.status(400).json({ message: "unable to delete" })
    }
    return res.status(200).json({ "message": "sucessfully deeted" })
}

const getUserDetailByID = async (req, res) => {
    const id = req.params.id;
    let userdetails;

    try {
        userdetails = await UserDetail.findById(id)
    } catch (err) {
        console.log(err)
    }
    if (!userdetails) {
        return res.status(400).json({ message: "unable to get" })
    }
    return res.status(200).json({ userdetails })
}

const allUsers = async (req, res) => {
    let users;

    try {
        users = await User.find()
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(400).json({ message: "unable to create" })
    }
    return res.status(200).json({ users })
}



const deleteUser = async (req, res) => {
    const id = req.params.id;
    let users;

    try {
        users = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!users) {
        return res.status(400).json({ message: "unable to delete" })
    }
    return res.status(200).json({ message: "sucessfully deleted" })
}



/*
const createUserDetail = async (req, res) => {
    let userdetails;

    try {

    } catch (err) {
        console.log(err)
    }
    if (!userdetails) {
        return res.status(400).json({ message: "unable to create" })
    }
    return res.status(200).json({ userdetails })
}


const createUserDetail = async (req, res) => {
    let userdetails;

    try {

    } catch (err) {
        console.log(err)
    }
    if (!userdetails) {
        return res.status(400).json({ message: "unable to create" })
    }
    return res.status(200).json({ userdetails })
}*/

exports.createUserDetail = createUserDetail
exports.allUsers = allUsers
exports.deleteUser = deleteUser
exports.deleteUserDetail = deleteUserDetail
exports.getUserDetailByID = getUserDetailByID
exports.getALLUserDetail = getALLUserDetail