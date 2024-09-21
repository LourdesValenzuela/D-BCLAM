import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CargarProductos/CargarProductos.css'; 

const CargarProductos = ({ actualizarListaProductos }) => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [imagen, setImagen] = useState(null);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para mensaje de éxito

    const navegacion = useNavigate();

    const enviarFormularioProducto = async (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('precio', precio);
        formData.append('descripcion', descripcion);
        formData.append('categoria', categoria);
        formData.append('imagen', imagen);

        try {
            const URL = "http://localhost:5000/api/products"; // URL de la API
            const respuesta = await axios.post(URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Actualizar la lista de productos en el componente padre
            actualizarListaProductos(respuesta.data);

            // Reiniciar campos del formulario
            setNombre("");
            setPrecio(0);
            setDescripcion("");
            setCategoria("");
            setImagen(null);
            setShowSuccessMessage(true); // Mostrar mensaje de éxito

        } catch (error) {
            console.log("Algo falló", error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.message : "Error de conexión");
        }
    };

    return (
        <div className="cargar-producto-container">
            {showSuccessMessage && (
                <div className="success-message">
                    <p>¡Producto agregado exitosamente!</p>
                </div>
            )}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}
            <form onSubmit={enviarFormularioProducto} className="form-container">
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="precio">Precio:</label>
                    <input
                        type="number"
                        id="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="descripcion">Descripción:</label>
                    <input
                        type="text"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="mujer">Mujer</option>
                        <option value="hombre">Hombre</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="imagen">Imagen:</label>
                    <input
                        type="file"
                        id="imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
                        required
                    />
                </div>
                <div className='botones'>
                    <button type="submit">Agregar nuevo producto</button>
                    <button type="button" onClick={() => navegacion("/todosLosProductos")}>
                        Ver todos los productos desde el usuario
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CargarProductos;
