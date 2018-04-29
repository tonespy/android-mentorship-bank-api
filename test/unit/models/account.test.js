/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * User Controller Integration Test
  */

const db = require('../../../api/models')
const { describe, beforeEach, it } = require('mocha')
const chai = require('chai')
const should = chai.should()
const { createAccount, getAllUserAccount, getAccountByAccountNumber } = require('../../fixtures/account')

describe('Account Integration Test', () => {
  beforeEach(done => {
    if (should) { }
    let tableNames = []
    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) tableNames.push(`"${db[modelName].getTableName()}"`)
    })

    const joinedString = tableNames.join(', ')
    db.sequelize.query('TRUNCATE TABLE ' + joinedString + ' CASCADE')
    done()
  })

  // it('Should create user account', (done) => {
  //   createAccount()
  //     .then(createAccount => {
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done(err)
  //     })
  // })

  // it('Should get all user Accounts', (done) => {
  //   getAllUserAccount()
  //     .then((accounts) => {
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done(err)
  //     })
  // })

  // it('Should get account by account number', (done) => {
  //   getAccountByAccountNumber()
  //     .then((account) => {
  //       done()
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //       done(err)
  //     })
  // })
})
