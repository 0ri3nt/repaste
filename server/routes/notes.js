const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { title, content, privacy, collaborators, customUrl } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
            privacy,
            collaborators,
            customUrl,
            user: req.user.id,
        });

        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add this new route to get note by custom URL
router.get('/url/:customUrl', auth, async (req, res) => {
    try {
        const note = await Note.findOne({ customUrl: req.params.customUrl });
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.put('/:id', auth, async (req, res) => {
    const { title, content, privacy, collaborators, customUrl } = req.body;

    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        note = await Note.findByIdAndUpdate(
            req.params.id,
            { $set: { title, content, privacy, collaborators, customUrl } },
            { new: true }
        );

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        console.log(`Received request to delete note with id: ${req.params.id}`);
        const note = await Note.findById(req.params.id);
        if (!note) {
            console.log(`Note with id: ${req.params.id} not found`);
            return res.status(404).json({ msg: 'Note not found' });
        }

        await Note.findByIdAndDelete(req.params.id);
        console.log(`Note with id: ${req.params.id} removed`);

        res.json({ msg: 'Note removed' });
    } catch (err) {
        console.error(`Error deleting note with id: ${req.params.id}`, err);
        res.status(500).send('Server error');
    }
});

module.exports = router;