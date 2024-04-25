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

    const enviarForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        const fotoEditor = localStorage.getItem("fotoPerfil");
        const nombreEditor = localStorage.getItem("Nombre");
        const apellidoEditor = localStorage.getItem("Apellido");
        const editor = nombreEditor + " " + apellidoEditor;

        // Obtenemos el archivo de imagen del input
        const files = imageInput;

        if (!files || files.length === 0) {
            swal("Elige una imagen de portada.", "", "warning");
            return;
        }

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
                    }, 'image/jpeg', 0.9); // Calidad de compresión, puedes ajustarla según tus necesidades
                };
                img.src = URL.createObjectURL(imageFile);
            });
        };

        try {
            // Redimensionamos la imagen antes de subirla a Cloudinary
            const resizedImage = await resizeImage(files[0]);

            // Creamos un nuevo FormData con la imagen redimensionada
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append("upload_preset", "terraviva");
            formData.append("cloud_name", "dwjhbrsmf");

            // Subimos la imagen redimensionada a Cloudinary
            const res = await instance.post("https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload", formData);
            setPortada(res.data.secure_url);
            const img_portada = res.data.secure_url;

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
            navigate("/");
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

    const compressImage = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();
            img.src = event.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Redimensionar la imagen manteniendo la proporción
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 600;
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                // Dibujar la imagen en el lienzo
                ctx.drawImage(img, 0, 0, width, height);

                // Obtener los datos de la imagen comprimida como base64
                const compressedDataUrl = canvas.toDataURL('image/jpeg', .6); // Cambia el segundo parámetro (0.5) para ajustar la calidad

                // Mostrar la imagen comprimida
                setPreviewSrc(compressedDataUrl);
            };
        };

        reader.readAsDataURL(file);
    };



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
                        <option value="Santiago del Estero">Santiago del estero</option>
                        <option value="Tucuman">Tucuman</option>
                        <option value="Salta">Salta</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="Cordoba">Cordoba</option>
                        <option value="Rosario">Rosario</option>
                        <option value="Mendoza">Mendoza</option>
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