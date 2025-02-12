/* eslint-disable no-unused-vars */
import { Button, Figure, Form, Spinner } from "react-bootstrap"
import { Sidebar } from "../components/Sidebar"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import axios from "axios";
import api from "../../api/api"

import swal from 'sweetalert';
import { useNavigate } from "react-router-dom";



const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'orderer' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
    ],
}


const NuevaNoticia = () => {

    const [texto, setTexto] = useState('');
    const [provincia, setProvincia] = useState('Santiago del Estero');
    const [portada, setPortada] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [previewSrc, setPreviewSrc] = useState('');

    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const instance = axios.create();

    const [imageInput, setImageInput] = useState();

    // Función para subir la imagen a Cloudinary
    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "terraviva/noticias/");

        const response = await api.post("/api/upload-image", formData);

        return response.data.url; // ✅ Accede directamente a response.data
    };

    const enviarForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        const fotoEditor = localStorage.getItem("fotoPerfil");
        const nombreEditor = localStorage.getItem("Nombre");
        const apellidoEditor = localStorage.getItem("Apellido");
        const editor = localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido");

        // Obtenemos el archivo de imagen del input
        const files = imageInput;

        if (!files || files.length === 0) {
            swal("Elige una imagen de portada.", "", "warning");
            return;
        }

        try {

            // Subimos la imagen redimensionada a Cloudinary
            const url_image = await uploadImage(files[0]);
            setPortada(url_image);
            const img_portada = url_image;

            // Enviamos los datos del formulario junto con la URL de la imagen a tu API
            const resp = await api.post('api/crearnoticia', {
                provincia,
                img_portada,
                titulo,
                descripcion,
                texto,
                editor,
                fotoEditor
            });
            swal("Articulo creado!", "", "success");
            setCargando(false);
            navigate("/admin");
        } catch (error) {
            console.error(error);
        }
    };


    const setImageC = (e) => {
        setImageInput(e.target.files);
        // PREVISUALIZAR IMAGEN 
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setPortada(reader.result)
        }
    }

    return (
        <>
            <Sidebar />
            <div className="contenedor" style={{ backgroundColor: "#242424" }}>
                <h1 style={{ color: "white" }}>NUEVA NOTICIA</h1>
                <Form style={{ color: 'white' }} onSubmit={enviarForm}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control type="text-area" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control type="text" required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </Form.Group>
                    <Form.Label>Provincia</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={e => setProvincia(e.target.value)} required>
                        <option value="Buenos Aires">Buenos Aires</option>
                        <option value="Capital Federal">Capital Federal</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="Cordoba">Cordoba</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Salta">Salta</option>
                        <option value="Santa Fe">Santa Fe</option>
                        <option value="Santiago del Estero">Santiago del Estero</option>
                        <option value="Tucuman">Tucuman</option>
                        <option value="Chaco">Chaco</option>
                        <option value="Chubut">Chubut</option>
                        <option value="Corrientes">Corrientes</option>
                        <option value="Entre Rios">Entre Rios</option>
                        <option value="Formosa">Formosa</option>
                        <option value="La Pampa">La Pampa</option>
                        <option value="Mendoza">Mendoza</option>
                        <option value="Misiones">Misiones</option>
                        <option value="Neuquen">Neuquen</option>
                        <option value="Rio Negro">Rio Negro</option>
                        <option value="San Juan">San Juan</option>
                        <option value="San Luis">San Luis</option>
                        <option value="Santa Cruz">Santa Cruz</option>
                        <option value="Tierra Del Fuego">Tierra Del Fuego</option>
                    </Form.Select>
                    <div className="row mt-4">
                        <Form.Group controlId="formFile" className="col-sm-6">
                            <Form.Label>Portada</Form.Label>
                            <Form.Control type="file" onChange={setImageC} className="mb-4" />
                            <Figure>
                                <Figure.Image
                                    width={300}
                                    height={300}
                                    alt="171x180"
                                    src={portada == "" ? "https://th.bing.com/th/id/R.06bbe2f17591baf26eb12afcde3b7cac?rik=r17mLynETVStTw&riu=http%3a%2f%2fwww.toiletinspector.com%2fimg%2fno-image.png&ehk=dkdik0i3mZ9%2f5SivAaUG6NOMwiDKK6sCUFXoUQyNJgI%3d&risl=&pid=ImgRaw&r=0" : portada}
                                />
                            </Figure>
                        </Form.Group>
                        {/* <div className="col-sm-6 mt-3">
                            <h2 style={{ color: "white" }}>Selecciona una imagen para comprimir</h2>
                            <input type="file" accept="image/*" onChange={compressImage} />
                            <br />
                            <h2>Previsualización de la imagen comprimida</h2>
                            {previewSrc && <img src={previewSrc} style={{ maxWidth: '100%', maxHeight: '200px' }} alt="Preview" />}
                        </div> */}
                    </div>
                    <Form.Label>Cuerpo</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={texto}
                        onChange={setTexto}
                        modules={modules} />
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
                                SUBIR
                            </>}
                    </Button>
                </Form>

            </div>
        </>
    )
}

export default NuevaNoticia