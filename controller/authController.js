const User = require('../model/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

const JWT_SECRERET_KEY = "12345"


const Signup = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        if (!name || !username || !password) {
            return res.status(400).json({ message: "please enter all the felds" });
        }

        const checkUsername = await User.findOne({ username });

        if (checkUsername) {
            return res.status(400).json({ message: "Username already used" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            uuid: uuidv4(),
            name,
            username,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ newUser });
        //return res.status(201).json({ message: "Successfully created account" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Unable to create account" });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "Username or password is incorrect" });
        }

        const checkPassword = await bcrypt.compare(password, existingUser.password);

        if (!checkPassword) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }

        const payload = {
            id: existingUser._id,
            username: existingUser.username
        };

        jwt.sign(
            payload,
            JWT_SECRERET_KEY,
            { expiresIn: 86400 },
            (err, token) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
                return res.json({
                    message: "Success",
                    token: "Bearer " + token
                });
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const jwtverify = async (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if (token) {
        jwt.verify(token, JWT_SECRERET_KEY, (err, decoded) => {
            if (err) {
                return res.json({
                    isLoggedIn: false,
                    message: "Failed to authenticate"
                })
            }
            req.user = {};
            req.user.id = decoded.id
            req.user.username = decoded.username
            next()
        })
    } else {
        res.json({ message: "Incorrect token given" })
    }
}

const checkuser = (req, res) => {
    return res.json({ username: req.user.username })
}

exports.Signup = Signup
exports.login = login
exports.jwtverify = jwtverify
exports.checkuser = checkuser