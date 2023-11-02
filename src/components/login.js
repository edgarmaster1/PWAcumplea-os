import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig/firebase";

//import { OcupoContexto } from "../../contenedordatos/contenedordatos";

function LoginD() {
  const Navegacion = useNavigate();
  //const { administrandoWeb, setAdministrandoWeb } = OcupoContexto();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [matricula, setMatricula] = useState("");

  const handleLogin = async () => {
    const UsersRef = db.collection("1123");
    const snapshot = await UsersRef.get();
    const UsersData = snapshot.docs.map((doc) => doc.data());
    console.log(UsersData);

    const PorNombre = UsersData.filter((item) => item.usuario  === username);
    const PorPassWord = PorNombre.filter((item) => item.contraeña === password);
    // // const PorMatricula = PorPassWord.filter(
    // //   (item) => item.matricula === matricula
    // );

    console.log(PorPassWord);

    if (PorPassWord.length > 0) {
      //setAdministrandoWeb("Administrando");
      setTimeout(() => {
        Navegacion("/Inicio");
      }, 1000);
    }
  };

  return ( 
    <div id="uno" className="container"
      style={{ 
            
        display: "grid",
        gridTemplateColumns: "1fr", // Columna única
        backgroundColor: "#55B980 ",
        borderRadius: "10px",
        boxShadow: "3px 3px 5px gray",
    }} >


      <div className="p-3 text-center">
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Escribe tus credenciales de acceso para seguir</h2>
        {/* {administrandoWeb === 'No_Admin'
        ?<p className="text-danger">Estado Actual: {} </p>
        :<p className="text-success">Estado Actual: {} </p>} */}
        
      </div>
      <form >
        <div className="text-center">
          <div  style={{ marginBottom: '5px' }}>
            <label className="fw-bold">Nombre de usuario:</label>
            <br />
            <input
              className="form-control-sm"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label className="fw-bold">Contraseña:</label>
            <br />
            <input
              className="form-control-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          {/* <div>
            <label className="fw-bold">Matrícula:</label>
            <br />
            <input
              className="form-control-sm"
              type="text"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
          </div> */}
          <br />
          <div className="p-3">
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-success"
              style={{
              
                backgroundColor: '#001A73',
                color: 'white',
                padding: '6px 30px',
                borderRadius: '10px',
                border: 'border',
                cursor: 'pointer'
              }}
              >
              Iniciar sesión
            </button>
          </div>
        </div>
      </form>
    </div>

  );
}
export default LoginD 