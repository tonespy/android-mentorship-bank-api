/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * User Fixtures
  */
const Chance = require('chance');
const chance = new Chance();
const { to } = require('../../api/services/HelperService');
const db = require('../../api/models');
const User = db.User;

const userAdminObj = {
  fullname: chance.name({ middle: true }),
  username: chance.twitter(),
  phone: chance.phone({ formatted: false }),
  email: 'admin@android-mentorshipng.com',
  password: 'password',
  role: 'admin',
  bvn: chance.ssn({ dashes: false }),
  bvnProvided: true
};

const userObj = {
	fullname: chance.name(),
	username: chance.twitter(),
	phone: chance.phone({ formatted: false}),
	email: 'testuser@androidmentorship.com',
	password: 'password',
	role: 'user',
	bvn: chance.ssn({dashes: false}),
	bvnProvided: true
};

const createUser = async () => {
	const [createError, createUser]  = await to(User.create(userObj));
	
	if (createError)
		return Promise.reject(createError);
	
	return Promise.resolve(createUser.toJSON())
}

const createSuperAdmin = async () => {

  const [createAdminError, createAdminUser] = await to(User.create(userAdminObj));
  if (createAdminError) return Promise.reject(createAdminError);
	
  return Promise.resolve(createAdminUser.toJSON())
};



module.exports = { userAdminObj, createSuperAdmin, createUser };
