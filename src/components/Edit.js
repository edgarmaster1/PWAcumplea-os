import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import { Link } from "react-router-dom";

const Edit = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = { description: description, stock: stock };
    await updateDoc(product, data);
    navigate("/Inicio");
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      setDescription(product.data().description);
      setStock(product.data().stock);
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card" style={{ backgroundColor: "#6CB48D", color: "white" }} >
            <div className="card-body">
              <h2 className="card-title text-center">Editar Cumpleaños</h2>
              <form onSubmit={update}>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                    id="description"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Fecha
                  </label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="date"
                    className="form-control"
                    id="stock"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                  <Link to="/Inicio">
                    <button className="btn btn-secondary ml-2">Atrás</button>
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

export default Edit;
