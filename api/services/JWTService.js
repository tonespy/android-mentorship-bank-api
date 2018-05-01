const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const { authData } = (process.env.NODE_ENV === 'production') ? require('../../config/env/production') : require('../../config/env/development')
const tokenBuffer = Buffer.from(authData.jwtSecret, 'base64')
const audience = authData.audience
const issuer = authData.issuer

const issue = (payload, expirytime, subject) => {
  const opts = {
    expiresIn: expirytime,
    audience: audience,
    issuer: issuer,
    jwtid: uuid.v4(),
    subject: subject || 'jwt-auth-token'
  }
  return jwt.sign(payload, tokenBuffer, opts)
}

const verify = (token) => {
  return new Promise(function (resolve, reject) {
    return jwt.verify(token, tokenBuffer, { audience: audience, issuer: issuer }, function (err, decoded) {
      if (err) return reject(err)
      return resolve(decoded)
    })
  })
}

module.exports = { issue, verify }
