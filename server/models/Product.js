const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, required: true },
    categoria: { type: String, enum: ['mujer', 'hombre', 'accesorios'], required: true },
    imagen: { type: String, required: true }
});

module.exports = mongoose.model('Product', ProductSchema);