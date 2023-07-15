const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


require('../db/conn');
const User = require('../models/userSchema.js');

router.get('/', (req, res) => {
    res.send('hello from the router file')
})

// router.post('/register', (req,res) => {
//     console.log(req.body);
//     res.json({message: req.body});
// });



router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    console.log(req.body);
    // res.json({message: req.body});

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "filled the field properly" });
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "user already registered" })
        }

        const newUser = new User({ name, email, phone, work, password, cpassword });
        console.log(newUser);

        await newUser.save();

        res.status(501).json({ message: "user registered successfully" })

    } catch (err) {
        console.log(err);
    }
});


router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    console.log(req.body);

    if ( !email || !password) {
        return res.status(422).json({ error: "filled the data properly" });
    }

    try {

        const userlogin = await User.findOne({ email: email });
        console.log(userlogin);

        if (userlogin){
            res.json({message:"user signin successfully"});
        }else{
            res.json({message:"invalid details"});
        }

    } catch (err) {
        console.log(err);
    }


});


module.exports = router;