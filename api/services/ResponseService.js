/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Response Service
  */

const json = (status, res, req, message, data, meta) => {
  let response = {
    message: message,
    status: true
  };
  if (typeof data !== 'undefined') {
    response.data = data
  }
  if (typeof meta !== 'undefined') {
    response.meta = meta
  }
  return res.status(status).send(response)
};

const error = (err, res, req, status, message) => {
  let response = {
    status: false
  };
  if (typeof message !== 'undefined') {
    response.message = message
  } else {
    response.message = 'Validation Error has occured.'
  }
  if (err) {
    let e = erroParser(err);
    response.errors = e
  } else response.errors = {};
  return res.status(status).send(response)
};

const customError = (statusCode, res, req, obj, message) => {
  let response = {
    status: false,
    message: message
  };
  if (obj) response.errors = obj;
  else response.errors = {};
  return res.status(statusCode).send(response)
};

const erroParser = (err) => {
  // [ 'name', 'errors', 'fields', 'parent', 'original', 'sql' ]
  // console.log(Object.keys(err))
  if (err.name === 'SequelizeUniqueConstraintError') {
    const erroObjs = JSON.parse(JSON.stringify(err.errors));
    const response = {};
    for (const erroObj of erroObjs) {
      const message = erroObj.message.split(' ');
      response[message[0]] = erroObj.message
    }
    return response
  } else if (err.name === 'SequelizeValidationError') { // [ 'name', 'errors' ]
    const erroObjs = JSON.parse(JSON.stringify(err.errors));
    const response = {};
    for (const erroObj of erroObjs) {
      const message = erroObj.message.split(' ');
      response[message[0]] = erroObj.message
    }
    return response
  }
  return {}
};

module.exports = { json, error, customError };
