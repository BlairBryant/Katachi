CREATE TABLE thoughts (
    thought_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) NOT NULL,
    date VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    thought VARCHAR(20000),
    belief BOOLEAN DEFAULT NULL,
    belief_amt INT DEFAULT NULL,
    quote BOOLEAN DEFAULT false NOT NULL,
    color VARCHAR(7) DEFAULT NULL,
    is_private BOOLEAN DEFAULT false
);

INSERT INTO thoughts
(user_id, thought, title, date, belief, belief_amt, quote, color)
VALUES
(1, 'First Thought', 'Thinking is fun.', '9/19/2018' true, 8, false, '#55AACC')