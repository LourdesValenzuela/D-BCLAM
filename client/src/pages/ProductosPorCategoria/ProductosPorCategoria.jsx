import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../ProductosPorCategoria/ProductosPorCategoria.css';

const ProductosPorCategoria = ({ onAddToCart }) => {
    const { categoria } = useParams(); // Obtiene la categoría de la URL
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
         // Desplazar hacia arriba cuando se cargue el componente
        window.scrollTo(0, 0);
        
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/categoria/${categoria}`);

                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('No se pudieron cargar los productos. Intenta de nuevo más tarde.');
            }
        };

        fetchProducts();
    }, [categoria]); // La dependencia es la categoría para volver a ejecutar el efecto si cambia

    return (
        <div className="productos-por-categoria">
            <h2>Bienvenido a la sección de {categoria}</h2>
            {error && <p className="error">{error}</p>} {/* Mostrar mensaje de error si hay */}

            <div className="galeria">
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto._id} className="producto-card">
                            <img src={`http://localhost:5000/uploads/${producto.imagen}`} alt={producto.nombre} />
                            <h3>{producto.nombre}</h3>
                            <p>Precio: {producto.precio} Gs.</p>
                            <p>{producto.descripcion}</p>
                            <button onClick={() => onAddToCart(producto)}>Añadir al carrito</button>
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default ProductosPorCategoria;
