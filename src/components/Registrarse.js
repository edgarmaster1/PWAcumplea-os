import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig/firebase';

const RegistroUsuario = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    contraseña: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = db.collection('1123');
    ref
      .add(userData)
      .then(() => {
        console.log('Usuario registrado con éxito');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: '500px', backgroundColor: '#309735', color: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <div className="card-body">
          <h2 className="card-title text-center">Registrar Nuevo Usuario</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="contraseña" className="form-label">
                Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="contraseña"
                name="contraseña"
                value={userData.contraseña}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
