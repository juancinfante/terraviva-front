/* eslint-disable no-unused-vars */
import { Sidebar } from "../components/Sidebar"
import { Button, Form, Spinner } from "react-bootstrap"
import { useEffect, useState } from "react";
import api from "../../api/api"

import swal from "sweetalert";
import { useParams } from "react-router-dom";


const EditarUsuario = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [privilegios, setPrivilegios] = useState([]);

    const [cargando, setCargando] = useState(false);

    const params = useParams();
    const id = params.id;

    const obtenerUsuario = async () => {
        try {
            const resp = await api.get(`api/usuario/${id}`);
            setNombre(resp.data.usuario[0].nombre);
            setApellido(resp.data.usuario[0].apellido);
            setEmail(resp.data.usuario[0].email);
            setUsername(resp.data.usuario[0].username);
            setPrivilegios(resp.data.usuario[0].privilegios);

        } catch (error) {
            console.log(error);
        }
    }
    const enviarForm = async (e) => {
        e.preventDefault();

        setCargando(true);

        try {
            const resp = await api.put('api/usuario', {
                id,
                nombre,
                apellido,
                email,
                username,
                privilegios
            })
            swal(resp.data.msg, "", "success")
            setCargando(false);


        } catch (error) {
            swal(error.response.data.msg, "", "error")
            setCargando(false);

        }
    }

    // Función para manejar el cambio de estado de los checkboxes
    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        // Copia el estado actual del array
        const newArray = [...privilegios];
        // Si el checkbox está marcado y no está en el array, añádelo
        if (checked && !newArray.includes(value)) {
            newArray.push(value);
        } else {
            // Si el checkbox no está marcado, quítalo del array
            const index = newArray.indexOf(value);
            if (index > -1) {
                newArray.splice(index, 1);
            }
        }
        // Actualiza el estado del array
        setPrivilegios(newArray);
    };

    useEffect(() => {
        obtenerUsuario();
    },[])


    return (
        <>
            <Sidebar />
            <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
                <h1 style={{ color: "white" }}>Editar usuario</h1>
                <Form style={{ color: 'white' }} onSubmit={enviarForm}>
                    {/* <Form.Group controlId="formFile" className="mb-3 mt-3 d-flex justify-content-center align-items-center flex-column">
                        <Form.Label>Foto</Form.Label>
                        <img src={} alt="Foto de Perfil" style={{ width: "150px", height: "150px", objectFit: "cover" }} className="rounded-circle mb-3" />
                        <Form.Control type="file" onChange={setImageC} className="mb-4" />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control type="" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mt-3 d-flex flex-column" controlId="exampleForm.ControlInput">
                        <Form.Label>Privilegios</Form.Label>
                        <Form.Check
                            type="checkbox"
                            value="noticias"
                            label="Noticias"
                            checked={privilegios.includes("noticias") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="galeria"
                            label="Galeria"
                            checked={privilegios.includes("galeria") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="agenda"
                            label="Agenda"
                            onChange={handleCheckboxChange} 
                            checked={privilegios.includes("agenda") ? true : false}
                        />
                        <Form.Check  
                            type="checkbox"
                            value="usuarios"
                            label="Usuarios"
                            onChange={handleCheckboxChange}
                            checked={privilegios.includes("usuarios") ? true : false}
                        />
                        <Form.Check  
                            type="checkbox"
                            value="publicidad"
                            label="Publicidad"
                            onChange={handleCheckboxChange}
                            checked={privilegios.includes("publicidad") ? true : false}
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" className="mt-3 ">
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
                                    ACTUALIZAR
                                </>}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default EditarUsuario