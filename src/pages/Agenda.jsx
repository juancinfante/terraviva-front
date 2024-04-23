import { Breadcrumb, Accordion } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import '../css/agenda.css'
import api from '../api/api';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Agenda = () => {

    const params = useParams();
    const [eventos, setEventos] = useState([]);
    const [publis, setPublis] = useState([]);

    const getEventos = async () => {
        try {
            if (params.prov == undefined) {
                const resp = await api.get(`api/eventos/${params.limit}/${params.page}`);
                setEventos(resp.data.eventos.docs);
            } else {
                const resp = await api.get(`api/eventos/${params.prov}/${params.limit}/${params.page}`);
                setEventos(resp.data.docs);
            }
        } catch (error) {
            console.log(error);
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
        getEventos();
        getPubli();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/agenda">
                        Agenda
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row w-100">
                    <div className="col-12 col-lg-9">

                        {
                            params.prov !== undefined ?
                                <h1 className="border-section mb-4">Agenda: {params.prov} </h1>
                                :
                                <h1 className="border-section mb-4">Agenda: Proximos eventos </h1>
                        }
                        <Accordion className='mb-4'>
                            <Accordion.Item eventKey="0" className="acordion">
                                {
                                    params.prov !== undefined ?
                                        <Accordion.Header className="acordion">{params.prov}</Accordion.Header>

                                        :
                                        <Accordion.Header className="acordion" style={{fontWeight: "bold"}}>Provincia</Accordion.Header>

                                }
                                <Accordion.Body>
                                    <ul className='provincias-agenda'>
                                        <li>
                                            <a href="/agenda/12/1">Todas</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Santiago del Estero/12/1">Santiago del Estero</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Tucuman/12/1">Tucuman</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Catamarca/12/1">Catamarca</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Salta/12/1">Salta</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Cordoba/12/1">Cordoba</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Jujuy/12/1">Jujuy</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Santa Fe/12/1">Santa Fe</a>
                                        </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="row">
                            {
                                eventos.length == 0 ?
                                    <h1 className="text-center mt-5 mb-5">CARGANDO...</h1>

                                    : ""
                            }
                            {
                                eventos.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-xl-4 mb-4" key={index}>
                                        <a href={`/evento/${element._id}`}>
                                            <div className="agenda-flayer">
                                                <img src={element.flayer} alt="" />
                                                <div className="mas-info">
                                                    <h1>MÁS INFORMACIÓN</h1>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pt-5">
                        <div className="row gap-3 pt-5">
                        {
                                publis.map((element, index) => (
                                    fechaPasada(element.egreso) && element.colocar_en.includes("agenda") && (
                                        <div className="col-12" key={index}>
                                            <img src={element.foto} alt="" style={{ width: "100%", objectFit: "cover" }} />
                                        </div>
                                    )
                                ))
                            }
                        </div>
                        <div>

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
            <Footer />
        </>
    )
}

export default Agenda