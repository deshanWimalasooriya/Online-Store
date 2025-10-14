module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',  // Empty string for no password
      database: process.env.DB_NAME || 'circuitchic_db',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeders',
    },
  },
};
