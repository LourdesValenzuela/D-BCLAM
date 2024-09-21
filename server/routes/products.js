const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Ruta para crear un nuevo producto
router.post('/', productController.upload.single('imagen'), productController.createProduct);

// Ruta para obtener todos los productos
router.get('/', productController.getAllProducts);

// Ruta para actualizar un producto específico por ID
router.put('/:id', productController.upload.single('imagen'), productController.updateProduct);


// Ruta para eliminar un producto específico por ID
router.delete('/:id', productController.deleteProduct);

// Ruta para obtener productos por categoría
router.get('/categoria/:categoria', productController.getProductsByCategory);

module.exports = router;