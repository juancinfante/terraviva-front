/* eslint-disable no-unused-vars */
import { Button, Figure, Form, Spinner } from "react-bootstrap"
import { Sidebar } from "../components/Sidebar"
import { useState } from "react"
import swal from "sweetalert";
import axios from "axios";
import api from "../../api/api"

import { useNavigate } from "react-router-dom";

const NuevaPublicidad = () => {
    const [nombre_cliente, setNombreCliente] = useState("");
    const [ingreso, setIngreso] = useState("");
    const [egreso, setEgreso] = useState("");
    const [link, setLink] = useState("");
    const [foto, setFoto] = useState("");
    const [cargando, setCargando] = useState(false);
    const [colocar_en, setColocarEn] = useState([{
        inicio: 0,
        noticias: 0,
        agenda: 0,
        galeria: 0
    }]);

    const handleChangePosition = (e, section) => {
        const newArray = colocar_en.map(obj => ({
            ...obj,
            [section]: parseInt(e.target.value, 10),
          }));
          setColocarEn(newArray)
          
    };
    const [imageInput, setImageInput] = useState("");

    const instance = axios.create();
    const navigate = useNavigate();

    const setImageC = (e) => {
        setImageInput(e.target.files);
        // PREVISUALIZAR IMAGEN 
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFoto(reader.result)
        }
    }

    const uploadImage = async (file, folder) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "terraviva/banners-p"); // 💡 Carpeta dinámica
    
        const response = await api.post("/api/upload-image", formData);
    
        return response.data.url; // ✅ Accede directamente a response.data
    };

    const enviarForm = async (e) => {
        e.preventDefault();
        setCargando(true);

        // Obtenemos el archivo de imagen del input
        const files = imageInput;

        if (!files || files.length === 0) {
            swal("Elige una imagen de portada.", "", "warning");
            return;
        }

        try {

            // Subimos la imagen redimensionada a Cloudinary
            const url_image = await uploadImage(files[0]);
            setFoto(url_image);
            const foto = url_image;

            // Enviamos los datos del formulario junto con la URL de la imagen a tu API
            const resp = await api.post('api/publi', {
                nombre_cliente,
                ingreso,
                egreso,
                link,
                foto,
                colocar_en
            });
            swal("Articulo creado!", "", "success");
            setCargando(false);
            setTimeout(() => {
                navigate("/publicidad");
            }, "1500");
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Sidebar />
            <div className="contenedor" style={{ backgroundColor: "#242424" }}>
                <h1 style={{ color: "white" }}>NUEVA PUBLICIDAD</h1>
                <Form style={{ color: 'white' }} onSubmit={enviarForm}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre Cliente</Form.Label>
                        <Form.Control type="text" value={nombre_cliente} onChange={(e) => setNombreCliente(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Ingreso</Form.Label>
                        <Form.Control type="date" value={ingreso} onChange={(e) => setIngreso(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Egreso</Form.Label>
                        <Form.Control type="date" value={egreso} onChange={(e) => setEgreso(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" value={link} onChange={(e) => setLink(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="col-sm-6">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control type="file" onChange={setImageC} className="mb-4" />
                        <Figure>
                            <Figure.Image
                                width={300}
                                height={300}
                                alt="171x180"
                                src={foto == "" ? "https://th.bing.com/th/id/R.06bbe2f17591baf26eb12afcde3b7cac?rik=r17mLynETVStTw&riu=http%3a%2f%2fwww.toiletinspector.com%2fimg%2fno-image.png&ehk=dkdik0i3mZ9%2f5SivAaUG6NOMwiDKK6sCUFXoUQyNJgI%3d&risl=&pid=ImgRaw&r=0" : foto}
                            />
                        </Figure>
                    </Form.Group>
                    <p>COLOCAR EN:</p>
                    <Form.Label>Inicio</Form.Label>
                    <Form.Select aria-label="Default select example" value={colocar_en.inicio} onChange={(e) => handleChangePosition(e, 'inicio')}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </Form.Select>
                    <Form.Label>Noticias</Form.Label>
                    <Form.Select aria-label="Default select example" value={colocar_en.noticias} onChange={(e) => handleChangePosition(e, 'noticias')}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </Form.Select>
                    <Form.Label>Agenda</Form.Label>
                    <Form.Select aria-label="Default select example" value={colocar_en.agenda} onChange={(e) => handleChangePosition(e, 'agenda')}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </Form.Select>
                    <Form.Label>Galeria</Form.Label>
                    <Form.Select aria-label="Default select example" value={colocar_en.galeria} onChange={(e) => handleChangePosition(e, 'galeria')}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </Form.Select>
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
                </Form>
            </div>
        </>
    )
}

export default NuevaPublicidad