import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MySwal = withReactContent(Swal);

function Example(args) {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>HOLA BIENVENIDO😀</ModalHeader>
        <ModalBody>mi primera chamba</ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
}

const Show = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const productsCollection = collection(db, 'products');

  const getProducts = useCallback(async () => {
    const data = await getDocs(productsCollection);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [productsCollection]);

  const deleteProduct = useCallback(async (id) => {
    const productDoc = doc(db, 'products', id);
    await deleteDoc(productDoc);
    getProducts();
  }, [getProducts]);

  const confirmDelete = useCallback((id) => {
    MySwal.fire({
      title: '¿Eliminar registro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '¡Sí, bórralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire('Eliminado!', 'Tu archivo ha sido eliminado.', 'Listo!!');
      }
    });
  }, [deleteProduct]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = useCallback(async () => {
    const auth = getAuth();
    try {
      await auth.signOut(); // Cierra la sesión del usuario
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar style={{ backgroundColor: '#40973B' }} expand="lg">
        <Navbar.Brand as={Link} to="/">
          <h5 style={{ color: 'white' }}>Derechos reservados por Edgar Angeles Gonzalez </h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ml-auto">
            <Form inline>
              <FormControl
                type="text"
                placeholder="Buscar"
                className="mr-sm-2"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form>
            <Link
              to="/create"
              className="btn btn-primary ml-2"
              style={{ backgroundColor: '#40973B', border: 'none', color: 'white' }}
            >
              Agregar nuevo cumpleaños
            </Link>
            <Button
              variant="danger"
              onClick={handleLogout}
              as={Link}
              to="/"
              className="ml-2"
              style={{ backgroundColor: '#40973B', border: 'none', color: 'white' }}
            >
              Cerrar Sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Agregar el componente Example para mostrar el mensaje */}
      <Example />
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2"></div>
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
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
                        <Link to={`/edit/${product.id}`} className="btn btn-info">
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button onClick={() => confirmDelete(product.id)} className="btn btn-danger">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Show;
