module.exports = {
  getThoughts: (req, res) => {
    const db = req.app.get('db')
    // CHANGE THIS BACK ONCE I DON'T NEED TO BE LOGGED IN GETTING THOUGHTS FROM THE SAME PERSON
    // db.getThoughts([req.session.user.user_id]).then(thoughts => {
    db.getThoughts([2]).then(thoughts => {
      res.status(200).send(thoughts)
    })
  },
  createThought: (req, res) => {
    const db = req.app.get('db')
    const {date, title, thought, belief, belief_amt, quote, color, is_private} = req.body.thought
    db.createThought([req.session.user.user_id, date, title, thought, belief, belief_amt, quote, color, is_private])
  },
  deleteThought: (req, res) => {
    const db = req.app.get('db')
    db.deleteThought([req.params.id]).then(res => {
      res.status(200).send(res)
    })
  },
}