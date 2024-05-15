import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgres://soccer_blog_db_puui_user:6JTONXbfh0OagskfWtnygxyJUh9NUYOf@dpg-cp2cid6n7f5s73ffaj30-a.oregon-postgres.render.com/soccer_blog_db_puui',
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
