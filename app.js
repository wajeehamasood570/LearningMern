const dotenv = require('dotenv')
const mongoose = require('mongoose');
const express = require('express');
const app = express();


dotenv.config({ path : './config.env' });
require('./db/conn.js');

const User = require('./models/userSchema');

const PORT = process.env.PORT;

app.use(express.json());

app.use(require('./router/auth'));

const middleware = (req, res, next) => {
 console.log(`welcome to middleware`);
 next();
}

app.get('/home', (req, res) => {
    res.send(`welcome to home`);
    console.log("welcome to home page");
})



app.get('/about', middleware,  (req, res) => {
    res.send(`welcome to about`);
    console.log("welcome to about page");
});

app.get('/contact', (req, res) => {
    res.send(`welcome to conatct`);
    console.log("welcome to conatct page");
});
app.listen(PORT, () => {
    console.log(`welcome to home page at port ${PORT}`);
});