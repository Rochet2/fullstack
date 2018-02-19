if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const app = express()
morgan.token('body', function (req) { return JSON.stringify(req.body) })

mongoose
  .connect(process.env.MONGODB_URI)
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
