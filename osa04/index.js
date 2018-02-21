if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const app = express()
const http = require('http')
const middleware = require('./utils/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

// app.use(express.static('build'))
morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(cors())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.error)

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database')
  })
  .catch( err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}
