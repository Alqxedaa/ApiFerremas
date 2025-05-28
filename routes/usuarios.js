const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/', async (req, res) =>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.post('/', async (req, res) =>{
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ mensaje: 'Usuario creado' });
});

router.put('/:id', async (req, res) =>{
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: 'Usuario actualizado' });
});

router.delete('/:id', async (req, res) =>{
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
});

module.exports = router;
