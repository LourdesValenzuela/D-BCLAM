import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ productos, eliminarProductoDeLaLista, setProductoEditado }) => {
    return (
        <div>
            <h2>Lista de Productos</h2>
            <div className="product-list">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto._id} className="product-card">
                            <h3>{producto.nombre}</h3>
                            <p>Precio: {producto.precio} Gs.</p>
                            <p>Descripción: {producto.descripcion}</p>
                            <p>Categoría: {producto.categoria}</p>
                            <img src={`http://localhost:5000/uploads/${producto.imagen}`} alt={producto.nombre} />
                            <div className='botones'>
                                <button onClick={() => eliminarProductoDeLaLista(producto._id)}>Eliminar</button>
                                <button onClick={() => setProductoEditado(producto)}>Editar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;