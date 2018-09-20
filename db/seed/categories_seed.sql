CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    thought_id INTEGER REFERENCES thoughts(thought_id) NOT NULL,
    category VARCHAR(100) NOT NULL
);

INSERT INTO categories
(thought_id, category)
VALUES
(1, 'Ethics')