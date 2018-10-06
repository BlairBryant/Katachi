SELECT * FROM thoughts
WHERE user_id = $1
ORDER BY thought_id ASC;