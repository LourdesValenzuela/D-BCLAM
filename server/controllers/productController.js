const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Guarda el archivo con un nombre único
    },
});

const upload = multer({ storage });

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { nombre, precio, descripcion, categoria } = req.body;
        const imagen = req.file.filename; // Obtener la ruta de la imagen
        const newProduct = new Product({ nombre, precio, descripcion, categoria, imagen });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const { categoria } = req.query;
        const query = categoria ? { categoria } : {};
        const products = await Product.find(query);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: error.message });
    }
};

// Función para actualizar un producto
const updateProduct = async (req, res) => {
    const productId = req.params.id; // Obtener el ID del producto de los parámetros de la solicitud
    const { nombre, precio, descripcion, categoria } = req.body; // Obtener los datos del producto de la solicitud

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { nombre, precio, descripcion, categoria, imagen: req.file ? req.file.path : undefined },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id; // Asegúrate de que estás usando 'id'

    try {
        const producto = await Product.findById(productId);

        if (!producto) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        await Product.findByIdAndDelete(productId); // Esto elimina el producto directamente

        res.status(200).send({ message: 'Producto eliminado' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).send({ message: 'Error al eliminar el producto' });
    }
};

// Obtener productos por categoría
const getProductsByCategory = async (req, res) => {
    const { categoria } = req.params; // Obtiene la categoría de la URL
    try {
        const productos = await Product.find({ categoria }); // Filtra los productos por categoría
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ message: error.message });
    }
};

// Exportar el middleware de Multer y las funciones
module.exports = {
    upload,
    createProduct,
    getAllProducts,
    getProductsByCategory,
    updateProduct,
    deleteProduct
};
