const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    stock: Number,
    categoria: String
});

module.exports = mongoose.model('Producto', ProductoSchema);
