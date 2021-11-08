import React, { Fragment, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import Indicador from './components/Indicador'
import axios from 'axios';
import zxcvbn from 'zxcvbn'
import "./Login.css";
import {
  BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
function App() {
  const [modal, setModal] = useState(false);
  const [modalactualizar, setModalactualizar] = useState(false);
  const [nombreusuario, setNombreusuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [loginnombreusuario, setLoginnombreusuario] = useState('');
  const [logincontraseña, setLogincontraseña] = useState('');
  const [loginstatus, setLoginstatus] = useState('');
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState(false);
  const [logins, setLogins]=useState();
  const [contraseñaactualizada, setContraseñaactualizada]=useState('');
  const [statuscontraseña, setStatuscontraseña]=useState('');
  const Fuerzacontrseña = zxcvbn(contraseña);
  const Fuerzacontrseñaactualizada = zxcvbn(contraseñaactualizada);
  axios.defaults.withCredentials = true;
  const Registro = () => {
    axios.post('http://localhost:3001/registro-usuario', {
      nombre: nombreusuario,
      contraseña: contraseña
    }).then((response) => {
      console.log(response);
    });
  };
  const act=()=>{
    axios.put('http://localhost:3001/actualizar-usuario',{
      nombre: nombre,
      contraseña: contraseñaactualizada
    }).then((response)=>{
      if(response.data.Mensaje){
        setStatuscontraseña(response.data.Mensaje);
      }else{
        setStatuscontraseña('');
        setModalactualizar(false);
        setLogins(0);
      }
    })
  };
  const Login = () => {
    axios.post('http://localhost:3001/login', {
      nombre: loginnombreusuario,
      contraseña: logincontraseña
    }).then((response) => {
      if (response.data.Mensaje) {
        setLoginstatus(response.data.Mensaje);
        setEstado(false);
      } else {
        setNombre(response.data.nombre);
        setEstado(true);
        setLogins(response.data.logins);
        window.location.href="http://localhost:3000/home";
      }
    });
  };

  const logout = () => {
    setNombre('');
    setEstado(false);
    setLoginstatus('');
    setNombreusuario('');
    setLogincontraseña('');
  }
  useEffect(() => {
    axios.get('http://localhost:3001/login').then((response) => {
      if (response.data.loggedIn === true) {
        setNombre(response.data.usuario[0].nombre);
        setEstado(true);
        setLogins(response.data.usuario[0].logins);
        setContraseñaactualizada('');
      }
    });
  }, []);
  return (
    <Router>

      <Switch>
        <Route path="/home" exact>
          {estado ?
            <Fragment>
              <header>
                <nav id="titulo" className="navbar text-center d-flex justify-content-center">
                  <h1 className="d-flex justify-content-center">Hola {nombre}</h1>
                </nav>
              </header>
              <div className="container-fluid">
                <div className="row mt-5">
                  <div id="fondo" className="col col-lg-5 col-md-6 col-sm-12 p-5 m-auto shadow-sm rounded-lg">
                    <form>
                      <div class="mb-3">
                        <h1 className="form-label">Logins de usuario: {logins}</h1>
                        {(logins>10)?<h5 className="form-label" style={{color:'red'}}>Debes Cambiar de contraseña ya has superado los 10 logins</h5>:<></>}
                      </div>
                      <div className="mb-3 d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={() => setModalactualizar(true)}>Cambiar contraseña</button>
                      </div>
                      <NavLink type="button" className={(logins>10)?"btn btn-primary d-flex justify-content-center disabled": "btn btn-primary d-flex justify-content-center"} onClick={() => { logout() }} to='/'>Cerrar sesión</NavLink>
                    </form>
                  </div>
                </div>
              </div>
            </Fragment> :
            <Fragment>
              <header>
                <nav id="titulo" className="navbar text-center d-flex justify-content-center">
                  <h1 className="d-flex justify-content-center">No estas logeado</h1>
                </nav>
              </header>
            </Fragment>
          }
          <Modal isOpen={modalactualizar}>
            <div className="modal-header">
              <h5 className="modal-title fs-2" id="exampleModalLabel">Cambiar contraseña {nombre}</h5>
            </div>
            <ModalBody>
              <form id="formEditar">
                <div className="modal-body">
                  <div className="form-group">
                    {(statuscontraseña!=='')?<h5 className="form-label" style={{color:'red'}}>No puedes cambiar por la misma contraseña</h5>:<></>}
                    <label for="contraseña" className="col-form-label">Contraseña: </label>
                    <input type="password" className="form-control border-dark shadow-none" name="contraseñan" id="contraseñan" placeholder="contrseña" onChange={(e)=>{setContraseñaactualizada(e.target.value)}} />
                  </div>
                  <Indicador password={contraseñaactualizada} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModalactualizar(false)}>Cancelar</button>
                  <button type="button" className={(Fuerzacontrseñaactualizada.score < 3) ? "btn btn-primary disabled" : "btn btn-primary"} onClick={act}>Cambiar</button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </Route>
        <Route path="/" exact>
          <header>
            <nav id="titulo" className="navbar text-center d-flex justify-content-center">
              <h1 className="d-flex justify-content-center">Login</h1>
            </nav>
          </header>
          <div className="container-fluid">
            <div className="row mt-5">
              <div id="fondo" className="col col-lg-5 col-md-6 col-sm-12 p-5 m-auto shadow-sm rounded-lg">
                <form>
                  <h5 className="d-flex justify-content-center">{loginstatus}</h5>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Usuario</label>
                    <input type="text" className="form-control" placeholder="Usuario" onChange={(e) => { setLoginnombreusuario(e.target.value) }} />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Contrseña</label>
                    <input type="password" className="form-control" placeholder="Contraseña" onChange={(e) => { setLogincontraseña(e.target.value) }} />
                  </div>
                  <div className="text-center">
                    <button type="button" className="btn btn-secondary" onClick={() => setModal(true)}>Registrarse</button>
                    <button type="button" id="Iniciosesion" className="btn btn-primary" onClick={Login}>Iniciar sesión</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Modal isOpen={modal}>
            <div className="modal-header">
              <h5 className="modal-title fs-2" id="exampleModalLabel">Crear usuario</h5>
            </div>
            <ModalBody>
              <form id="formEditar">
                <div className="modal-body">
                  <div className="form-group">
                    <label for="Usuario" className="col-form-label">Nombre usuario: </label>
                    <input type="text" className="form-control border-dark" name="usuario" id="usuario" placeholder="Nombre usuario" onChange={(e) => { setNombreusuario(e.target.value) }} />
                  </div>
                  <div className="form-group">
                    <label for="contraseña" className="col-form-label">Contraseña: </label>
                    <input type="password" className="form-control border-dark shadow-none" name="contraseña" id="contraseña" placeholder="contrseña" onChange={(e) => { setContraseña(e.target.value) }} />
                  </div>
                  <Indicador password={contraseña} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setModal(false)}>Cancelar</button>
                  <button type="button" id="btnEditar" className={(Fuerzacontrseña.score < 3) ? "btn btn-primary disabled" : "btn btn-primary"} onClick={Registro}>Registrar</button>
                </div>
              </form>
            </ModalBody>
          </Modal>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
