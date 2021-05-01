// Database functions

const NotesSchema = require("../models/note");

module.exports.addNewNote = (obj, callback) => {
    obj.save(callback);
};

module.exports.getNoteByTitle = (title, callback) => {
    NotesSchema.findOne({ title: title }, callback);
};

module.exports.getAllNotes = (callback) => {
    NotesSchema.find({}, callback);
};

module.exports.deleteNote = (title, callback) => {
    NotesSchema.deleteOne({ title: title }, callback);
};
