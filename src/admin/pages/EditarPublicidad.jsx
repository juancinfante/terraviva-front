/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Figure, Form, Spinner } from "react-bootstrap";
import api from "../../api/api"

import swal from "sweetalert";

const EditarPublicidad = () => {

    const [nombre_cliente, setNombreCliente] = useState("");
    const [ingreso, setIngreso] = useState("");
    const [egreso, setEgreso] = useState("");
    const [link, setLink] = useState("");
    const [colocar_en, setColocarEn] = useState([]);
    const [fotoo,setFotoo] = useState("");
    const [cargando, setCargando] = useState(false);

    const [imageInput, setImageInput] = useState();

    const instance = axios.create();
    const navigate = useNavigate();
    const params = useParams();
    
    const obtenerPubli = async () => {
        try {
            const resp = await api.get(`api/publi/${params.id}`);
            setNombreCliente(resp.data.publi[0].nombre_cliente);
            setColocarEn(resp.data.publi[0].colocar_en);
            setEgreso(resp.data.publi[0].egreso);
            setIngreso(resp.data.publi[0].ingreso);
            setLink(resp.data.publi[0].link);
            setFotoo(resp.data.publi[0].foto);

        } catch (error) {
            console.log(error)
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

    const setImageC = (e) => {
        setImageInput(e.target.files);
        // PREVISUALIZAR IMAGEN 
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
            setFotoo(reader.result)
        }
    }

    const enviarForm = async (e) => {
        e.preventDefault();

        setCargando(true);

        let foto = "";
        const id = params.id;
        // Subir Imagen
        const files = imageInput;

        if (files !== undefined) {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append("upload_preset", "terraviva");
            formData.append("cloud_name", "dwjhbrsmf");
            const res = await instance.post("https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload", formData);
            foto = res.data.secure_url;
        } else {
            foto = fotoo;
        }
        try {
            const resp = await api.put('api/publi', {
                id,
                nombre_cliente,
                foto,
                link,
                ingreso,
                egreso,
                colocar_en
            })
            swal("Actualizado con exito!", "", "success")

            setCargando(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerPubli();
    },[])

  return (
    <>
        <Sidebar />
        <div className="contenedor" style={{backgroundColor: "#242424"}}>
            <h1 className="text-white">EDITAR PUBLICIDAD</h1>
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
                                    src={fotoo == "" ? "https://th.bing.com/th/id/R.06bbe2f17591baf26eb12afcde3b7cac?rik=r17mLynETVStTw&riu=http%3a%2f%2fwww.toiletinspector.com%2fimg%2fno-image.png&ehk=dkdik0i3mZ9%2f5SivAaUG6NOMwiDKK6sCUFXoUQyNJgI%3d&risl=&pid=ImgRaw&r=0" : fotoo}
                                />
                            </Figure>
                        </Form.Group>
                    <Form.Group className="mt-3 d-flex flex-column" controlId="exampleForm.ControlInput">
                        <Form.Label>Colocar en</Form.Label>
                        <Form.Check
                            type="checkbox"
                            value="inicio"
                            label="Inicio"
                            checked={colocar_en.includes("inicio") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="noticias"
                            label="Noticias"
                            checked={colocar_en.includes("noticias") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="galeria"
                            label="Galeria"
                            checked={colocar_en.includes("galeria") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                        <Form.Check
                            type="checkbox"
                            value="agenda"
                            label="Agenda"
                            checked={colocar_en.includes("agenda") ? true : false}
                            onChange={handleCheckboxChange}
                        />
                    </Form.Group>
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

export default EditarPublicidad