/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar"
import { Form, Button } from "react-bootstrap";
import api from "../../api/api"

import { useParams } from "react-router-dom";
import swal from "sweetalert";

const EditarAlbum = () => {

    const params = useParams();

    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [ph, setPH] = useState("");
    const [fotos, setFotos] = useState([]);

    const obtenerAlbum = async () => {
        try {
            const resp = await api.get(`api/album/${params.id}`);
            console.log(resp.data.album[0])
            setNombre(resp.data.album[0].nombre);
            setFecha(convertirFecha(resp.data.album[0].fecha));
            setPH(resp.data.album[0].ph);
            setFotos(resp.data.album[0].fotos);
        } catch (error) {
            console.log(error)
        }
    }

    const enviarForm = async (e) => {
        e.preventDefault();
        const id = params.id;
        try {
            const resp = await api.put('api/album',{
                id,
                nombre,
                ph,
                fecha,
                fotos
            })
            swal(resp.data.msg, "", "success");
            setTimeout(() => {
                location.href = "/galeria";
            }, "1500");

        } catch (error) {
            console.log(error)
        }
    }
    function convertirFecha(fechaStr) {
        // Objeto para mapear los nombres de los meses a números
        const meses = {
            "Enero": "01",
            "Febrero": "02",
            "Marzo": "03",
            "Abril": "04",
            "Mayo": "05",
            "Junio": "06",
            "Julio": "07",
            "Agosto": "08",
            "Septiembre": "09",
            "Octubre": "10",
            "Noviembre": "11",
            "Diciembre": "12"
        };

        // Dividimos la cadena de texto en partes
        // Por ejemplo, "Miercoles 3 de Marzo del 2024" se convierte en un array donde
        // cada palabra o número es un elemento del array
        const partes = fechaStr.split(' ');

        // Obtenemos el día, el mes (convertido a número) y el año
        const dia = partes[1].padStart(2, '0'); // Aseguramos que el día tenga dos dígitos
        const mes = meses[partes[3]]; // Convertimos el nombre del mes a número
        const ano = partes[5]; // Obtenemos el año

        // Reconstruimos la fecha en el formato dd/mm/aaaa
        return `${ano}-${mes}-${dia}`;
    }

    const eliminarFoto = (indice) => {
        setFotos(fotos.filter((_, i) => i !== indice));
    }
    

    useEffect(() => {
        obtenerAlbum();
    }, [])

    return (
        <>
            <Sidebar />
            <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
                <h1 style={{ color: "white" }}>Editar Album</h1>
                <Form style={{ color: 'white' }} onSubmit={enviarForm}>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>PH</Form.Label>
                        <Form.Control type="" required value={ph} onChange={(e) => setPH(e.target.value)} />
                    </Form.Group>
                    <div className="galeria d-flex row">
                        {fotos.map((foto, indice) => (
                            <div key={indice} className="foto d-flex flex-column col-3">
                                <img src={foto} className="mb-3" alt="Imagen" style={{ width: '100%', height: '150px', objectFit:"contain"}} />
                                <button type="button" className="btn btn-danger mb-3" onClick={() => eliminarFoto(indice)}>Eliminar</button>
                            </div>
                        ))}
                    </div>
                     <button type="submit" className="btn btn-primary">ACTUALIZAR</button>
                </Form>
            </div>
        </>
    )
}

export default EditarAlbum