UPDATE thoughts
SET date = $3, title = $4, thought = $5, belief = $6, belief_amt = $7, quote = $8, color = $9, is_private = $10
WHERE user_id = $1 AND thought_id = $2;

-- SELECT * FROM thoughts
-- WHERE user_id = $1
-- ORDER BY thought_id ASC;