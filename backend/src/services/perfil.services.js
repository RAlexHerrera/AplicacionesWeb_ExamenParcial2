const pool = require('../db/pool');

const obtenerPerfil = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM perfil WHERE usuario_id = $1',
    [userId]
  );
  return result.rows[0] || null;
};

const crearPerfil = async (userId, datos) => {
  const { nombre, apellido, edad, correo, telefono } = datos;
  const result = await pool.query(
    `INSERT INTO perfil (usuario_id, nombre, apellido, edad, correo, telefono)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [userId, nombre, apellido, edad, correo, telefono]
  );
  return result.rows[0];
};

const actualizarPerfil = async (userId, datos) => {
  const { nombre, apellido, edad, correo, telefono } = datos;
  const result = await pool.query(
    `UPDATE perfil
     SET nombre = $1, apellido = $2, edad = $3, correo = $4, telefono = $5
     WHERE usuario_id = $6 RETURNING *`,
    [nombre, apellido, edad, correo, telefono, userId]
  );
  return result.rows[0];
};

module.exports = { obtenerPerfil, crearPerfil, actualizarPerfil };