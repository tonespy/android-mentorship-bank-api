'use strict'
/**
 * Created By Oluwapelumi Olaoye
 * @oluwapelumi
 * Account Controller
 */

const db = require('../models')
const Account = db.Account
const { customError, error, json } = require('../services/ResponseService')

/**
 * Validates user account number before attempt to fetch from db.
 * @param accountNumber
 */
const AccountController = {
  /**
     * Validate user account number
     * @param accountNumber
     * @returns {*}
     */
  validateAccountNumber: (accountNumber) => {
    if (!accountNumber) {
      return {
        status: false,
        statusCode: 400,
        obj: {
          message: 'Invalid attribute.',
          data: {
            account: 'A valid account number is required'
          }
        }
      }
    }

    if (accountNumber.length !== 10) {
      return {
        status: false,
        statusCode: 400,
        obj: {
          message: 'Invalid attribute.',
          data: {
            account: 'Account number must have only 10 digits'
          }

        }
      }
    }

    return {
      status: true,
      accountNumber: accountNumber
    }
  },

  generateAccountNumber: () => {
    let accountNumber = Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8))

    return '5' + accountNumber
  },

  createAccount: (req, res) => {
    let userId = req.params.user_id
    let data = {
      account_number: AccountController.generateAccountNumber(),
      user_id: userId,
      status: 'active'
    }

    Account.create(data)
      .then((createdAccount) => {
        return json(201, res, req, 'Account created successfully.', createdAccount.toJSON())
      })
      .catch((err) => {
        return error(err, res, req, 400, 'Error creating user account')
      })
  },

  /**
     * Get user account details with user account number.
     * @param req
     * @param res
     */
  getAccountByAccountNumber: (req, res) => {
    const account = req.params.account_number

    // Check account number length
    let verifyAccount = AccountController.validateAccountNumber(account)

    if (!verifyAccount.status) { return customError(verifyAccount.statusCode, res, req, verifyAccount.obj.data, verifyAccount.obj.message) }

    Account.findOne({
      where: {
        account_number: verifyAccount.accountNumber,
        status: 'active'
      }
    })
      .then((userAccount) => {
        if (!userAccount) {
          return json(200, res, req, 'Account does not exist')
        }
        return json(200, res, req, 'Account found', userAccount)
      })
      .catch((err) => {
        error(err, res, req, 400, 'Couldn\'t fetch user account due to error =>  ' + err.message)
      })
  },

  /**
   * Get all user accounts by user ID.
   * @param req
   * @param res
   */
  getAllUsersAccounts: (req, res) => {
    let userId = req.params.user_id
    Account.findAll({
      where: {
        user_id: userId,
        status: 'active'
      }})
      .then((userAccounts) => {
        if (!userAccounts) { return json(200, res, req, 'No account found for this user') }
        return json(200, res, req, 'User accounts found', userAccounts)
      })
      .catch((err) => {
        error(err, res, req, 400, 'User accounts not found. Only a user can do this.')
      })
  }
}

module.exports = AccountController
