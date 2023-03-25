const express = require('express')
const app = express()
const createConnection = require("./db/db")
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
const PORT = 8000

// configuration
dotenv.config({
    path: './config/.env'
})

// Coling MongoDb implementation
createConnection()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json({extened: true}))

const user = require("./routes/authRoutes")
const todo = require("./routes/todoRoutes")

app.use('/api/auth', user)
app.use('/api/todo', todo)



app.listen(PORT, () => {
    console.log(`Server has been started at ${PORT}`)
})
