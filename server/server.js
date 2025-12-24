const express = require('express');
const mongo = require('./services/mongoService');
const app = express();
app.use(express.json());

(async () => {
  try {
    await mongo.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/repaste');
  } catch (err) {
    console.error('Mongo connection error', err);
    process.exit(1);
  }

  app.get('/api/notes/:id', async (req, res) => {
    const note = await mongo.getNote(req.params.id);
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  });

  app.post('/api/notes', async (req, res) => {
    const saved = await mongo.saveNote(req.body);
    res.json(saved);
  });

  app.put('/api/notes/:id', async (req, res) => {
    const updated = await mongo.saveNote({ _id: req.params.id, ...req.body });
    res.json(updated);
  });

  app.delete('/api/notes/:id', async (req, res) => {
    await mongo.deleteNote(req.params.id);
    res.status(204).end();
  });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();