module.exports = {
  development: {
    use_env_variable: 'MENTOR_POSTGRES_TEST',
    dialect: 'postgres',
    logging: false
  },
  test: {
    username: process.env.PGUSER,
    password: null,
    database: 'mentor_database_test',
    host: process.env.PGHOST,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false
  }
};
