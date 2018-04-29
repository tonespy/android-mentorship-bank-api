/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * User Fixtures
  */
const Chance = require('chance')
const chance = new Chance()
const { to } = require('../../api/services/HelperService')
const db = require('../../api/models')
const User = db.User

const userObj = {
  fullname: chance.name({ middle: true }),
  username: chance.twitter(),
  phone: chance.phone({ formatted: false }),
  email: 'admin@android-mentorshipng.com',
  password: 'password',
  role: 'admin',
  bvn: chance.ssn({ dashes: false }),
  bvnProvided: true
}

const createSuperAdmin = async () => {
  const [createError, createUser] = await to(User.create(userObj))
  if (createError) return Promise.reject(createError)

  return Promise.resolve(createUser.toJSON())
}

module.exports = { userObj, createSuperAdmin }
