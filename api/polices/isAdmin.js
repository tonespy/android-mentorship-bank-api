/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Is Admin Policy
  */
const { customError } = require('../services/ResponseService')

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') return next()
  return customError(404, res, 'Not found.')
}

module.exports = { isAdmin }
