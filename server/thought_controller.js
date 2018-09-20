module.exports = {
  createThought: (req, res) => {
    const db = req.app.get('db')
    const {date, thought, title, belief, belief_amt, quote, color} = req.body.thought
    console.log(req.session.user.user_id)
    console.log(req.body)
    db.createThought([req.session.user.user_id, date, title, thought, belief, belief_amt, quote, color])
  },
}