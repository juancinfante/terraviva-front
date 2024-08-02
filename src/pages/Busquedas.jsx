/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar"
import { Breadcrumb } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Busquedas = () => {

    const params = useParams();

    const [busquedas, setBusquedas] = useState([]);
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    const [publis, setPublis] = useState([]);

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesNoticias = publis.filter(publicidad => publicidad.colocar_en[0].noticias >= 1 && publicidad.colocar_en[0].noticias <= 8);
    // Ordenar las publicidades filtradas por su número de inicio
    publicidadesNoticias.sort((a, b) => a.colocar_en[0].noticias - b.colocar_en[0].noticias);
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
    const getBusquedas = async () => {
        try {
            const resp = await api.get(`/api/noticia/b/${params.busq}/${params.limit}/${params.page}`);
            setBusquedas(resp.data.noticia.docs)
            setData(resp.data.noticia)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBusquedas();
        getPubli();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/noticias/10/1">
                        Noticias
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column gap-3 mas-noticias">
                            <h1 className="border-section mb-4">Resultados de: {params.busq} </h1>
                            {
                                busquedas.length == 0 ? 
                                <div className="d-flex justify-content-center">
                                    <h1>NO HAY RESULTADOS</h1> 
                                </div>  
                                : 
                                
                                busquedas.map((element, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <Link to={`/noticia/${element._id}`}>
                                                <img src={element.img_portada} alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                            </Link>
                                        </div>
                                        <div className="col-12 col-sm-6 col-lg-8">
                                            {/* <div className="category-post">{element.provincia} </div> */}
                                            <Link to={`/noticia/${element._id}`}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    {/* <p style={{fontSize: "14px", color: "black"}} className="mt-2 mb-2">{convertirFecha(element.created_at)}</p> */}
                                                    <h5 className="fs-4 mt-2">{element.titulo}</h5>
                                                    <p className="elipsis">{element.descripcion}</p>
                                                    {/* <p>Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.</p> */}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                ))
                            
                                
                            }
                            
                            <ul className="paginationn">

                                {
                                    params.busq == undefined ? (data.hasPrevPage ?
                                        <a href={`/noticias/${params.limit}/${parseInt(params.page) - 1}`}>
                                            <li>
                                                «
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                «
                                            </li>
                                        </a>) :
                                        data.hasPrevPage ?
                                            <a href={`/noticias/b/${params.busq}/${params.limit}/${parseInt(params.page) - 1}`}>
                                                <li>
                                                    «
                                                </li>
                                            </a> :
                                            <a className="disabled-pagination">
                                                <li>
                                                    «
                                                </li>
                                            </a>
                                }
                                <a className="activa">
                                    <li>
                                        {data.page}
                                    </li>
                                </a>
                                {
                                    params.busq == undefined ? (data.hasNextPage ?
                                        <a href={`/noticias/${params.limit}/${parseInt(params.page) + 1}`}>
                                            <li>
                                                »
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                »
                                            </li>
                                        </a>) :
                                        data.hasNextPage ?
                                            <a href={`/noticias/b/${params.busq}/${params.limit}/${parseInt(params.page) + 1}`}>
                                                <li>
                                                    »
                                                </li>
                                            </a> :
                                            <a className="disabled-pagination">
                                                <li>
                                                    »
                                                </li>
                                            </a>
                                }
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mt-5">
                            <div className="row gap-3 mt-4">
                            {
                                publicidadesNoticias.map((element, index) => (
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
            </div>
            <Footer/>
        </>
    )
}

export default Busquedas