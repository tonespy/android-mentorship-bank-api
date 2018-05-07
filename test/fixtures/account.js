/**
 * Created by Oluwapelumi Olaoye
 * oluwapelumi
 * Account Fixtures
 */
const Chance = require('chance');
const chance = new Chance();
const { to } = require('../../api/services/HelperService');
const { createUser } = require('./user');
const db = require('../../api/models');
const Account = db.Account;


const createAccount = async () => {
	
	createUser()
		.then(async (createdUser) => {
			const createAccountObj = {
				account_number: 5839119194 + '',
				user_id: createdUser.id``,
				status: 'active'
			};
			
			const [createError, createAcc] = await to(Account.create(createAccountObj));
			
			if (createError)
				return Promise.reject(createError);
			return Promise.resolve(createAcc);
		}).catch((err) => {})
};

const getAllUserAccount = async () => {
	
	createUser()
		.then(async (createdUser) => {
			const getAllUserAccountObj = {
				user_id: createdUser.id,
				status: 'active'
			};
			
			const [getAllUserAccountError, getAllUserAccount] = await to(Account.create(getAllUserAccountObj));
			
			if(getAllUserAccountError)
				return Promise.reject(getAllUserAccountError);
			
			return Promise.resolve(getAllUserAccount);
		}).catch((err) => {})
};

const getAccountByAccountNumber = async () => {
	const [getAccountByAccountNumberError, getAccountByAccNumber] = await to(Account.findOne(
		{
			where: {
				account_number: chance.phone({formatted: false}) + '',
				status: 'active'
			}
		}
	));
	if(getAccountByAccountNumberError)
		return Promise.reject(getAccountByAccountNumberError);
	
	return Promise.resolve(getAccountByAccNumber);
};

module.exports = { createAccount, getAllUserAccount, getAccountByAccountNumber };
