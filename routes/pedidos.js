const express = require('express');
const router = express.Router();
const Pedido = require('../models/Pedido');
const verificarRol = require('../middlewares/verificarRol'); 

router.get('/', verificarRol(['admin', 'vendedor']), async (req, res) => {
  try {
    const pedidos = await Pedido.find()
      .populate('usuario', 'nombre correo')
      .populate('productos.producto', 'nombre precio');
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pedidos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = new Pedido(req.body);
    await nuevo.save();
    res.json({ mensaje: 'Pedido creado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear pedido' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Pedido.findByIdAndUpdate(req.params.id, { estado: req.body.estado });
    res.json({ mensaje: 'Estado actualizado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
});

module.exports = router;
