INSERT INTO thoughts
(user_id, date, title, thought, belief, belief_amt, quote, color, is_private)
VALUES
($1, $2, $3, $4, $5, $6, $7, $8, $9)
RETURNING *;