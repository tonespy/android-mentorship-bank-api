/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Paystack Service
  */

const { paystack } = (process.env.NODE_ENV === 'production') ? require('../../config/env/production') : require('../../config/env/development')
const paystackHeader = { Authorization: ['Bearer ', paystack.secret_key].join(''), 'Content-Type': 'application/json' }
const request = require('request-promise')
const { to } = require('./HelperService')

const verifyBvn = async (bvn) => {
  let options = {
    method: 'GET',
    url: `${paystack.resolve_bvn}/${bvn}`,
    headers: paystackHeader,
    json: true,
    resolveWithFullResponse: true
  }

  const [verifyError, verifyResponse] = await to(request(options))

  return (verifyError) ? Promise.reject(verifyError) : Promise.resolve(verifyResponse.body)
}

module.exports = { verifyBvn }
