/**
 * Created by Oluwapelumi Olaoye
 * oluwapelumi
 * Account Fixtures
 */
const Chance = require('chance');
const chance = new Chance();
const { to } = require('../../api/services/HelperService');
const db = require('../../api/models');
const Account = db.Account;

const createAccountObj = {
	account_number: 5839119194 + '',
	user_id: 1,
	status: 'active'
};

const createAccount = async () => {
	
	const [createError, createAcc] = await to(Account.create(createAccountObj));
	
	if (createError)
		return Promise.reject(createError);
	return Promise.resolve(createAcc);
};

const getAllUserAccountObj = {
	user_id: 1,
	status: 'active'
};

const getAllUserAccount = async () => {
	const [getAllUserAccountError, getAllUserAccount] = await to(Account.findAll(
		{
			where: getAllUserAccountObj
		}
	));
	if(getAllUserAccountError)
		return Promise.reject(getAllUserAccountError);
	
	return Promise.resolve(getAllUserAccount);
};

const getAccountByAccountNumber = async () => {
	const [getAccountByAccountNumberError, getAccountByAccNumber] = await to(Account.findOne(
		{
			where: {
				account_number: chance.phone() + '',
				status: 'active'
			}
		}
	));
	if(getAccountByAccountNumberError)
		return Promise.reject(getAccountByAccountNumberError);
	
	return Promise.resolve(getAccountByAccNumber);
};

module.exports = { createAccount, getAllUserAccount, getAccountByAccountNumber };
