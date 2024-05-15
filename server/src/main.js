import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  login,
  register,
} from './db.js';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Server is running. Database connected at: ${result.rows[0].now}`);
  } catch (error) {
    res.status(500).send(`Server is running, but database connection failed: ${error.message}`);
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await getAllPosts(pool);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts', async (req, res) => {
  const {
    title,
    content,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    imageUrl,
  } = req.body;

  if (!title || !content || !homeTeam || !awayTeam || homeScore === undefined || awayScore === undefined || !imageUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await createPost(pool, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await getPostById(pool, postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: error.message });
  }
});

app.put('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  const {
    title,
    content,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    imageUrl,
  } = req.body;

  if (!title || !content || !homeTeam || !awayTeam || homeScore === undefined || awayScore === undefined || !imageUrl) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await updatePost(pool, postId, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const result = await deletePost(pool, postId);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(result);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await login(pool, user, password);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: 'Invalid user or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await register(pool, username, password);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((req, res) => {
  res.status(501).json({ message: 'Method not implemented' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
