const authService = require('../services/auth.services');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const usuario = await authService.login(username, password);

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    res.status(200).json({ message: 'Login exitoso', userId: usuario.id });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const registrar = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const usuario = await authService.registrar(username, email, password);
    res.status(201).json({ message: 'Usuario creado correctamente', userId: usuario.id });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'El usuario o correo ya está registrado' });
    }
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login, registrar };