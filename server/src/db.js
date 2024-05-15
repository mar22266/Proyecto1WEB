import pool from './conn.js';

export const getAllPosts = async (pool) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blog_posts');
    return rows;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export async function createPost(pool, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl) {
  try {
    const result = await pool.query(
      'INSERT INTO blog_posts (title, content, home_team, away_team, home_score, away_score, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

export async function getPostById(pool, postId) {
  try {
    const result = await pool.query('SELECT * FROM blog_posts WHERE id = $1', [postId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    throw error;
  }
}

export async function updatePost(pool, postId, title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl) {
  try {
    const result = await pool.query(
      'UPDATE blog_posts SET title = $1, content = $2, home_team = $3, away_team = $4, home_score = $5, away_score = $6, image_url = $7 WHERE id = $8 RETURNING *',
      [title, content, homeTeam, awayTeam, homeScore, awayScore, imageUrl, postId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

export async function deletePost(pool, postId) {
  try {
    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [postId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}

export async function login(pool, user, password) {
  try {
    console.log('Login function called with:', { user, password });
    const result = await pool.query('SELECT id, user, password FROM users WHERE user = $1', [user]);
    console.log('Login query result:', result.rows);

    if (result.rows.length === 1) {
      const userRecord = result.rows[0];
      console.log('User record found:', userRecord);

      if (userRecord.password === password) {
        console.log('Password match');
        return { id: userRecord.id, username: userRecord.user };
      } else {
        console.log('Password does not match');
        return false;
      }
    } else {
      console.log('User not found');
      return false;
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function register(pool, user, password) {
  try {
    const result = await pool.query('INSERT INTO users (user, password) VALUES ($1, $2) RETURNING *', [user, password]);
    return result.rows[0];
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
