/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Accordion } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import '../css/agenda.css'
import api from '../api/api';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
const Agenda = () => {

    const params = useParams();
    const [eventos, setEventos] = useState([]);

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

    useEffect(() => {
        getEventos();
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
                    <div className="col-12">
                        {
                            params.prov !== undefined ? 
                            <h1 className="border-section mb-4">Agenda: {params.prov} </h1>
                            :
                            <h1 className="border-section mb-4">Agenda: Proximos eventos </h1>
                        }
                        <Accordion  className='mb-4'>
                            <Accordion.Item eventKey="0" className="acordion">
                            {
                            params.prov !== undefined ? 
                            <Accordion.Header className="acordion">{params.prov}</Accordion.Header>

                            :
                            <Accordion.Header className="acordion">Provincia</Accordion.Header>

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
                                 <h1 className="text-center mt-5 mb-5">NO HAY EVENTOS</h1>
                                
                                : ""
                            }
                            {
                                eventos.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
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
                    {/* <div className="col-12">
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
                        <div>

                        </div>
                        <div className="row gap-3 mt-4">
                            <div className="col-12">
                                <img src={publi1} alt="" style={{ width: "100%", objectFit: "cover" }} />
                            </div>
                            <div className="col-12">
                                <img src={publi2} alt="" style={{ width: "100%", objectFit: "cover" }} />
                            </div>
                            <div className="col-12">
                                <img src={publi3} alt="" style={{ width: "100%", objectFit: "cover" }} />
                            </div>
                            <div className="col-12">
                                <img src={publi4} alt="" style={{ width: "100%", objectFit: "cover" }} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Agenda