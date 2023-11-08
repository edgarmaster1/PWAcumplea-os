import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const productsCollection = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    getProducts();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar registro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, bórralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire(
          'Eliminado!',
          'Tu archivo ha sido eliminado.',
          'Listo!!'
        );
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            
          </div>
          <div className='d-flex mb-2'>
            <input
              type="text"
              placeholder="Buscar "
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
          <Link to="/create">
              <button className='btn btn-primary mt-2 mb-2' style={{ backgroundColor: "#135EA2", border: "none" }}>Agregar nuevo cumpleaños</button>
            </Link>
          <div className="table-responsive">
            <table className='table table-striped table-bordered table-hover'>
              <thead className="thead-dark">
                <tr>
                  <th>Personas</th>
                  <th>Fechas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.description}</td>
                    <td>{product.stock}</td>
                    <td>
                      <Link to={`/edit/${product.id}`} className="btn btn-info"><i className="fa-solid fa-pencil"></i></Link>
                      <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;