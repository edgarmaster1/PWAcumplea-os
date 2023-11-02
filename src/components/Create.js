import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { Link } from 'react-router-dom';
import Show from './Show';

const Create = () => {
  const [ description, setDescription ] = useState('')
  const [ stock, setStock ] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsCollection, { description: description, stock: stock } )
    navigate('/Inicio')
    //console.log(e.target[0].value)
  }

  return (
    
    <div className='container'  >
        <div className='row'>
            <div className='col'>
                <h1 style={{color:"white"}}>Agregar Cumpleaños</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label' style={{color:"white"}}>Cumpleaños</label>
                        <input
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label' style={{color:"white"}}>Fecha</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="date"
                            className='form-control'
                        />                 
                    </div> 


    
                <button type='submit' className='btn btn-primary'>Guardar</button>
           


        <Link to="/Inicio"> {}
            <button className='btn btn-secondary'
             style={{
                backgroundColor: '#001A73',
                color: 'white',
                padding: '6px 30px',
                borderRadius: '10px',
                border: 'border',
                cursor: 'pointer'
              }} >atras</button>
          </Link>
                 </form>  
                
            </div>
        </div>
    </div> 
  )
}

export default Create