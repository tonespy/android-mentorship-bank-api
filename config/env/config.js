module.exports = {
  development: {
    use_env_variable: 'MENTOR_POSTGRES_TEST',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: 'root',
    password: null,
    database: 'mentor_database_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    logging: false
  }
}
