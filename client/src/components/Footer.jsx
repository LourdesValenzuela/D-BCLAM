import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <span>VÍSTETE SIN LÍMITES. DESCUBRE TU ESTILO EN D'BCLAM.</span>
            </div>
            <div className='footer-medio'>
                <div>
                    <span>D'BCLAM</span>
                    <p>El mejor look en cualquier momento y lugar.</p>
                </div>
                <div>
                    <h2><Link to="/categoria/mujer">Para ella</Link></h2>
                    <ul>
                        <li>Vaqueros de mujer</li>
                        <li>Tops y camisas</li>
                        <li>Chaquetas de mujer</li>
                        <li>Accesorios para mujer</li>
                    </ul>
                </div>
                <div>
                    <h2> <Link to="/categoria/hombre">Para él</Link></h2>
                    <ul>
                        <li>Vaqueros de hombre</li>
                        <li>Camisas de hombre</li>
                        <li>Zapatos de hombre</li>
                        <li>Accesorios para hombre</li>
                    </ul>
                </div>
                <div>
                    <span>Horario de Atención</span>
                       <p>Lunes a Viernes: 09:00hs a 19:00hs </p>
                       <p>Sábado: 09:00hs a 20:00hs </p>
                       <p>Domingo: 12:00hs a 18:00hs </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>Copyrigth © D'BCLAM, desarrollado por D'BCLAM </p>
            </div>
        </div >
    )
}

export default Footer;
