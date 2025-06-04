const express = require('express');
const router = express.Router();
var getuser = require('../middleware/getuser');
const Note = require('../models/Note')
const {body, validationResult} = require('express-validator');




// ROUTE 1: get all the notes using: GET "/api/notes/", login required
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






// ROUTE 2: add a new note using: POST "/api/notes/addnote", login required
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







// ROUTE 3: update an existing note using: PUT "/api/notes/updatenote/:id"
router.put('/updatenote/:id', getuser, async (req, res)=>
{
    const {title, description, tag} = req.body;

    // create a new note object
    const new_note = {};

    if (title) {
        new_note.title = title;
    }
    if (description) {
        new_note.description = description;
    }
    if (tag) {
        new_note.tag = tag;
    }

    // find the node to be updated and update it
    let note = await Note.findById(req.params.id);

    if (!note)
    {
        return res.status(404).send("not found");
    }

    if (note.user.toString() !== req.user.id)
    {
        return req.status(401).send("not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: new_note}, {new: true});
    res.json({note});
})







// ROUTE 4: delete an existing note using: PUT "/api/notes/deletenote/:id"
router.put('/deletenote/:id', getuser, async (req, res)=>
{
    // find the node to be deleted and delete it
    let note = await Note.findById(req.params.id);

    if (!note)
    {
        return res.status(404).send("not found");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id)
    {
        return res.status(401).send("not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"successs": "note has been deleted"});
})



module.exports = router