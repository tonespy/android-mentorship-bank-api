/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Helper Service
  */

const to = (promise) => {
  return promise.then(data => {
    return [null, data]
  }).catch(err => [err])
}

const isEmail = (email) => {
  return /^([w!#$%&'*+-/=?^`{|}~]+.)*[w!#$%&'*+-/=?^`{|}~]+@((((([a-z0-9]{1}[a-z0-9-]{0,62}[a-z0-9]{1})|[a-z]).)+[a-z]{2,6})|(d{1,3}.){3}d{1,3}(:d{1,5})?)$/i.test(email)
}

module.exports = { to, isEmail }
