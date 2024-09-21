import React, { useState } from 'react';
import './Carrito.css'; 

const Carrito = ({ itemsCarrito, completarCompra }) => {
  const [compraCompleta, setCompraCompleta] = useState(false);

  const calcularTotal = (items) => {
    let total = 0;
    for (const item of items) {
      total += item.precio * item.cantidad;
    }
    return total;
  };

  const total = calcularTotal(itemsCarrito);

  const manejarCompletarCompra = () => {
    completarCompra();
    setCompraCompleta(true);
  };

  return (
    <div className="carrito">
      <h1>Carrito de compras</h1>
      {compraCompleta ? (
        <div className="mensaje-exito">
          <h3>¡Compra completada con éxito!</h3>
          <p>Gracias por tu compra. ¡Regresa pronto!</p>
        </div>
      ) : itemsCarrito.length > 0 ? (
        <div className="carrito-contenido">
          <ul className="carrito-lista">
            {itemsCarrito.map((item) => (
              <li key={item._id} className="carrito-item">
                <img
                  src={item.imagen ? `http://localhost:5000/uploads/${item.imagen}` : 'ruta/default/image.jpg'}
                  alt={item.nombre}
                  className="carrito-item-image"
                />
                <div className="carrito-item-details">
                  <h3>{item.nombre}</h3>
                  <p>Precio individual: {item.precio} Gs.</p>
                  <p>Cantidad: {item.cantidad}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="carrito-resumen">
            <div className="carrito-resumen-item">
              <span className="carrito-total-titulo">Total:</span>
              <span className="carrito-total-monto">{total} Gs.</span>
            </div>
            <button onClick={manejarCompletarCompra} className="carrito-completar-compra-button">
              Completar Compra
            </button>
          </div>
        </div>
      ) : (
        <div className="mensaje-carrito-vacio">
          <h3>Su carrito está vacío...</h3>
          <p>Agregue algunos productos para continuar.</p>
        </div>
      )}
    </div>
  );
};

export default Carrito;
