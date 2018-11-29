module.exports = {
  getThoughts: (req, res) => {
    const db = req.app.get('db')
    // CHANGE THIS BACK ONCE I DON'T NEED TO BE LOGGED IN GETTING THOUGHTS FROM THE SAME PERSON
    // db.getThoughts([req.session.user.user_id]).then(thoughts => {
    db.getThoughts([2]).then(thoughts => {
      res.status(200).send(thoughts)
    })
  },
  //Add categories
  createThought: (req, res) => {
    const db = req.app.get('db')
    const {date, title, thought, belief, belief_amt, quote, color, is_private, categories} = req.body.thought
    console.log(req.body)
    // db.createThought([+req.session.user.user_id, date, title, thought, belief, belief_amt, quote, color, is_private])
    db.createThought([2, date, title, thought, belief, belief_amt, quote, color, is_private]).then(currentThought => {
      categories.forEach(category => {
        category.thought_id = currentThought[0].thought_id
        //need to pass up user_id
        db.categories.insert(category)
      })
    })
  },
  //Add categories
  editThought: (req, res) => {
    const db = req.app.get('db')
    console.log(req.body)
    const {thought_id, date, title, thought, belief, belief_amt, quote, color, is_private, categories} = req.body.thought
    categories.forEach(category => {
      if (category.category_id) {

      } else {
        // category.thought_id = thought_id
        // db.categories.insert(category)
      }
    })
    db.editThought([2, thought_id, date, title, thought, belief, belief_amt, quote, color, is_private]).then(thoughts => {
    // db.editThought([+req.session.user.user_id, thought_id, date, title, thought, belief, belief_amt, quote, color, is_private]).then(thoughts => {
      console.log('whate')
      // console.log(thoughts)
      res.status(200).send(thoughts)
    })
  },
  deleteThought: (req, res) => {
    const db = req.app.get('db')
    db.deleteThought([req.params.id]).then(() => {
      res.status(200).send()
    })
  },
  getCategories: (req, res) => {
    const db = req.app.get('db')
    //need to pass up user_id
    db.getCategories([req.params.id]).then(categories => {
      res.status(200).send(categories)
    })
  },
  deleteCategory: (req, res) => {
    const db = req.app.get('db')
    db.deleteCategory([req.params.id])
  },

}