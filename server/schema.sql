CREATE USER IF NOT EXISTS 'andre'@'%' IDENTIFIED BY 'and';
GRANT ALL PRIVILEGES ON soccer_blog_db.* TO 'andre'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE
    IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        home_team VARCHAR(255) NOT NULL,
        away_team VARCHAR(255) NOT NULL,
        home_score INT,
        away_score INT,
        image_url TEXT NOT NULL
    );

CREATE TABLE 
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );