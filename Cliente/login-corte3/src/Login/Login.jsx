import React, { Fragment,useState , useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Indicador from '../components/Indicador'
import axios from 'axios';
import "./Login.css";
function Login() {
    const [modal, setModal]=useState (false);
    const [nombreusuario, setNombreusuario]=useState('');
    const [contraseña, setContraseña]=useState('');
    const [loginnombreusuario, setLoginnombreusuario]=useState('');
    const [logincontraseña, setLogincontraseña]=useState('');
    const [loginstatus, setLoginstatus]=useState('');
    const [estado, setEstado]=useState(false);
    axios.defaults.withCredentials=true;
    const Registro=()=>{
        axios.post('http://localhost:3001/registro-usuario', {
            nombre: nombreusuario, 
            contraseña: contraseña
        }).then((response)=>{
            setModal(false);
            console.log(response);
        });
    };

    const Login=()=>{
        axios.post('http://localhost:3001/login', {
            nombre: loginnombreusuario, 
            contraseña: logincontraseña
        }).then((response)=>{
            if(response.data.Mensaje)
            {
                setLoginstatus(response.data.Mensaje);
                setEstado(false);
            }else{
                setLoginstatus(response.data.nombre);
            }
        });
    };

    useEffect(()=>{
        axios.get('http://localhost:3001/login').then((response)=>{
            if(response.data.loggedIn== true){
                setLoginstatus(response.data.usuario[0].nombre);
                setEstado(true);
            }
        });
    },[]);

    return (
        <Fragment>
            <header>
                <nav id="titulo" className="navbar text-center d-flex justify-content-center">
                    <h1 className="d-flex justify-content-center">Login</h1>
                    <h1 className="d-flex justify-content-center">{loginstatus}</h1>
                    <indicadorpassword/>
                </nav>
            </header>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div id="fondo" className="col col-lg-5 col-md-6 col-sm-12 p-5 m-auto shadow-sm rounded-lg">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Usuario</label>
                                <input type="text" className="form-control" placeholder="Usuario" onChange={(e)=>{setLoginnombreusuario(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Contrseña</label>
                                <input type="password" className="form-control" placeholder="Contraseña" onChange={(e)=>{setLogincontraseña(e.target.value)}}/>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-secondary" onClick={()=>setModal(true)}>Registrarse</button>
                                <NavLink type="button" id="Iniciosesion" className="btn btn-primary" onClick={Login} to={estado?'/home':'/'}>Iniciar sesión</NavLink>
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
                                    <input type="text" className="form-control border-dark" name="usuario" id="usuario" placeholder="Nombre usuario" onChange={(e)=>{setNombreusuario(e.target.value)}}/>
                                </div>
                                <div className="form-group">
                                    <label for="contraseña" className="col-form-label">Contraseña: </label>
                                    <input type="password" className="form-control border-dark shadow-none" name="contraseña" id="contraseña" placeholder="contrseña" onChange={(e)=>{setContraseña(e.target.value)}}/>
                                </div>
                                <Indicador password={contraseña}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setModal(false)}>Cancelar</button>
                                <button type="button" id="btnEditar" className="btn btn-primary" onClick={Registro}>Registrar</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
        </Fragment>
    );
}

export default Login;