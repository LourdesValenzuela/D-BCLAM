const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./routes/products'); // Rutas para los productos
const authRoutes = require('./routes/auth'); // Rutas para la autenticación

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cadena de conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/myfashionstore'; // Cambia esto según tu configuración

// Conectar a MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/products', productRoutes); // Maneja las rutas de productos
app.use('/api/auth', authRoutes); // Maneja las rutas de autenticación


// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
