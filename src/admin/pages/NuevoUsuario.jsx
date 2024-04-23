/* eslint-disable no-unused-vars */
import { Sidebar } from "../components/Sidebar"
import { Button, Form, Spinner } from "react-bootstrap"
import { useEffect, useState } from "react";
import api from "../../api/api"

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";


const NuevoUsuario = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [contraseña, setContraseña] = useState("");

    const [cargando, setCargando] = useState(false);

    const [privilegios, setPrivilegios] = useState([]);


    const navigate = useNavigate();
    const userID = localStorage.getItem("id");

    const checkUser = async () => {
        if (userID !== undefined) {
            try {
                const resp = await api.get(`api/usuario/${userID}`);
                if (!resp.data.usuario[0].privilegios.includes("usuarios")) {
                    navigate("/");
                }
            } catch (error) {
                navigate('/login');
                console.log(error);
            }
        }
    }

    const enviarForm = async (e) => {
        e.preventDefault();

        setCargando(true);

        const foto = "https://th.bing.com/th/id/R.12db983de9b7fd1e449550a7a1ee02bd?rik=NOlOTbVOtKJF7g&riu=http%3a%2f%2fdemo.webslesson.info%2fdemo-crop-image-before-upload-using-cropperjs-with-php%2fuser.png&ehk=exkJZM5dDbtKVfduHydLgQLz%2b1pDkdMQCoXu5NBcfWs%3d&risl=&pid=ImgRaw&r=0";

        try {
            const resp = await api.post('api/createuser', {
                nombre,
                apellido,
                email,
                username,
                foto,
                contraseña,
                privilegios
            })
            console.log(resp)
            swal(resp.data.msg, "", "success")
            setCargando(false);
            setNombre("");
            setApellido("");
            setEmail("");
            setContraseña("");
            setUsername("");
            setPrivilegios([]);
        } catch (error) {
            console.log(error)
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

    useEffect(() =>{
        checkUser();
    }, [])


    return (
        <>
            <Sidebar />
            <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
                <h1 style={{ color: "white" }}>Agregar usuario</h1>
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
                    <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
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
                                    AGREGAR
                                </>}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default NuevoUsuario