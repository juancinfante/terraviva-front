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
    // const [colocar_en, setColocarEn] = useState([]);
    const [foto,setFoto] = useState("");
    const [cargando, setCargando] = useState(false);
    const [colocar_en, setColocarEn] = useState({
        inicio: 1,
        noticias: 1,
        agenda: 1,
        galeria: 1
      });

    const handleChangePosition = (e, section) => {
        const newPosition = parseInt(e.target.value);
        setColocarEn(prevState => ({
          ...prevState,
          [section]: newPosition
        }));
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


    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        // Copia el estado actual del array
        const newArray = [...colocar_en];
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
        setColocarEn(newArray);
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
            // Creamos un nuevo FormData con la imagen 
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append("upload_preset", "terraviva");
            formData.append("cloud_name", "dwjhbrsmf");

            // Subimos la imagen redimensionada a Cloudinary
            const res = await instance.post("https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload", formData);
            setFoto(res.data.secure_url);
            const foto = res.data.secure_url;

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
        <Sidebar/>
        <div className="contenedor" style={{backgroundColor: "#242424"}}>
            <h1 style={{color: "white"}}>NUEVA PUBLICIDAD</h1>
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
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </Form.Select>
                    {/* <Form.Group className="mt-3 d-flex flex-column" controlId="exampleForm.ControlInput">
                        <Form.Label>Colocar en</Form.Label>
                        <Form.Check
                            type="checkbox"
                            value="inicio"
                            label="Inicio"
                            // checked={privilegios.includes("noticias") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="noticias"
                            label="Noticias"
                            // checked={privilegios.includes("noticias") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="galeria"
                            label="Galeria"
                            // checked={privilegios.includes("galeria") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="agenda"
                            label="Agenda"
                            onChange={handleCheckboxChange}
                            // checked={privilegios.includes("agenda") ? true : false}
                        />
                    </Form.Group> */}
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