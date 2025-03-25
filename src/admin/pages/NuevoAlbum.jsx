/* eslint-disable no-unused-vars */
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Button, Spinner } from 'react-bootstrap';
import api from "../../api/api"

import { Form, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const NuevoAlbum = () => {
    const [images, setImages] = useState([]);
    const [nombre, setNombre] = useState("");
    const [fechaA, setFechaA] = useState("");
    const [ph, setPH] = useState(localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido"));
    const [cargando, setCargando] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const userID = localStorage.getItem("id");

    const checkUser = async () => {
        if (userID !== undefined) {
            try {
                const resp = await api.get(`api/usuario/${userID}`);
                if (!resp.data.usuario[0].privilegios.includes("galeria")) {
                    navigate("/");
                }
            } catch (error) {
                navigate('/login');
                console.log(error);
            }
        }
    }

    const handleDrop = (acceptedFiles) => {
        if (images.length + acceptedFiles.length > 5) {
            swal("¡Límite alcanzado!", "No puedes subir más de 30 imágenes.", "warning");
            return;
        }

        setLoading(true);
        acceptedFiles.forEach((file) => {
            const previewUrl = URL.createObjectURL(file);
            setImages((currentImages) => [
                ...currentImages,
                { file: file, preview: previewUrl },
            ]);
        });
        setLoading(false);
    };

    const handleRemoveImage = (index) => {
        setImages((currentImages) => currentImages.filter((_, i) => i !== index));
    };

    const renderImages = () => {
        return images.map((image, index) => (
            <div key={index} className='col-4 d-flex flex-column' >
                <img src={image.preview} style={{ width: '100%', height: '150px', objectFit: "contain" }} alt="Previsualización" />
                <Button className="btn btn-danger" onClick={() => handleRemoveImage(index)}>Eliminar</Button>
            </div>
        ));
    };

    const uploadImage = async (file, folder) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder); 

        const response = await api.post("/api/upload-image", formData);
        return response.data.url;
    };

    const handleUploadAll = async () => {
        if (!nombre) return swal("Ingrese nombre del álbum!", "", "warning");
        if (!ph) return swal("Ingrese nombre del PH!", "", "warning");
        if (!fechaA) return swal("Ingrese fecha del álbum!", "", "warning");

        setCargando(true);

        try {
            const carpeta = `terraviva/albums/${nombre}`;
            const uploaders = images.map((image) => uploadImage(image.file, carpeta));
            const urls = await Promise.all(uploaders);

            subirAlbumBD(urls);
            setImages([]);
        } catch (error) {
            console.error("Error al subir imágenes:", error);
            swal("Error al subir imágenes!", "", "error");
        } finally {
            setCargando(false);
        }
    };

    const subirAlbumBD = async (fotos) => {
        const fecha = fechaA;
        try {
            const resp = await api.post('api/crearalbum', {
                nombre,
                ph,
                fecha,
                fotos,
                portada: fotos[0]
            })
            swal(resp.data.msg, "", "success");
            setTimeout(() => {
                location.href = "/nuevoalbum";
            }, "1500");

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        checkUser();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
                <h1 style={{ color: "white" }}>Nuevo Álbum</h1>
                <div className="mb-3">
                    <label className="form-label mt-4" style={{ color: "white" }}>Nombre</label>
                    <input type="text" className="form-control" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <label className="form-label mt-4" style={{ color: "white" }} required>Fecha</label>
                    <input type="date" className="form-control mb-4" value={fechaA} onChange={(e) => setFechaA(e.target.value)} />
                </div>
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>Arrastra las imágenes aquí, o haz clic para seleccionarlas</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {loading ? (
                    <>
                        <h1 style={{ color: "white" }}>Cargando imágenes...</h1>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </>
                ) : (
                    <>
                        {images.length > 0 && (
                            <div>
                                <h2 style={{ color: "white" }}>Imágenes listas para subir ({images.length}/30)</h2>
                                <div className="row">
                                    {renderImages()}
                                </div>
                                <button className='btn btn-primary mt-4' onClick={handleUploadAll}>
                                    {cargando ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <>SUBIR</>
                                    )}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default NuevoAlbum;
