const config = require('./config')
const jwt = require('jsonwebtoken')

const DropUndefined = (assoc) => {
  const copy = Object.assign(assoc)
  Object.keys(copy).forEach(key => {
    if (copy[key] === undefined)
      delete copy[key]
  })
  return copy
}

const FilterFields = (assoc, fields = []) => {
  let hash = {}
  for (let f of fields) {
    if (assoc.hasOwnProperty(f))
      hash[f] = assoc[f]
  }
  return hash
}

const RemoveFields = (assoc, fields = []) => {
  let hash = Object.assign({}, assoc)
  for (let f of fields) {
    delete hash[f]
  }
  return hash
}

const GetTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const GetUserId = (token) => {
  const decodedToken = jwt.verify(token, config.secret)
  if (token && decodedToken.id)
    return decodedToken.id
  return null
}

module.exports = {
  DropUndefined,
  FilterFields,
  RemoveFields,
  GetTokenFrom,
  GetUserId,
}
