import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Asegúrate de que el archivo CSS esté presente para el estilo

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            navigate('/admin'); // Redirige a la página de administración
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales inválidas o error en el servidor.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
