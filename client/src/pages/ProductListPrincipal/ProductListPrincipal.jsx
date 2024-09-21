import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../ProductListPrincipal/ProductListPrincipal.css';
import globeIcon from '../assets/iconsProductListP/globeIcon.png';
import mannequinIcon from '../assets/iconsProductListP/mannequinIcon.png';
import offerIcon from '../assets/iconsProductListP/offerIcon.png';
import secureIcon from '../assets/iconsProductListP/secureIcon.png';

const ProducListPrincipal = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/');

        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const productosFiltrados = productos.reduce((acc, producto) => {
    if (!acc[producto.categoria]) {
      acc[producto.categoria] = [];
    }
    if (acc[producto.categoria].length < 4) {
      acc[producto.categoria].push(producto);
    }
    return acc;
  }, {});

  return (
    <div className="gallery">
      <div className='featured'><h2>Productos Destacados</h2></div>
      <div className='seccionUno'>
        {Object.keys(productosFiltrados).map((categoria) => (
          <div key={categoria} className="seccion">
            <Link to={`/categoria/${categoria}`} className="categoria-link">
              <h3>{categoria}</h3>
            </Link>
            <div className="productos">
              {productosFiltrados[categoria].map((producto) => (
                <div key={producto._id} className="producto-card">
                  <img
                    src={`http://localhost:5000/uploads/${producto.imagen}`}
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'ruta/a/imagen/placeholder.jpg'; 
                    }}
                  />
                  <h3>{producto.nombre}</h3>
                  <p>Precio: {producto.precio.toFixed(2)} Gs.</p>
                  <p>Categoría: {producto.categoria}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="icons">
        <div className='iconSeccion'>
          <img src={globeIcon} alt="" />
          <h2>Envío mundial</h2>
          <p>Realizamos envíos a todas partes del mundo, para que puedas recibir tu pedido sin importar la distancia</p>
        </div>
        <div className='iconSeccion'>
          <img src={mannequinIcon} alt="" />
          <h2>Mejor calidad</h2>
          <p>Seleccionamos productos de alta calidad para garantizar tu satisfacción y la durabilidad de cada compra.</p>
        </div>
        <div className='iconSeccion'>
          <img src={secureIcon} alt="" />
          <h2>Pago Seguro</h2>
          <p>Tu seguridad es nuestra prioridad. Utilizamos métodos de pago seguros y protegemos toda tu información personal.</p>
        </div>
      </div>
    </div>
  );
};

export default ProducListPrincipal;
