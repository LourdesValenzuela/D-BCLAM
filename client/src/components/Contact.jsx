import React from 'react';
import './Contact.css'; 

const Contact = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <section className="contact-info">
          <h2>Ponte en Contacto con Nosotros</h2>
          <p>
            En D’BCLAM queremos saber de ti! Si tienes alguna pregunta,
            comentario o necesitas asistencia, no dudes en ponerte en contacto
            con nosotros. Estaremos encantados de ayudarte y asegurarnos de que tengas la mejor
            experiencia de compra.
          </p>
          <p>
            Puedes enviarnos un correo electrónico a <a href="mailto:dbclam@gmail.com">dbclam@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;

