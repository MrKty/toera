const express = require('express')
require('./db/mongoose') //connect to db
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

console.log("Test Commit")
console.log("Test Commit")
console.log("Test Commit")
console.log("Test Commit")
console.log("Test Commit Mert")

