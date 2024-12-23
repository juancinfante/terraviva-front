import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import api from "../api/api";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "../components/Footer";
import Redes from "../components/Redes";

const Album = () => {

    const [fotos, setFotos] = useState([]);
    const [album, setAlbum] = useState([]);
    const [publis, setPublis] = useState([]);

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesGaleria = publis.filter(publicidad => publicidad.colocar_en[0].galeria >= 1 && publicidad.colocar_en[0].galeria <= 8);
    // Ordenar las publicidades filtradas por su número de galeria
    publicidadesGaleria.sort((a, b) => a.colocar_en[0].galeria - b.colocar_en[0].galeria);

    const params = useParams();

    const getAlbum = async () => {
        try {
            const resp = await api.get(`api/album/${params.id}`);
            setFotos(resp.data.album[0].fotos);
            setAlbum(resp.data.album[0]);
        } catch (error) {
            console.log(error)
        }
    }
    const getPubli = async () => {
        try {
            const resp = await api.get('api/publis');
            setPublis(resp.data.publis)
        } catch (error) {
            console.log(error)
        }
    }

    function fechaPasada(fecha) {
        // Convertir la fecha pasada como string a un objeto Date
        const partesFecha = fecha.split('-');
        const fechaComparar = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]); // Formato: Año, Mes (0-11), Día

        // Obtener la fecha actual
        const hoy = new Date();

        // Comparar las fechas
        if (fechaComparar > hoy) {
            return true; // La fecha ya pasó
        } else {
            return false; // La fecha aún no ha pasado
        }
    }

    const generarArregloConFotos = (urls) => {
        const images = [];
        urls.forEach(url => {
            const imagen = {
                original: url,
                thumbnail: url
            };
            images.push(imagen);
        });
        return images;
    }
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

    useEffect(() => {
        getAlbum();
        getPubli();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Álbum
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border-section mb-4">Álbum</h1>
                <div className="d-flex flex-column mb-4">
                    <h1>{album.nombre}</h1>
                    <p>{formatDate(album.fecha)}</p>
                    <p>PH: {album.ph}</p>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-9" style={{ marginBottom: "200px" }}>
                        <ReactImageGallery items={generarArregloConFotos(fotos)} />
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="row gap-3">
                            {
                                publicidadesGaleria.map((element, index) => (
                                    fechaPasada(element.egreso) && (
                                        <div className="col-12" key={index}>
                                            <a href={element.link} target='blank'>
                                                <img src={element.foto} alt="" style={{ width: "100%", objectFit: "cover" }} />
                                            </a>
                                        </div>)
                                ))
                            }
                        </div>
                        <Redes />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Album