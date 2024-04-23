/* eslint-disable no-unused-vars */
import { Button, Form, Spinner } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import api from "../../api/api"
import { useState } from "react";
import swal from 'sweetalert';
import terraviva from '../assets/terraviva.png'


const Login = () => {

  const [username, setUsername] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [cargando, setCargando] = useState(false)

  const navigate = useNavigate();

  const login = async (e) => {
    setCargando(true);
    e.preventDefault();
    try {
      const resp = await api.post('api/login', {
        username,
        contraseña
      });
      localStorage.setItem("id",resp.data.id);
      navigate("/admin");
    } catch (error) {
      swal(error.response.data.msg, "", "warning");
      setCargando(false);
    }
  }


  return (
    <>
      <div className="login-container" style={{backgroundColor: "#242424"}}>
        <div className="login">
          <img src={terraviva} alt="terraviva logo" style={{width: "100%"}}/>
          <Form onSubmit={login}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" required placeholder="Nombre de usuario" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" required placeholder="Contraseña" value={contraseña} onChange={e => setContraseña(e.target.value)} />
            </Form.Group>
            <div className="d-grid gap-2">
            <Button variant="primary" type="submit" className="">
              {cargando ?
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </> :
                <>
                  Login
                </>}

            </Button>
            </div>
          </Form>
        </div>
      </div>

    </>
  )
}

export default Login