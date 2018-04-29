/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Routes Index
  */

const { createUser, updateUser, viewUser, deleteUser, listUser } = require('../../api/controllers/UserController');
const login = require('../../api/controllers/AuthController');
const { authenticated } = require('../../api/polices/authenticated');
const { isAdmin } = require('../../api/polices/isAdmin');
const account = require('../../api/controllers/AccountController');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Mentorship Banking API V1'
  }));

  app.post('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Mentorship Banking API V1'
  }));

  // User Controller
  app.post('/api/user', createUser);
  app.delete('/api/user/:id', authenticated, deleteUser);
  app.put('/api/user/:id', authenticated, updateUser);
  app.get('/api/users', authenticated, isAdmin, listUser);
  app.get('/api/user/:id', authenticated, viewUser);

  // Account Controller
	app.get('/api/account/:account_number', account.getAccountByAccountNumber);
	app.get('/api/user/accounts/:user_id', account.getAllUsersAccounts);
	app.post('/api/account/create/:user_id', account.createAccount);

  // Auth Controller
  app.post('/api/login', login)
};
