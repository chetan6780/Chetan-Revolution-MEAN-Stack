// show notes : get
// create notes : post
// delete notes : delete

const express = require("express");
const router = express.Router();

const NoteModel = require("../models/note");
const Note = require("../controllers/note-controller");

// GET route
router.get("/", (req, res) => {
    console.log("notes get rout");

    Note.getAllNotes((err, notes) => {
        if (err) throw err;
        res.json({ success: true, message: "hello in notes", notes: notes });
    });
});

// POST route
router.post("/", (req, res) => {
    console.log("notes post rout");

    const obj = new NoteModel({
        title: req.body.title,
        description: req.body.description,
        date: new Date(),
    });
    console.log(obj);

    // Database logic
    Note.getNoteByTitle(obj.title, (err, note) => {
        if (err) throw err;
        if (note)
            return res.json({
                success: false,
                message: "Note with same title already exists!",
            });

        Note.addNewNote(obj, (err, added) => {
            if (err) throw err;
            console.log("Added new note");
            res.json({ success: true, message: "New note added successfully." });
        });
    });
});

// DELETE route
router.delete("/", (req, res) => {
    console.log("notes delete rout");

    const title = req.query.title;
    Note.deleteNote(title, (err, deleted) => {
        if (err) throw err;
        console.log("Note deleted");
        res.json({ success: true, message: "Note deleted successfully." });
    });
});

module.exports = router;
