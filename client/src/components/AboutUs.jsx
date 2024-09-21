import React from 'react';
import './AboutUs.css'; 

const AboutUs = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <section className="about-us">
          <h2>Quiénes Somos</h2>
          <p>
            Bienvenido a D'BCLAM, su destino único para lo último en moda.
            Ofrecemos una amplia gama de ropa, zapatos y accesorios,
            cuidadosamente seleccionados para mantenerte elegante y cómodo.
            Nuestra misión es brindarle lo mejor en calidad y diseño,
            atendiendo a todas sus necesidades de moda, ya sea ropa casual,
            vestimenta de oficina o trajes de noche.
          </p>
          <p>
            Nuestro equipo trabaja incansablemente para mantenerse a la
            vanguardia de las tendencias, asegurando que nuestra colección
            esté siempre fresca y relevante. Centrándonos en la
            sostenibilidad, también ofrecemos una selección de productos
            ecológicos que le permiten comprar con confianza.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
