require('dotenv').config()
const massive = require('massive')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ctrl = require('./controller')
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

app.post('/api/registeruser', ctrl.registerUser)
app.post('/api/loginuser', ctrl.loginUser)

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))