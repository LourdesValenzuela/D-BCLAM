import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Asegúrate de que el archivo CSS esté presente para el estilo

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { companyName, email, password });
            navigate('/login'); // Redirige a la página de inicio de sesión
        } catch (error) {
            console.error('Error al registrarse:', error);
            alert('Error en el registro, por favor intente de nuevo.');
        }
    };

    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="companyName">Nombre de la empresa:</label>
                    <input
                        type="text"
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
