const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/', async (req, res) => {
  const { correo, clave } = req.body;

  const usuario = await Usuario.findOne({ correo });
  if (!usuario) {
    return res.status(401).json({ mensaje: 'Correo no registrado' });
  }

  const claveOk = await usuario.compararClave(clave);
  if (!claveOk) {
    return res.status(401).json({ mensaje: 'Clave incorrecta' });
  }

  res.json({
    mensaje: 'Login exitoso',
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol
    }
  });
});

module.exports = router;

