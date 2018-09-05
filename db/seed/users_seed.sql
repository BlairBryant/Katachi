CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(40),
    password VARCHAR(40)
)

INSERT INTO users
(username, password)
VALUES
('blairslc@gmail.com', 'e')