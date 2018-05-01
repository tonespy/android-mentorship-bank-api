/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * User Controller Integration Test
  */

const db = require('../../../api/models')
const { describe, beforeEach, it } = require('mocha')
// const server = require('../../../app')
const chai = require('chai')
// const chaiHttp = require('chai-http')
const should = chai.should()
const { createSuperAdmin } = require('../../fixtures/user')

describe('User Integration Test', () => {
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

  it('Should create super admin', (done) => {
    createSuperAdmin()
      .then(createdUsegit
      )
      .catch(err => {
        done(err)
      })
  })
})
