import React, { useState, useEffect } from 'react';
import CargarProductos from '../CargarProductos/CargarProductos';
import ProductList from '../ProductList/ProductList';
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const [productos, setProductos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [productoEditado, setProductoEditado] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/check', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
                });
                setIsAuthenticated(response.data.isAuthenticated);
            } catch (error) {
                console.error('Error al verificar autenticación:', error);
            }
        };
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchProducts = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/products');
                    setProductos(response.data);
                } catch (error) {
                    console.error('Error al obtener los productos:', error);
                }
            };
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('authToken', response.data.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', { companyName, email, password });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    // Función para actualizar la lista de productos
    const actualizarListaProductos = (nuevoProducto) => {
        setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
    };

    // Función para eliminar un producto
    const eliminarProductoDeLaLista = async (productoId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productoId}`); // Ajusta la URL según tu API
            setProductos((prevProductos) => prevProductos.filter(producto => producto._id !== productoId));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    const editarProducto = async (productoId, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/products/${productoId}`, updatedData); // Ajusta la URL según tu API
            setProductos((prevProductos) =>
                prevProductos.map(producto =>
                    producto._id === productoId ? response.data : producto
                )
            );
            setProductoEditado(null); // Resetea el estado de edición
        } catch (error) {
            console.error("Error al editar el producto:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Página del Administrador</h1>
            {!isAuthenticated ? (
                <div className="form-wrapper">
                    <div className="form-container">
                        <form onSubmit={handleLogin}>
                            <h2>Iniciar sesión</h2>
                            <div className="form-group">
                                <label>Correo:</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Contraseña:</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit">Iniciar sesión</button>
                        </form>
                    </div>
                    <div className="form-container">
                        <form onSubmit={handleRegister}>
                            <h2>Registro</h2>
                            <div className="form-group">
                                <label>Nombre de la empresa:</label>
                                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Correo:</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Contraseña:</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit">Registrar</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <CargarProductos actualizarListaProductos={actualizarListaProductos} />
                    <ProductList
                        productos={productos}
                        eliminarProductoDeLaLista={eliminarProductoDeLaLista}
                        setProductoEditado={setProductoEditado}
                    />
                    {productoEditado && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            editarProducto(productoEditado._id, {
                                nombre: productoEditado.nombre,
                                precio: productoEditado.precio,
                                descripcion: productoEditado.descripcion,
                                categoria: productoEditado.categoria,
                                imagen: productoEditado.imagen
                            });
                        }}>
                            <h2>Editar Producto</h2>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    value={productoEditado.nombre}
                                    onChange={(e) => setProductoEditado({ ...productoEditado, nombre: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    value={productoEditado.precio}
                                    onChange={(e) => setProductoEditado({ ...productoEditado, precio: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Descripción:</label>
                                <input
                                    type="text"
                                    value={productoEditado.descripcion}
                                    onChange={(e) => setProductoEditado({ ...productoEditado, descripcion: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Categoría:</label>
                                <input
                                    type="text"
                                    value={productoEditado.categoria}
                                    onChange={(e) => setProductoEditado({ ...productoEditado, categoria: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Imagen:</label>
                                <input
                                    type="text"
                                    value={productoEditado.imagen}
                                    onChange={(e) => setProductoEditado({ ...productoEditado, imagen: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit">Actualizar</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPage;
