const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Ruta para verificar la autenticación
router.get('/check', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ isAuthenticated: false, message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_secreto'); // Asegúrate de que 'tu_secreto' coincida con el utilizado para firmar el token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ isAuthenticated: false, message: 'Usuario no encontrado' });
        }
        return res.json({ isAuthenticated: true, user: { id: user._id, username: user.username } });
    } catch (error) {
        return res.status(401).json({ isAuthenticated: false, message: 'Token no válido' });
    }
});

// Ruta para el login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user._id }, 'tu_secreto', { expiresIn: '1h' }); // Genera un token JWT
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para el registro
router.post('/register', async (req, res) => {
    try {
        const { companyName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ companyName, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;