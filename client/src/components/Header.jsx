import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderHome.css';

const Header = () => {
    return (
        <div className="header-home">
            <h1>Mira todo lo que tenemos <br /> Para ti!</h1>

            <button className="comprar-ahora-boton">
                <Link to="/todosLosProductos">COMPRAR AHORA</Link>
            </button>
        </div>
    );
};

export default Header;
