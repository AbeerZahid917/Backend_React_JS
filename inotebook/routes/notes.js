const express = require('express');
const router = express.Router();
var getuser = require('../middleware/getuser');
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator');




// ROUTE 1: get all the notes using: GET "/api/auth/", login required
router.get('/fetchallnotes', getuser, async (req, res)=>
{
    try
    {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch(error)
    {
        return res.status(500).send("Internal server Error");
    }
})






// ROUTE 2: add a new note using: POST "/api/auth/addnote", login required
router.post('/addnote', getuser, [

    body('title', 'Enter a valid title').isLength({min: 3}), 
    body('description', 'Enter a valid description').isLength({min: 5}), 
    
], async (req, res)=>
{
    try
    {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array})
        }
        
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saved_note = await note.save();
        res.json(saved_note)
    }
    catch (error) 
    {
        return res.status(500).send("Internal server Error");
    }

})



module.exports = router