import React, { useState } from 'react';
import './Navbar.css';
import AboutUs from './AboutUs';
import Contact from './Contact';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 

const Navbar = ({ cartCount }) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const toggleAboutModal = () => {
    setIsAboutModalOpen(!isAboutModalOpen);
  };

  const toggleContactModal = () => {
    setIsContactModalOpen(!isContactModalOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <ul className="navbar-menu">
            <li><Link to="/">PRINCIPAL</Link></li> {/* Para volver a la pagina principal*/}
            <li><Link to="/todosLosProductos">TODOS</Link></li>
            <li><Link to="/categoria/mujer">MUJERES</Link></li>
            <li><Link to="/categoria/hombre">HOMBRES</Link></li>
            <li><Link to="/categoria/accesorios">ACCESORIOS</Link></li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className="navbar-menu">
            <li><a href="#" onClick={toggleAboutModal}>ACERCA DE</a></li>
            <li><a href="#" onClick={toggleContactModal}>CONTACTO</a></li>
            <li><Link to="/carrito"><FaShoppingCart /> {cartCount}</Link></li> {/* Usa Link aquí también */}
          </ul>
        </div>
      </nav>

      {/* Modal de About Us */}
      <AboutUs isOpen={isAboutModalOpen} onClose={toggleAboutModal} />

      {/* Modal de Contacto */}
      <Contact isOpen={isContactModalOpen} onClose={toggleContactModal} />
    </>
  );
};

export default Navbar;

