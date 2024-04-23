/* eslint-disable no-unused-vars */
import { Button, Figure, Form, Spinner } from "react-bootstrap"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react"
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import swal from "sweetalert";
import api from "../../api/api"

import { useNavigate } from "react-router-dom";


const NuevoEvento = () => {

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
    const [provincia, setProvincia] = useState('Santiago del Estero');


    const [titulo, setTitulo] = useState("");
    const [flayer, setFlayer] = useState("");
    const [texto, setTexto] = useState("");
    const [fecha, setFecha] = useState("");

    const [imageInput, setImageInput] = useState("")
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();
    const instance = axios.create();

    const setImageC = (e) => {
        setImageInput(e.target.files);
        // PREVISUALIZAR IMAGEN 
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFlayer(reader.result)
        }
    }

    const enviarForm = async (e) => {
        setCargando(true);
        e.preventDefault();
        // setCargando(true);

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
                    }, 'image/jpeg', 0.5); // Calidad de compresión, puedes ajustarla según tus necesidades
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
            console.log(res)

            const flayer = res.data.secure_url;
            // Enviamos los datos del formulario junto con la URL de la imagen a tu API
            const resp = await api.post('api/evento', {
                titulo,
                flayer,
                texto,
                provincia,
                fecha,
            });
            setFecha("");
            setFlayer("");
            setTexto("");
            setTitulo("");
            swal("Articulo creado!", "", "success");
            setCargando(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
                <h1 style={{ color: "white" }}>Nuevo Evento</h1>
                <Form onSubmit={enviarForm}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Titulo</Form.Label>
                        <Form.Control type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Fecha</Form.Label>
                        <Form.Control type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </Form.Group>
                    <Form.Label style={{ color: 'white' }}>Provincia</Form.Label>
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
                    <Form.Group controlId="formFile" className="col-sm-6">
                            <Form.Label>Portada</Form.Label>
                            <Form.Control type="file" onChange={setImageC} className="mb-4" />
                            <Figure>
                                <Figure.Image
                                    width={300}
                                    height={300}
                                    alt="171x180"
                                    src={flayer == "" ? "https://th.bing.com/th/id/R.06bbe2f17591baf26eb12afcde3b7cac?rik=r17mLynETVStTw&riu=http%3a%2f%2fwww.toiletinspector.com%2fimg%2fno-image.png&ehk=dkdik0i3mZ9%2f5SivAaUG6NOMwiDKK6sCUFXoUQyNJgI%3d&risl=&pid=ImgRaw&r=0" : flayer}
                                />
                                <Figure.Caption>
                                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                                </Figure.Caption>
                            </Figure>
                        </Form.Group>
                        <ReactQuill style={{ color: 'white' }}
                        theme="snow"
                        value={texto}
                        onChange={setTexto}
                        modules={modules} />
                        <Button type="submit" className="btn btn-primary mt-3">
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

export default NuevoEvento