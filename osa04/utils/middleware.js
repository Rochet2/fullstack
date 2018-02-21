const utils = require('./utils')

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
  request.token = utils.GetTokenFrom(request)
  next()
}

module.exports = {
  error,
  tokenExtractor,
}
