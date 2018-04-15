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
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
}
