const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

//create a user using: POST "/api/auth/createuser". doesnt require authorization

router.post('/createuser', [ // this is an array part of the arguments

    body('name', 'Enter a valid name').isLength({min: 3}), // min length
    body('email', 'Enter a valid email').isEmail(), // checking if its an actual email, the second line shows when incorrect
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),

    ], async (req, res)=>
    {   
        // req = request
        // res = response
        const errors = validationResult(req);

        if (!errors.isEmpty()) // checking if the input is correct according to the checks given in the array
        {
            return res.status(400).json({errors: errors.array()});
        }

        try
        {
            // check whether the email exists already
            let user = await User.findOne({email: req.body.email});
            if (user)
            {
                return res.status(400).json({error: "Sorry, a user with this email already exists"})
            }

            const salt = bcrypt.genSalt(10);
            const sec_pass = bcrypt.hash(req.body.password, salt);

            // creates a new user
            user = await User.create ({
                name: req.body.name,
                password: sec_pass,
                email: req.body.email
            })
            res.json({"res": "response"})
        }
        catch (error)
        {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
})

module.exports = router;