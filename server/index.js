require('dotenv').config()
const massive = require('massive')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const user_ctrl = require('./user_controller')
const thought_ctrl = require('./thought_controller')
const session = require('express-session')
const checkUserSession = require('./middleware/checkUserSession')

const {
	REACT_APP_SUCCESS,
	REACT_APP_LOGOUT,
	SERVER_PORT,
	SECRET,
	CONNECTION_STRING
} = process.env

const app = express()

// app.use(express.static( `${__dirname}/../build` ))

massive(CONNECTION_STRING).then(db => {
	app.set('db', db)
})

app.use(bodyParser.json())
app.use(cors())

app.use(session({
	secret: SECRET,
	resave: false,
	saveUninitialized: true
}))

app.use(checkUserSession)

app.post('/api/register', user_ctrl.register)
app.put('/api/login', user_ctrl.login)

app.get('/api/getthoughts', thought_ctrl.getThoughts)
app.post('/api/createthought', thought_ctrl.createThought)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
