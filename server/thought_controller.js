module.exports = {
  getThoughts: (req, res) => {
    const db = req.app.get('db')
    console.log('hit')
    // CHANGE THIS BACK ONCE I DON'T NEED TO BE LOGGED IN GETTING THOUGHTS FROM THE SAME PERSON
    // db.getThoughts([req.session.user.user_id]).then(thoughts => {
    db.getThoughts([2]).then(thoughts => {
      res.status(200).send(thoughts)
    })
  },
  createThought: (req, res) => {
    const db = req.app.get('db')
    const {date, thought, title, belief, belief_amt, quote, color} = req.body.thought
    db.createThought([req.session.user.user_id, date, title, thought, belief, belief_amt, quote, color])
  },
}