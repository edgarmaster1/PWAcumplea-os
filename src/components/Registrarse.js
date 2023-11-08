import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
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

    // try {
    //   const usersCollection = collection(db, 'usuarios');
    //   await addDoc(usersCollection, userData);
    //   // Puedes mostrar un mensaje de éxito o redirigir al usuario a una página diferente.
    //   console.log('Usuario registrado con éxito');
    //   navigate('/Inicio'); // Redirige al usuario a la página de inicio después del registro.
    // } catch (error) {
    //   // Maneja cualquier error de registro, muestra un mensaje de error o registra el error.
    //   console.error('Error al registrar usuario:', error);
    // }

    const ref  = db.collection('1123')
    ref.add(userData)
    .then(()=>{
        console.log('Se Guardo')
        navigate('/Inicio')
        
    })
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2>Registrar Nuevo Usuario</h2>
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
