if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const app = express()
const http = require('http')
const middleware = require('./utils/middleware')
morgan.token('body', function (req) { return JSON.stringify(req.body) })

mongoose
  .connect(config.mongoUrl)
  .then( () => {
    console.log('connected to database')
  })
  .catch( err => {
    console.log(err)
  })

mongoose.Promise = global.Promise

// app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.error)

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
