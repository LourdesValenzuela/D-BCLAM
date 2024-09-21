import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import PageSection from './pages/PageSection/PageSection'; // Asegúrate de que el nombre sea correcto
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage/AdminPage';
import TodosLosProductos from './pages/TodosLosProductos/TodosLosProductos';
import ProductosPorCategoria from './pages/ProductosPorCategoria/ProductosPorCategoria';
import Carrito from './pages/Carrito/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [itemsCarrito, setItemsCarrito] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [productos, setProductos] = useState([]);

  const actualizarListaProductos = (nuevoProducto) => {
    setListaDeProductosPrincipales((previaLista) => [...previaLista, nuevoProducto]);
  };

  const eliminarProductosDeLaLista = (_id) => {
    setListaDeProductosPrincipales((previaLista) =>
      previaLista.filter((producto) => producto._id !== _id)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(itemsCarrito));
    setCartCount(itemsCarrito.reduce((total, item) => total + item.cantidad, 0));
  }, [itemsCarrito]);

  const handleAddToCart = (producto) => {
    setItemsCarrito((prevItems) => {
      const existingItem = prevItems.find(item => item._id === producto._id);

      if (existingItem) {
        return prevItems.map(item =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevItems, { ...producto, cantidad: 1 }];
    });
  };

  const handleCompletePurchase = () => {
    setItemsCarrito([]);
    setCartCount(0);
  };

  const agregarProducto = (nuevoProducto) => {
    setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
  };

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<PageSection productos={productos} onAddToCart={handleAddToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage
          actualizarListaProductos={actualizarListaProductos} />} />
        <Route path="/todosLosProductos" element={<TodosLosProductos onAddToCart={handleAddToCart} />} />
        <Route path="/categoria/:categoria" element={<ProductosPorCategoria onAddToCart={handleAddToCart} />} />
        <Route path="/carrito" element={<Carrito itemsCarrito={itemsCarrito} completarCompra={handleCompletePurchase} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

