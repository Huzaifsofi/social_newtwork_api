const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8000;

const app = express();

const PostRoute = require('./route/PostRoute');
const authRoute = require('./route/authRoute');
const userDetail = require('./route/userDetailRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authRoute);
app.use('/post', PostRoute);
app.use('/user', userDetail)

app.listen(PORT, () => console.log(`Running on port: ${PORT}`));

mongoose.connect('mongodb+srv://huzaif:huzaifmtb@cluster0.tkpiyzu.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0',
).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});