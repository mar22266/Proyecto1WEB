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
import {
  logError,
  request,
  response,
} from './log.js';

// Load environment variables from .env file
dotenv.config();

// Create a new Pool instance using pg
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());

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
  console.log('GET /posts');
  request('GET', '/posts', '');
  try {
    const posts = await getAllPosts(pool);
    response('GET', '/posts', posts);
    res.json(posts);
  } catch (error) {
    logError(error);
    console.error(error); // Add this line for detailed logging
    res.status(500).json({ message: error.message });
  }
});

app.post('/posts', async (req, res) => {
  console.log('POST /posts');
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

  request('POST', '/posts', req.body);
  try {
    const result = await createPost(pool, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl);
    response('POST', '/posts', result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error); // Add this line for detailed logging
    return res.status(500).json({ message: error.message });
  }
});

app.get('/posts/:postId', async (req, res) => {
  console.log('GET /posts/:postId');
  request('GET', '/posts/:postId', '');
  try {
    const { postId } = req.params;
    const post = await getPostById(pool, postId);
    if (post) {
      response('GET', '/posts/:postId', post);
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error(error); // Add this line for detailed logging
    res.status(500).json({ message: error.message });
  }
});

app.put('/posts/:postId', async (req, res) => {
  console.log('PUT /posts/:postId');
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

  request('PUT', '/posts/:postId', req.body);
  try {
    const result = await updatePost(pool, postId, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    response('PUT', '/posts/:postId', result);
    return res.json(result);
  } catch (error) {
    console.error(error); // Add this line for detailed logging
    return res.status(500).json({ message: error.message });
  }
});

app.delete('/posts/:postId', async (req, res) => {
  console.log('DELETE /posts/:postId');
  request('DELETE', '/posts/:postId', '');
  try {
    const { postId } = req.params;
    const result = await deletePost(pool, postId);
    response('DELETE', '/posts/:postId', result);
    res.json(result);
  } catch (error) {
    console.error(error); // Add this line for detailed logging
    res.status(500).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  console.log('POST /login');
  const { user, password } = req.body;

  console.log('Request body:', req.body); // Add logging

  if (!user || !password) {
    console.error('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  request('POST', '/login', req.body);
  try {
    const result = await login(user, password); // Corrected this line
    if (result) {
      response('POST', '/login', result);
      console.log('Login successful:', result);
      return res.status(200).json(result);
    }
    console.error('Invalid user or password');
    return res.status(401).json({ message: 'Invalid user or password' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message });
  }
});



app.post('/register', async (req, res) => {
  console.log('POST /register');
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  request('POST', '/register', req.body);

  try {
    const result = await register(pool, username, password);
    response('POST', '/register', result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error); // Add this line for detailed logging
    return res.status(500).json({ message: error.message });
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
