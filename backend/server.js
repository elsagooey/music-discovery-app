const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock database of songs for your MVP
const DISCOVERY_DECK = [
  { id: '1', title: 'Starboy', artist: 'The Weeknd', art: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79d10de3368c2', preview: 'https://p.scdn.co/mp3-preview/...' },
  { id: '2', title: 'Levitating', artist: 'Dua Lipa', art: 'https://i.scdn.co/image/ab67616d0000b273bd3598e35905d58d975a528a', preview: 'https://p.scdn.co/mp3-preview/...' },
  { id: '3', title: 'Bad Habit', artist: 'Steve Lacy', art: 'https://i.scdn.co/image/ab67616d0000b273bf193630f576e828e3489e24', preview: 'https://p.scdn.co/mp3-preview/...' },
];

app.get('/songs/recommendations', (req, res) => {
  res.json({ songs: DISCOVERY_DECK });
});

// Endpoint to handle the "Swipe Right" (Like)
app.post('/songs/like', (req, res) => {
  const { songId, userId } = req.body;
  console.log(`User ${userId} liked song ${songId}`);
  res.status(200).send({ message: "Saved to playlist!" });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Backend spinning at http://localhost:${PORT}`));