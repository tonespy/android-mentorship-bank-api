/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * User Controller
  */

const db = require('../models')
const User = db.User
const Account = db.Account
const AccountController = require('./AccountController')
const { customError, error, json } = require('../services/ResponseService')
const { verifyBvn } = require('../services/PaystackService')
const { to } = require('../services/HelperService')

const validateObj = (data) => {
  if (!data.phone) {
    return {
      status: false,
      statusCode: 400,
      obj: {
        message: 'Invalid Attributes.',
        data: {
          phone: 'Phone Number Is Required.'
        }
      }
    }
  }

  if (data.phone.length < 11 || data.phone.length > 11) {
    return {
      status: false,
      statusCode: 400,
      obj: {
        message: 'Invalid Attributes.',
        data: {
          phone: 'Phone Number can neither be lesser nor greater than 11.'
        }
      }
    }
  }
  if (!data.email) {
    return {
      status: false,
      statusCode: 400,
      obj: {
        message: 'Invalid Attributes.',
        data: {
          email: 'Email Is Required.'
        }
      }}
  }
  if (!data.password) {
    return {
      status: false,
      statusCode: 400,
      obj: {
        message: 'Invalid Attributes.',
        data: {
          password: 'Password Is Required.'
        }
      }}
  }

  const payload = {
    phone: data.phone,
    email: data.email,
    password: data.password,
    username: data.phone,
    bvn: data.bvn,
    fullname: data.fullname,
    role: 'user'
  }

  return {
    status: true,
    data: payload }
}

const createUser = async (req, res) => {
  const data = req.body

  let verifyUser = validateObj(data)

  if (!verifyUser.status) { return customError(verifyUser.statusCode, res, req, verifyUser.obj.data, verifyUser.obj.message) }

  verifyUser = verifyUser.data

  if (verifyUser.bvn) {
    const [verifyError, verifyResponse] = await to(verifyBvn(verifyUser.bvn))
    if (verifyError || !verifyResponse) return customError(400, res, req, verifyError.error, 'Unable to verify bvn.')
    verifyUser.bvnProvided = true
  }

  User.create(verifyUser)
    .then(createdUser => {
      let user = createdUser.toJSON()

      let data = {
        account_number: AccountController.generateAccountNumber(),
        user_id: user.id,
        status: 'active'
      }

      let message = ''
      // Create user account on the fly.
      Account.create(data)
        .then(() => {
          message = 'with default account'
        })
        .catch((err) => {
          message = 'without default account'
          error(err, res, req, 400, 'Error creating default account for user.')
        })

      delete user.password
      delete user.bvn
      return json(201, res, req, 'User Created Successfully ' + message + '.', user)
    })
    .catch(err => error(err, res, req, 400, 'Error creating user.'))
}

const updateUser = async (req, res) => {
  const data = req.body
  const id = req.params.id
  const user = req.user

  if (`${id}` !== `${user.id}`) return customError(400, res, req, null, 'You provided an invalid User ID.')

  delete data.bvn
  delete data.role

  User.update(data, { where: { id: id } })
    .then(() => json(200, res, req, 'User updated successfully.'))
    .catch((err) => error(err, res, req, 400, 'User update was not successful.'))
}

const viewUser = async (req, res) => {
  const id = req.params.id
  const user = req.user
  let whereQuery = {}

  if (user.role === 'admin') whereQuery = { id: id }
  else {
    if (`${id}` !== `${user.id}`) return customError(400, res, req, null, 'You provided an invalid User ID.')
    whereQuery = { id: id, isDeleted: false }
  }

  User.findOne({ where: whereQuery })
    .then(foundUser => {
      if (!foundUser) return json(200, res, req, 'User not found.')
      let user = foundUser.toJSON()
      delete user.password
      delete user.bvn
      return json(200, res, req, 'User found successfully.', user)
    })
    .catch(err => error(err, res, req, 400, 'User not found.'))
}

const deleteUser = async (req, res) => {
  const id = req.params.id
  const user = req.user
  let data = {}
  let whereQuery = { id: id }

  if (user.role === 'admin') data = { isDeleted: true }
  else {
    if (`${id}` !== `${user.id}`) return customError(400, res, req, null, 'You provided an invalid User ID.')
    data = { isDeleted: true }
    whereQuery = { id: id, isDeleted: false }
  }

  if (`${id}` !== `${user.id}`) return customError(400, res, req, null, 'You provided an invalid User ID.')

  delete data.bvn
  delete data.role

  User.update(data, { where: whereQuery })
    .then(() => json(200, res, req, 'User has been deleted successfully.'))
    .catch((err) => error(err, res, req, 400, 'User delete was not successful.'))
}

const listUser = async (req, res) => {
  const user = req.user
  if (user.role !== 'admin') return customError(404, res, req, null, 'Endpoint Not Available')

  User.count().then(data => {
    let limit = 10
    let offset = 0
    let page = req.query.page
    page = (!page || page <= 0) ? 1 : page
    let pages = Math.ceil(data / limit)
    offset = limit * (page - 1)
    return Promise.all([User.findAll({ limit: limit, offset: offset }), { pages: pages, page: page, offset: offset, count: data }])
  }).then(([users, pages]) => {
    const usersResponse = users.map(obj => {
      let mainObj = obj.toJSON()
      delete mainObj.password
      delete mainObj.bvn
      return mainObj
    })
    return json(200, res, 'Users retrieved successfully.', usersResponse, pages)
  }).catch(err => {
    error(err, res, 400, 'Couldn\'t get Users.')
  })
}

module.exports = { createUser, updateUser, viewUser, deleteUser, listUser }
