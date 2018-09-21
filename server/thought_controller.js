module.exports = {
  getThoughts: (req, res) => {
    const db = req.app.get('db')
    console.log('hit')
    db.getThoughts([req.session.user.user_id]).then(thoughts => {
      res.status(200).send(thoughts)
    })
  },
  createThought: (req, res) => {
    const db = req.app.get('db')
    const {date, thought, title, belief, belief_amt, quote, color} = req.body.thought
    db.createThought([req.session.user.user_id, date, title, thought, belief, belief_amt, quote, color])
  },
}