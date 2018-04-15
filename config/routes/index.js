/**
  * Created By Oladeji Abubakar Adebowale
  * @tonespy
  * Routes Index
  */

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Mentorship Banking API V1'
  }))

  app.post('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Mentorship Banking API V1'
  }))
}
