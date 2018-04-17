/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Auth Controller
  */

const db = require('../models')
const User = db.User
const { authData } = (process.env.NODE_ENV === 'production') ? require('../../config/env/production') : require('../../config/env/development')
const { error, json } = require('../services/ResponseService')
const { to } = require('../services/HelperService')
const { issue } = require('../services/JWTService')

const login = async (req, res) => {
  const data = req.body
  if (!data.email || !data.password) return error(null, res, req, 401, 'Login failed. Invalid Email Or Password.')

  const [findUserError, findUser] = await to(User.findOne({ where: { email: data.email, isActive: true, isDeleted: false } }))
  if (findUserError || !findUser) return error(findUserError, res, req, 401, 'Login failed. Invalid Email.')

  if (!findUser.verifyPassword(data.password)) return error(findUserError, res, req, 401, 'Login failed. Invalid Password.')

  const finalUser = findUser.toJSON()

  console.log(Error(`JWT Expiry: ${authData.jwtExpiry}`))
  const token = issue({ user: finalUser.id, createdAt: Date(), authoriser: 'Android Mentorship' }, authData.jwtExpiry)

  return json(200, res, req, 'User Created Successfully.', { token: token, user: finalUser })
}

module.exports = { login }
