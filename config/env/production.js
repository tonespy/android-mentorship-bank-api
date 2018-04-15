const paystack = {
  pk_key: process.env.MENTOR_PAYSTACK_PK,
  sk_key: process.env.MENTOR_PAYSTACK_SK,
  charge_endpoint: 'https://api.paystack.co/charge',
  submit_otp: 'https://api.paystack.co/charge/submit_otp',
  submit_pin: 'https://api.paystack.co/charge/submit_pin',
  submit_phone: 'https://api.paystack.co/charge/submit_phone',
  submit_birthday: 'https://api.paystack.co/charge/submit_birthday',
  resolve_bvn: 'https://api.paystack.co/bank/resolve_bvn/'
}

const authData = {
  jwtExpiry: 7200,
  jwtSecret: process.env.JWT_SECRET,
  audience: 'android-mentorship.com',
  issuer: 'Tonespy'
}

module.exports = { paystack, authData }
