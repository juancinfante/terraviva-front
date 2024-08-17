// /* eslint-disable no-unused-vars */
// import Dropzone from 'react-dropzone';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { Sidebar } from '../components/Sidebar';
// import { Button, Spinner } from 'react-bootstrap';
// import api from "../../api/api"

// import { Form, useNavigate } from 'react-router-dom';
// import swal from 'sweetalert';

// const NuevoAlbum = () => {
//     const [images, setImages] = useState([]);
//     const [imagesUploaded, setIamgesUploaded] = useState([]);

//     const [nombre, setNombre] = useState("");
//     const [fechaA, setFechaA] = useState("");
//     const [ph, setPH] = useState(localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido"));
//     // const [fotos, setFotos] = useState([]);
//     const [cargando, setCargando] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();
//     const userID = localStorage.getItem("id");

//     const checkUser = async () => {
//         if (userID !== undefined) {
//             try {
//                 const resp = await api.get(`api/usuario/${userID}`);
//                 if (!resp.data.usuario[0].privilegios.includes("galeria")) {
//                     navigate("/");
//                 }
//             } catch (error) {
//                 navigate('/login');
//                 console.log(error);
//             }
//         }
//     }

//     // Suponiendo que aquí va el código de processImage y handleDrop 
//     const processImage = (file, callback) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//             const img = new Image();
//             img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const ctx = canvas.getContext('2d');
//                 canvas.width = img.width;
//                 canvas.height = img.height;
//                 ctx.drawImage(img, 0, 0, img.width, img.height);
//                 let quality = 0.92; // Comienza con alta calidad
//                 const reduceQuality = () => {
//                     canvas.toBlob((blob) => {
//                         if (blob.size > 600 * 1024 && quality > 0.1) { // Mientras sea mayor a 200KB y calidad no sea demasiado baja
//                             quality -= 0.05; // Reduce la calidad gradualmente
//                             ctx.drawImage(img, 0, 0, img.width, img.height);
//                             canvas.toBlob(reduceQuality, 'image/jpeg', quality);
//                         } else {
//                             callback(blob); // Invoca el callback con el blob ajustado
//                         }
//                     }, 'image/jpeg', quality);
//                 };
//                 reduceQuality();
//             };
//             img.src = event.target.result;
//         };
//         reader.readAsDataURL(file);
//     };

//     const handleDrop = (acceptedFiles) => {
//         setLoading(true);
//         acceptedFiles.forEach((file) => {
//             processImage(file, (processedBlob) => {
//                 const previewUrl = URL.createObjectURL(processedBlob);
//                 setImages((currentImages) => [
//                     ...currentImages,
//                     { file: processedBlob, preview: previewUrl },
//                 ]);
//             });
//         });
//         setLoading(false);
//     };

//     const handleRemoveImage = (index) => {
//         // Remueve la imagen seleccionada basada en su índice
//         setImages((currentImages) => currentImages.filter((_, i) => i !== index));
//     };

//     function formatDate(fecha) {
//         const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
//         const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

//         // Crear un objeto de fecha a partir de la entrada
//         const date = new Date(fecha);

//         // Obtener el día de la semana, día del mes y mes de la fecha
//         const dayOfWeek = days[date.getDay()];
//         const dayOfMonth = date.getDate();
//         const month = months[date.getMonth()];
//         const year = date.getFullYear();

//         // Devolver la fecha formateada
//         return `${dayOfWeek} ${dayOfMonth} de ${month} del ${year}`;
//     }

//     const renderImages = () => {
//         return images.map((image, index) => (
//             <div key={index} className='col-4 d-flex flex-column' >
//                 <img src={image.preview} style={{ width: '100%', height: '150px', objectFit: "contain" }} alt="Previsualización" />
//                 <Button className="btn btn-danger" onClick={() => handleRemoveImage(index)}>Eliminar</Button>
//             </div>
//         ));
//     };

//     // Suponiendo que aquí va el código de uploadImageToCloudinary y handleUploadAll que ya te proporcioné...
//     const uploadImageToCloudinary = (file) => {
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('upload_preset', 'albums');
//         formData.append('cloud_name', 'dwjhbrsmf');

//         return axios.post('https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload', formData, {
//             headers: { 'X-Requested-With': 'XMLHttpRequest' },
//         });
//     };

//     const handleUploadAll = async () => {
//         if (nombre !== "") {
//             if (ph !== "") {
//                 if (fechaA !== "") {
//                     setCargando(true);
//                     const uploaders = images.map((image) => uploadImageToCloudinary(image.file));
//                     axios.all(uploaders).then(axios.spread((...allImageData) => {
//                         // console.log(allImageData.map((data) => data.data.secure_url));
//                         // setFotos(allImageData.map((data) => data.data.secure_url));
//                         subirAlbumBD(allImageData.map((data) => data.data.secure_url));
//                         setImages([]); // Opcional: Limpiar las imágenes después de la carga
//                         setCargando(false);
//                     }));
//                 } else {
//                     swal("Ingrese fecha del Album!", "", "warning");
//                 }
//             } else {
//                 swal("Ingrese nombre del PH!", "", "warning");
//             }
//         } else {
//             swal("Ingrese nombre del album!", "", "warning");
//         }
//     };

//     const subirAlbumBD = async (fotos) => {
//         const fecha = formatDate(fechaA);
//         try {
//             const resp = await api.post('api/crearalbum', {
//                 nombre,
//                 ph,
//                 fecha,
//                 fotos
//             })
//             swal(resp.data.msg, "", "success");
//             setTimeout(() => {
//                 location.href = "/nuevoalbum";
//             }, "1500");

//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=> {
//         checkUser();
//     })

//     return (
//         <>
//             <Sidebar />
//             <div className="contenedor"  style={{backgroundColor: "#242424" , height: "100vh"}}>
//                 <h1 style={{ color: "white" }}>Nuevo Álbum</h1>
//                 <div className="mb-3">
//                     <label className="form-label mt-4" style={{ color: "white" }}>Nombre</label>
//                     <input type="text" className="form-control" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
//                     <label className="form-label mt-4" style={{ color: "white" }} required>Fecha</label>
//                     <input type="date" className="form-control mb-4" value={fechaA} onChange={(e) => setFechaA(e.target.value)} />
//                 </div>
//                 <Dropzone onDrop={handleDrop}>
//                     {({ getRootProps, getInputProps }) => (
//                         <section>
//                             <div {...getRootProps({ className: "dropzone" })}>
//                                 <input {...getInputProps()} />
//                                 <p>Arrastra las imágenes aquí, o haz clic para seleccionarlas</p>
//                             </div>
//                         </section>
//                     )}
//                 </Dropzone>
//                 {loading ?
//                     (
//                         <>
//                             <h1 style={{ color: "white" }}>
//                                 Cargando imagenes...
//                             </h1>
//                             <Spinner
//                                 as="span"
//                                 animation="border"
//                                 size="sm"
//                                 role="status"
//                                 aria-hidden="true"
//                             />
//                         </>
//                     ) :
//                     <>
//                         {images.length > 0 && (
//                             <div>
//                                 <h2 style={{ color: "white" }}>Imágenes listas para subir</h2>
//                                 <div className="row">
//                                     {renderImages()}
//                                 </div>
//                                 <button className='btn btn-primary mt-4' onClick={handleUploadAll}>
//                                     {cargando ?
//                                         <>
//                                             <Spinner
//                                                 as="span"
//                                                 animation="border"
//                                                 size="sm"
//                                                 role="status"
//                                                 aria-hidden="true"
//                                             />
//                                         </> :
//                                         <>
//                                             SUBIR
//                                         </>}
//                                 </button>
//                             </div>
//                         )}
//                     </>}
//             </div>
//         </>
//     );
// };

// export default NuevoAlbum;

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
    const [imagesUploaded, setIamgesUploaded] = useState([]);

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

    function formatDate(fecha) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const date = new Date(fecha);

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfWeek} ${dayOfMonth} de ${month} del ${year}`;
    }

    const renderImages = () => {
        return images.map((image, index) => (
            <div key={index} className='col-4 d-flex flex-column' >
                <img src={image.preview} style={{ width: '100%', height: '150px', objectFit: "contain" }} alt="Previsualización" />
                <Button className="btn btn-danger" onClick={() => handleRemoveImage(index)}>Eliminar</Button>
            </div>
        ));
    };

    const uploadImageToCloudinary = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'albums');
        formData.append('cloud_name', 'dwjhbrsmf');

        return axios.post('https://api.cloudinary.com/v1_1/dwjhbrsmf/image/upload', formData, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        });
    };

    const handleUploadAll = async () => {
        if (nombre !== "") {
            if (ph !== "") {
                if (fechaA !== "") {
                    setCargando(true);
                    const uploaders = images.map((image) => uploadImageToCloudinary(image.file));
                    axios.all(uploaders).then(axios.spread((...allImageData) => {
                        subirAlbumBD(allImageData.map((data) => data.data.secure_url));
                        setImages([]);
                        setCargando(false);
                    }));
                } else {
                    swal("Ingrese fecha del Album!", "", "warning");
                }
            } else {
                swal("Ingrese nombre del PH!", "", "warning");
            }
        } else {
            swal("Ingrese nombre del album!", "", "warning");
        }
    };

    const subirAlbumBD = async (fotos) => {
        const fecha = formatDate(fechaA);
        try {
            const resp = await api.post('api/crearalbum', {
                nombre,
                ph,
                fecha,
                fotos
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
    })

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
                {loading ?
                    (
                        <>
                            <h1 style={{ color: "white" }}>
                                Cargando imágenes...
                            </h1>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </>
                    ) :
                    <>
                        {images.length > 0 && (
                            <div>
                                <h2 style={{ color: "white" }}>Imágenes listas para subir</h2>
                                <div className="row">
                                    {renderImages()}
                                </div>
                                <button className='btn btn-primary mt-4' onClick={handleUploadAll}>
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
                                </button>
                            </div>
                        )}
                    </>}
            </div>
        </>
    );
};

export default NuevoAlbum;
