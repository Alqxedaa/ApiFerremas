const express = require('express');
const router = express.Router();
const Carrito = require('../models/Carrito');


router.get('/:usuarioId', async (req, res) => {
  const carrito = await Carrito.findOne({ usuario: req.params.usuarioId })
    .populate('productos.producto', 'nombre precio');
  res.json(carrito || { usuario: req.params.usuarioId, productos: [] });
});

router.post('/:usuarioId', async (req, res) => {
  const { producto, cantidad } = req.body;

  let carrito = await Carrito.findOne({ usuario: req.params.usuarioId });
  if (!carrito) {
    carrito = new Carrito({ usuario: req.params.usuarioId, productos: [] });
  }

  const index = carrito.productos.findIndex(p => p.producto.toString() === producto);
  if (index !== -1) {
    carrito.productos[index].cantidad += cantidad;
  } else {
    carrito.productos.push({ producto, cantidad });
  }

  await carrito.save();
  res.json({ mensaje: 'Producto agregado al carrito' });
});


router.delete('/:usuarioId/:productoId', async (req, res) => {
  const carrito = await Carrito.findOne({ usuario: req.params.usuarioId });
  if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

  carrito.productos = carrito.productos.filter(p => p.producto.toString() !== req.params.productoId);
  await carrito.save();
  res.json({ mensaje: 'Producto eliminado del carrito' });
});

module.exports = router;
