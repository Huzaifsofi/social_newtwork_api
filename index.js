const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8000;

const app = express();

const PostRoute = require('./route/PostRoute');
const authRoute = require('./route/authRoute');
const userDetail = require('./route/userDetailRoutes')
const followRoute = require('./route/followRoute')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authRoute);
app.use('/post', PostRoute);
app.use('/user', userDetail)
app.use('/follow', followRoute)

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

mongoose.connect('',
).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});
