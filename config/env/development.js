const paystack = {
  pk_key: process.env.MENTOR_PAYSTACK_DEBUG_PK,
  sk_key: process.env.MENTOR_PAYSTACK_DEBUG_SK,
  charge_endpoint: 'https://api.paystack.co/charge',
  submit_otp: 'https://api.paystack.co/charge/submit_otp',
  submit_pin: 'https://api.paystack.co/charge/submit_pin',
  submit_phone: 'https://api.paystack.co/charge/submit_phone',
  submit_birthday: 'https://api.paystack.co/charge/submit_birthday',
  resolve_bvn: 'https://api.paystack.co/bank/resolve_bvn/'
};

const authData = {
  jwtExpiry: '4h',
  jwtSecret: process.env.JWT_SECRET,
  audience: 'android-mentorshipdev.com',
  issuer: 'Tonespydev'
};

module.exports = { paystack, authData };
