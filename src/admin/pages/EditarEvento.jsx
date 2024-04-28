/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar"
import api from "../../api/api"

import { useParams } from "react-router-dom";
import { Button, Figure, Form, Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import axios from "axios";
import swal from "sweetalert";


const EditarEvento = () => {

    const [evento, setEvento] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [flayer2, setFlayer2] = useState('');
    const [texto, setTexto] = useState('');
    const [fecha, setFecha] = useState('');
    const [direccion, setDireccion] = useState('');
    const [horario, setHorario] = useState('');

    const [cargando, setCargando] = useState(false);
    const [imageInput, setImageInput] = useState();
    const [provincia, setProvincia] = useState('');

    const instance = axios.create();

    const params = useParams();


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
    const obtenerEvento = async () => {
        try {
            const resp = await api.get(`api/evento/${params.id}`);
            console.log(resp.data.evento)
            setEvento(resp.data.evento[0]);
            setFecha(resp.data.evento[0].fecha);
            setTitulo(resp.data.evento[0].titulo);
            setFlayer2(resp.data.evento[0].flayer);
            setTexto(resp.data.evento[0].texto);
            setProvincia(resp.data.evento[0].provincia);
            setDireccion(resp.data.evento[0].direccion);
            setHorario(resp.data.evento[0].horario);
        } catch (error) {
            console.log(error)
        }
    }

    const setImageC = (e) => {
        setImageInput(e.target.files);
        // PREVISUALIZAR IMAGEN 
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFlayer2(reader.result)
        }
    }

    const enviarForm = async (e) => {
        e.preventDefault();

        setCargando(true);

        let flayer = "";
        const id = params.id;
        // Subir Imagen
        const files = imageInput;


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


        if (files !== undefined) {

            // Redimensionamos la imagen antes de subirla a Cloudinary
            const resizedImage = await resizeImage(files[0]);

            const formData = new FormData(files[0]);
            formData.append('file', resizedImage);
            formData.append("upload_preset", "terraviva");
            formData.append("cloud_name", "dwjhbrsmf");
            const res = await instance.post("https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload", formData);
            flayer = res.data.secure_url;
        } else {
            flayer = flayer2;
        }
        try {
            const resp = await api.put('api/evento', {
                id,
                titulo,
                fecha,
                texto,
                provincia,
                flayer,
                direccion,
                horario
            })
            swal("Actualizado con exito!", "", "success")

            setCargando(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerEvento();
    }, [])
    return (
        <>
            <Sidebar />
            <div className="contenedor" style={{backgroundColor: "#242424"}}>
                <h1 style={{ color: "white" }}>EDITAR EVENTO</h1>
                <Form onSubmit={enviarForm}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Titulo</Form.Label>
                        <Form.Control type="text" required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Fecha</Form.Label>
                        <Form.Control type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Direccion</Form.Label>
                        <Form.Control type="text" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ color: 'white' }}>Horario</Form.Label>
                        <Form.Control type="time" required value={horario} onChange={(e) => setHorario(e.target.value)} />
                    </Form.Group>
                    <Form.Label style={{ color: 'white' }}>Provincia</Form.Label>
                    <Form.Select aria-label="Default select example" value={provincia}  onChange={e => setProvincia(e.target.value)} required>
                        <option value="Santiago del Estero">Santiago del estero</option>
                        <option value="Tucuman">Tucuman</option>
                        <option value="Salta">Salta</option>
                        <option value="Jujuy">Jujuy</option>
                        <option value="Catamarca">Catamarca</option>
                        <option value="Cordoba">Cordoba</option>
                        <option value="Rosario">Santa Fe</option>
                        <option value="Mendoza">Mendoza</option>
                        <option value="Cosquin">Cosquin</option>
                        <option value="La Rioja">La Rioja</option>
                        <option value="Capital Federal">Capital Federal</option>
                        <option value="Buenos Aires">Buenos Aires</option>
                    </Form.Select>
                    <Form.Group controlId="formFile" className="col-sm-6 mt-4">
                        <Form.Label style={{ color: 'white' }}>Portada</Form.Label>
                        <Form.Control type="file" onChange={setImageC} className="mb-4" />
                        <Figure>
                            <Figure.Image
                                width={300}
                                height={300}
                                alt="171x180"
                                src={flayer2}
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
                                ACTUALIZAR
                            </>}
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default EditarEvento