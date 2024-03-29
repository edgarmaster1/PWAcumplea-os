import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";

function LoginD() {
  const Navegacion = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
    const handleLogin = async () => {
      const UsersRef = db.collection("1123");
      const snapshot = await UsersRef.get();
      const UsersData = snapshot.docs.map((doc) => doc.data());
      console.log(UsersData);
      
      const PorNombre = UsersData.filter((item) => item.nombre === username);
      const PorPassWord = PorNombre.filter((item) => item.contraseña === password);  
      console.log(PorPassWord);

      PorPassWord.length > 0 
      ? 
      Navegacion('/Inicio')
      :
      Navegacion('/')

  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card" style={{ width: "500px", backgroundColor: "#309735", color: "white", borderRadius: "10px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <div className="card-body">
          <h2 className="card-title text-center">
            <FontAwesomeIcon icon={faUser} size="lg" /> Iniciar sesión
          </h2>
          <br />
          <form>
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario:</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className="text-center">
              <button type="button" onClick={handleLogin} className="btn btn-primary" style={{ backgroundColor: "#0B54BD  ", padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer" }}>
                Iniciar sesión
              </button>

              {/* Agrega un enlace (Link) a la vista de registro */}
              <Link to="/Registrarse" className="btn btn-secondary" style={{ padding: "10px 20px", borderRadius: "5px", border: "none", cursor: "pointer", marginLeft: "10px" }}>
                Registrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginD;
