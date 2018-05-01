/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Authentication Policy
  */
const { customError, error } = require('../services/ResponseService')
const { verify } = require('../services/JWTService')
const db = require('../models')
const User = db.User

const authenticated = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    let parts = req.headers.authorization.split(' ')
    if (parts.length === 2) {
      let scheme = parts[0]
      let _token = parts[1]
      if (/^jwt$/i.test(scheme)) {
        return verify(_token).then(decoded => {
          return User.findOne({ where: { id: decoded.user, isDeleted: false, isActive: true } })
            .then(foundUser => {
              if (!foundUser) return { status: 401, msg: 'Invalid token.' }
              req.user = foundUser.toJSON()
              return { status: 200, msg: 'OK.' }
            })
        }).then(result => {
          if (result.status === 401) {
            return customError(result.status, res, req, null, result.msg)
          } else {
            return next()
          }
        }).catch(err => customError(400, res, req, err, err.message))
      } else {
        return error(null, res, req, 400, 'Invalid authorization header.')
      }
    } else {
      return error(null, res, req, 400, 'Invalid authorization header.')
    }
  } else {
    return error(null, res, req, 400, 'No authorization header was found.')
  }
}

module.exports = { authenticated }
