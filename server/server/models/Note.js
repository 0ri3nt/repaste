const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    privacy: { type: Boolean, default: true },
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    customUrl: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Note', NoteSchema);