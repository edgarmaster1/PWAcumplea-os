import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Edit = () => {
    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)

    const navigate = useNavigate()    
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        const product = doc(db, "products", id)
        const data = {description: description, stock: stock}
        await updateDoc(product, data)
        navigate('/Inicio')
    }

    const getProductById = async (id) => {
        const product = await getDoc( doc(db, "products", id) )
        if(product.exists()) {
            //console.log(product.data())
            setDescription(product.data().description)    
            setStock(product.data().stock)
        }else{
            console.log('El producto no existe')
        }
    }

    useEffect( () => {
        getProductById(id)
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1 style={{color:"white"}}>Editar Cumpleaños</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label' style={{color:"white"}}>Descripcion</label>
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
              }}
            >atras</button>
          </Link>

                    </form>  
                
                    
                     
            </div>
        </div>
    </div> 
    )
}

  

export default Edit