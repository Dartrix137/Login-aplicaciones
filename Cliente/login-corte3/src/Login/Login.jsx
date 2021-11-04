import React, { Fragment,useState , useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import "./Login.css";
function Login() {
    const [modal, setModal]=useState (false);
    return (
        <Fragment>
            <header>
                <nav id="titulo" className="navbar text-center d-flex justify-content-center">
                    <h1 className="d-flex justify-content-center">Login</h1>
                </nav>
            </header>
            <div className="container-fluid">
                <div className="row mt-5">
                    <div id="fondo" className="col col-lg-5 col-md-6 col-sm-12 p-5 m-auto shadow-sm rounded-lg">
                        <form>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Usuario</label>
                                <input type="email" className="form-control" placeholder="Usuario" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">Contrseña</label>
                                <input type="password" className="form-control" placeholder="Contraseña" />
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-secondary" onClick={()=>setModal(true)}>Registrarse</button>
                                <button id="Iniciosesion" type="submit" className="btn btn-primary">Iniciar sesión</button>
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
                                    <input type="text" className="form-control border-dark" name="usuario" id="usuario" placeholder="Nombre usuario" />
                                </div>
                                <div className="form-group">
                                    <label for="contraseña" className="col-form-label">Contraseña: </label>
                                    <input type="password" className="form-control border-dark" name="contraseña" id="contraseña" placeholder="contrseña" />
                                </div>
                                <div className="form-group">
                                    <label for="confircontraseña" className="col-form-label">Confirmar contraseña: </label>
                                    <input type="password" className="form-control border-dark" name="confircontraseña" id="confircontraseña" placeholder="contraseña" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setModal(false)}>Cancelar</button>
                                <button type="button" id="btnEditar" className="btn btn-primary" onClick={()=>setModal(false)}>Registrar</button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
        </Fragment>
    );
}

export default Login;