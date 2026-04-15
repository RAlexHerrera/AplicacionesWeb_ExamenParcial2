const pool = require('../db/pool');

const login = async (username, password) => {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE (username = $1 OR email = $1) AND password = $2',
    [username, password]
  );
  return result.rows[0] || null;
};
const registrar = async (username, email, password) => {
  const result = await pool.query(
    'INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, password]
  );
  return result.rows[0];
};

module.exports = { login, registrar };