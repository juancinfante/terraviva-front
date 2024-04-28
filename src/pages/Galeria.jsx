import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import '../css/galeria.css';
import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";



const Galeria = () => {

    const [albums, setAlbums] = useState([]);
    const [data, setData] = useState([]);
    const [publis, setPublis] = useState([]);

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesGaleria = publis.filter(publicidad => publicidad.colocar_en[0].galeria >= 1 && publicidad.colocar_en[0].galeria <= 8);
    // Ordenar las publicidades filtradas por su número de galeria
    publicidadesGaleria.sort((a, b) => a.colocar_en[0].galeria - b.colocar_en[0].galeria);

    const params = useParams();

    const getAlbums = async () => {
        try {
            const resp = await api.get(`api/albums/${params.limit}/${params.page}`);
            setAlbums(resp.data.albums.docs);
            setData(resp.data.albums);
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

    useEffect(() => {
        getAlbums();
        getPubli();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Galeria
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h1 className="border-section mb-4">Galerias</h1>
                        <div className="row">

                            {
                                albums.length == 0 ?
                                    <h1 className="text-center mt-5 mb-5">CARGANDO...</h1>
                                    :
                                    albums.map((element, index) => (
                                        <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
                                            <a href={`/album/${element._id}`}>
                                                <div className="album-container">
                                                    <img src={element.fotos[0]} alt="" />
                                                    <div className="info-album">
                                                        <h2>{element.nombre}</h2>
                                                        <p>{element.fecha}</p>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                            }
                        </div>
                        <div>
                            <ul className="paginationn">
                                {
                                    data.hasPrevPage ?
                                        <a href={`/albums/${params.limit}/${data.prevPage}`}>
                                            <li>
                                                «
                                            </li>
                                        </a>
                                        : <a className="disabled-pagination">
                                            <li>
                                                «
                                            </li>
                                        </a>
                                }
                                {
                                    <a className="activa">
                                        <li>
                                            {data.page}
                                        </li>
                                    </a>
                                }
                                {
                                    data.hasNextPage ?
                                        <a href={`/albums/${params.limit}/${data.nextPage}`}>
                                            <li>
                                                »
                                            </li>
                                        </a>
                                        : <a className="disabled-pagination">
                                            <li>
                                                »
                                            </li>
                                        </a>
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pt-5">
                        <div className="row gap-3 pt-5">
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
                        <h1 className="border-section mb-4">Redes</h1>
                        <a href="https://www.facebook.com/terravivafolclore" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#3b5999" }}>
                                <FontAwesomeIcon icon={faFacebook} className='redes-icon' />
                                <span>+190mil</span>
                                <span>Like</span>
                            </div>
                        </a>
                        <a href="https://twitter.com/terravivanoa" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#000" }}>
                                <FontAwesomeIcon icon={faXTwitter} className='redes-icon' />
                                <span>+1800</span>
                                <span>Seguir</span>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/user/terravivafolclore" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#cc181e" }}>
                                <FontAwesomeIcon icon={faYoutube} className='redes-icon' />
                                <span>+1000</span>
                                <span>Suscribir</span>
                            </div>
                        </a>
                        <a href="https://www.instagram.com/terravivafolclore" target='blank'>
                            <div className='redes-home ig'>
                                <FontAwesomeIcon icon={faInstagram} className='redes-icon' />
                                <span>+19mil</span>
                                <span>Seguir</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Galeria