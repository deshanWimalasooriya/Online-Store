const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    {
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    },
    {
      username: 'testuser',
      email: 'user@example.com',
      password: hashedPassword,
      role: 'user'
    }
  ]);
};
