import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { Link } from 'react-router-dom';

const Create = () => {
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  const productsCollection = collection(db, 'products');

  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, { description: description, stock: stock });
    navigate('/Inicio');
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'  style={{ backgroundColor: "#6CB48D", color: "white" }} >
            <div className='card-body'>
              <h1 className='card-title text-center'>Agregar Cumpleaños</h1>
              <form onSubmit={store}>
                <div className='mb-3'>
                  <label htmlFor='description' className='form-label'>
                    Cumpleaños
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                    id='description'
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='stock' className='form-label'>
                    Fecha
                  </label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type='date'
                    className='form-control'
                    id='stock'
                  />
                </div>
                <div className='text-center'>
                  <button type='submit' className='btn btn-primary'>
                    Guardar
                  </button>
                  <Link to='/Inicio'>
                    <button className='btn btn-secondary ml-2'>
                      Atrás
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
