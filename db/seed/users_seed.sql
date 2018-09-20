CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    password VARCHAR(1000)
);

INSERT INTO users
(username, password)
VALUES
('blairslc@gmail.com', 'e')

-- Passwords are hashed so can't use above.