import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { async } from '@firebase/util'


const MySwal = withReactContent(Swal)
  
const Show = () => {
  //1 - configuramos los hooks
  const [products, setProducts] = useState( [] )

  //2 - referenciamos a la DB firestore
  const productsCollection = collection(db, "products")

  //3 - Funcion para mostrar TODOS los docs
  const getProducts = async ()   => {
   const data = await getDocs(productsCollection)
   //console.log(data.docs)
   setProducts(
       data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
   )
   //console.log(products)
  }
  //4 - Funcion para eliminar un doc
  const deleteProduct = async (id) => {
   const productDoc = doc(db, "products", id)
   await deleteDoc(productDoc)
   getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Elimina el producto?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) { 
        //llamamos a la fcion para eliminar   
        deleteProduct(id)               
        Swal.fire(
          'Eliminado!',
          'Tu archivo ha sido eliminado.',
          'Listo!!'
        )
      }
    })    
  }
  //6 - usamos useEffect
  useEffect( () => {
    getProducts()
    // eslint-disable-next-line
  }, [] )
  //7 - devolvemos vista de nuestro componente
  return (
    <>
    <div className='container' style={{backgroundColor:"#941EDC"}}>
      <div className='row' >
        <div className='col' >
          <div className="d-grid gap-2" >
         {/* <Link to="/login" className='btn btn-secondary mt-2 mb-2'>login</Link>    */}

            <Link to="/create" className='btn btn-secondary mt-2 mb-2 '  style={{backgroundColor:" #12B020 "}} >Agregar nuevo cumpleaños</Link>    
          </div>
          
          <table className='table table-dark table-hover' >
            <thead  >
              <tr  >
                <th style={{backgroundColor:"#001A73 "}}>Personas</th>
                <th style={{backgroundColor:"#001A73 "}}>Fechas</th>
                <th style={{backgroundColor:"#001A73 "}}></th>
              </tr>
            </thead>
            <tbody>
              { products.map( (product) => (
                <tr key={product.id}>
                  <td style={{backgroundColor:"#001A73 "}}>{product.description}</td>
                  <td style={{backgroundColor:"#001A73 "}}>{product.stock}</td>
                  <td style={{backgroundColor:"#001A73 "}}>
                    <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                    <button onClick={ () => { confirmDelete(product.id) } } className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>                
              )) }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show