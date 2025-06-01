const express = require('express');
const router = express.Router();
const User = require('../models/User');


//create a user using: POST "/api/auth/". doesnt require authorization
router.post('/', async (req, res)=>{
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.send("hello");
})

module.exports = router;