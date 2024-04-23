/* eslint-disable no-unused-vars */
import { Button, Form, Spinner } from "react-bootstrap"
import { Sidebar } from "../components/Sidebar"
import { useEffect, useState } from "react"
import api from "../../api/api"

import { useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";



const Cuenta = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [fotoPerfil, setFoto] = useState('');
    const [username, setUsername] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState("");
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [nuevaContraseña2, setNuevaContraseña2] = useState("");

    const [imageInput, setImageInput] = useState();
    const [usuario, setUsuario] = useState([]);

    const [cargando, setCargando] = useState(false);


    const params = useParams();
    const instance = axios.create();


    const enviarForm = async (e) => {
        setCargando(true);
        e.preventDefault();
        let foto = "";
        const id = params.id;
        // Subir Imagen
        const files = imageInput;
        if (files !== undefined) {

            // Función para reducir el tamaño de la imagen
        const resizeImage = async (imageFile) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Calculamos las dimensiones proporcionales para ajustar la imagen a 50 KB
                    const MAX_SIZE = 200000; // 50 KB en bytes
                    let scaleFactor = 1;
                    if (imageFile.size > MAX_SIZE) {
                        scaleFactor = Math.sqrt(MAX_SIZE / imageFile.size);
                    }

                    // Redimensionamos la imagen en el canvas
                    canvas.width = img.width * scaleFactor;
                    canvas.height = img.height * scaleFactor;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    // Convertimos el canvas a un archivo Blob
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, 'image/jpeg', 0.5); // Calidad de compresión, puedes ajustarla según tus necesidades
                };
                img.src = URL.createObjectURL(imageFile);
            });
        };

            const resizedImage = await resizeImage(files[0]);

            const formData = new FormData();
            formData.append('file', resizedImage);
            formData.append("upload_preset", "terraviva");
            formData.append("cloud_name", "dwjhbrsmf");
            const res = await instance.post("https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload", formData);
            foto = res.data.secure_url;
        } else {
            foto = fotoPerfil;
        }
        if(nuevaContraseña == ""){
            try {
                const resp = await api.put('api/usuario', {
                    id,
                    nombre,
                    apellido,
                    username,
                    email,
                    foto
                })
                swal("Cuenta actualizada", "", "success")
                setTimeout(() => {
                    location.href = `/cuenta/${params.id}`;
                }, "1500");
                setCargando(false);
    
            } catch (error) {
                console.log(error);
            }
        }else if(nuevaContraseña == nuevaContraseña2){
            let contraseña = nuevaContraseña;
            try {
                const resp = await api.put('api/usuario', {
                    id,
                    nombre,
                    apellido,
                    username,
                    email,
                    foto,
                    contraseña
                })
                swal("Cuenta actualizada", "", "success")
                setCargando(false);
    
            } catch (error) {
                console.log(error);
            }
        }else{
            swal("Las contraseñas no coinciden.", "", "warning")
            setCargando(false);

        }
        
    }
    const setImageC = (e) => {
        setImageInput(e.target.files)
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFoto(reader.result);
        }
    }
    const obtenerUsuario = async () => {
        try {
            const resp = await api.get(`api/usuario/${params.id}`);
            setNombre(resp.data.usuario[0].nombre);
            setApellido(resp.data.usuario[0].apellido);
            setUsername(resp.data.usuario[0].username);
            setEmail(resp.data.usuario[0].email);
            setFoto(resp.data.usuario[0].foto);
            setContraseñaActual(resp.data.usuario[0].contraseña);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        obtenerUsuario();
    }, [])

    return (
        <>
            <Sidebar />
            <div className="contenedor" style={{backgroundColor: "#242424"}}>
                <h1 style={{ color: "white" }}>CUENTA</h1>
                <Form style={{ color: 'white' }} onSubmit={enviarForm}>
                    <Form.Group controlId="formFile" className="mb-3 mt-3 d-flex justify-content-center align-items-center flex-column">
                        <Form.Label>Foto</Form.Label>
                        <img src={fotoPerfil} alt="Foto de Perfil" style={{ width: "150px", height: "150px", objectFit: "cover" }} className="rounded-circle mb-3" />
                        <Form.Control type="file" onChange={setImageC} className="mb-4" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control type="" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control type="password" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Repita nueva contraseña</Form.Label>
                        <Form.Control type="password" value={nuevaContraseña2} onChange={(e) => setNuevaContraseña2(e.target.value)} />
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

export default Cuenta