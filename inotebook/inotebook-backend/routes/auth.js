const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getuser = require('../middleware/getuser');

const JWT_SECRET = 'Yukiisagreatcoder'; // personal signature on web token that should ideally be hidden so put it in an env.local file or smth





// ROUTE 1: create a user using: POST "/api/auth/createuser". doesnt require authorization
router.post('/createuser', [ // this is an array part of the arguments

    body('name', 'Enter a valid name').isLength({min: 3}), // min length
    body('email', 'Enter a valid email').isEmail(), // checking if its an actual email, the second line shows when incorrect
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),

    ], async (req, res)=>
    {   
        // req = request
        // res = response
        let success = false;
        const errors = validationResult(req);

        if (!errors.isEmpty()) // checking if the input is correct according to the checks given in the array
        {
            return res.status(400).json({success, errors: errors.array()});
        }

        try
        {
            // check whether the email exists already
            let user = await User.findOne({email: req.body.email});
            if (user)
            {
                return res.status(400).json({success, error: "Sorry, a user with this email already exists"})
            }

            const salt = await bcrypt.genSalt(10);
            const sec_pass = await bcrypt.hash(req.body.password, salt);

            // creates a new user
            user = await User.create ({
                name: req.body.name,
                password: sec_pass,
                email: req.body.email
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, auth_token})
        }
        catch (error)
        {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
})






// ROUTE 2: authenticate a user using: POST "/api/auth/login". doesnt require authorization
router.post('/login', [ // this is an array part of the arguments
    body('email', 'Enter a valid email').isEmail(), // checking if its an actual email, the second line shows when incorrect
    body('password', 'Password cannot be blank').exists(), // checking if its an actual email, the second line shows when incorrect
    ], async (req, res)=>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) // checking if the input is correct according to the checks given in the array
        {
            let success = false;
            return res.status(400).json({errors: errors.array()});
        }
        
        const {email, password} = req.body;
        try
        {
            let user = await User.findOne({email});
            if (!user)
            {
                success = false;
                return res.status(400).json({error: "Please login with correct credentials"});
            }

            const password_compare = await bcrypt.compare(password, user.password);
            if (!password_compare)
            {
                success = false;
                return res.status(400).json({error: "Please login with correct credentials"});
            }

            const payload = {
                user: {
                    id: user.id
                }
            }
            const auth_token = jwt.sign(payload, JWT_SECRET);
            success = true;
            res.json({success, auth_token});

        }
        catch (error)
        {
            console.log(error.message);
            res.status(500).send("Internal server error");
        }

})







// ROUTE 3: get logged in user details using: POST "/api/auth/getuser". login required
router.post('/getuser', getuser, async (req, res) => {
    try
    {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // selects everything except the password
        res.send({user})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;