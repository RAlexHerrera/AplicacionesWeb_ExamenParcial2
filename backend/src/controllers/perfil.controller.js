const perfilService = require('../services/perfil.services');

const obtenerPerfil = async (req, res) => {
  try {
    const { userId } = req.params;
    const perfil = await perfilService.obtenerPerfil(userId);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el perfil' });
  }
};

const crearPerfil = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nombre, apellido, edad, correo, telefono } = req.body;

    if (!nombre || !apellido || !edad || !correo || !telefono) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const perfil = await perfilService.crearPerfil(userId, req.body);
    res.status(201).json(perfil);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el perfil' });
  }
};

const actualizarPerfil = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nombre, apellido, edad, correo, telefono } = req.body;

    if (!nombre || !apellido || !edad || !correo || !telefono) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const perfil = await perfilService.actualizarPerfil(userId, req.body);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

module.exports = { obtenerPerfil, crearPerfil, actualizarPerfil };