CREATE TABLE links (
    link_id SERIAL PRIMARY KEY,
    thought_id1 INTEGER REFERENCES thoughts(thought_id) NOT NULL,
    thought_id2 INTEGER REFERENCES thoughts(thought_id) NOT NULL
);