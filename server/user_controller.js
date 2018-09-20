const bcrypt = require('bcryptjs')
var session_id_count = 1

module.exports = {
	register: (req, res) => {
		console.log(req.body)
		const { email, password } = req.body
		const db = req.app.get('db')
		db.checkUsernameTaken([email]).then(user => {
			if (user.length !== 0) {
				res.status(200).send('Email address Taken. Try another.')
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

				db.registerUser([email, hash]).then((user) => {
					req.session.user.session_id = session_id_count
					session_id_count++
					req.session.user.user_id = user[0].user_id
					req.session.user.email = user[0].email
					res.status(200).send('success')
				})
			}
		})
	},
	login: (req, res) => {
		console.log(req.body)
		const { email, password } = req.body
		const db = req.app.get('db')
		db.checkUsernameTaken([email]).then(user => {
			if (user.length !== 0) {
				const validPassword = bcrypt.compareSync(password, user[0].password)
				if (validPassword) {
					req.session.user.session_id = session_id_count
					session_id_count++
					req.session.user.user_id = user[0].user_id
					req.session.user.email = user[0].email
					res.status(200).send('success')
				} else {
					res.status(200).send('Invalid Password')
				}
			} else {
				res.status(200).send('Email address does not exist')
			}
		})
	},

}