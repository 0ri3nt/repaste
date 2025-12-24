const mongoose = require('mongoose');
const Note = require('../models/Note');

let connected = false;

async function connect(uri) {
  if (connected) return;
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  connected = true;
}

async function getNote(id) {
  return Note.findById(id).lean();
}

async function getNoteByCustomUrl(customUrl) {
  return Note.findOne({ customUrl }).lean();
}

async function saveNote(data) {
  if (data._id) {
    const id = data._id;
    delete data._id;
    return Note.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }
  const note = new Note(data);
  return note.save();
}

async function deleteNote(id) {
  return Note.findByIdAndDelete(id);
}

module.exports = { connect, getNote, getNoteByCustomUrl, saveNote, deleteNote };