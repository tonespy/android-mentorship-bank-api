/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Auth Controller
  */

const db = require('../models')
const jwt = require('jsonwebtoken')
const User = db.User
const { authData } = (process.env.NODE_ENV === 'production') ? require('../../config/env/production') : require('../../config/env/development')
const { error, json } = require('../services/ResponseService')
const { to } = require('../services/HelperService')

const login = async (req, res) => {
  const data = req.body
  if (!data.email || !data.password) return error(null, res, 401, 'Login failed. Invalid Email Or Password.')

  const [findUserError, findUser] = await to(User.findOne({ where: { email: data.email, isActive: true, isDeleted: false } }))
  if (findUserError || !findUser) return error(findUserError, res, 401, 'Login failed. Invalid Email.')

  if (!findUser.verifyPassword(data.password)) return error(findUserError, res, 401, 'Login failed. Invalid Password.')

  const finalUser = findUser.toJSON()

  const token = jwt.sign({ user: finalUser.id, createdAt: Date(), authoriser: 'Android Mentorship' }, authData.jwtSecret, {
    expiresIn: authData.jwtExpiry
  })

  return json(200, res, 'User Created Successfully.', { token: token, user: finalUser })
}

module.exports = { login }
