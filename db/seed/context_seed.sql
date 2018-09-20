CREATE TABLE context (
    context_id SERIAL PRIMARY KEY,
    thought_id INTEGER REFERENCES thoughts(thought_id) NOT NULL,
    context VARCHAR(20000)
);

INSERT INTO context
(thought_id, context)
VALUES
(1, 'This is my first context')