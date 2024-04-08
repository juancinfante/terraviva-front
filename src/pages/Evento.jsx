import Navbar from "../components/Navbar"
import { Breadcrumb } from "react-bootstrap";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/evento.css'
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Evento = () => {

    const [evento, setEvento] = useState([]);
    const [eventos, setEventos] = useState([]);

    const params = useParams();
    const [input, setInput] = useState("");


    const getEvento = async () => {
        try {
            const resp = await api.get(`api/evento/${params.id}`);
            setEvento(resp.data.evento[0]);
        } catch (error) {
            console.log(error);
        }
    }
    const getEventos = async () => {
        try {
            const resp = await api.get("api/eventos/6/1");
            setEventos(resp.data.eventos.docs);
        } catch (error) {
            console.log(error);
        }
    }
    function insertarHTML(html) {
        return { __html: html };
    }

    useEffect(() => {
        getEvento();
        getEventos();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/agenda/10/1">
                        Agenda
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border-section mb-4">Agenda</h1>
                <div className="row mb-5">

                    <div className="col-12 col-lg-9">
                        <div className="title-noticia">
                            <p className="titulo">{evento.titulo}</p>
                        </div>
                        <div className="d-flex w-100 justify-content-center mb-4 mt-4">
                            <img src={evento.flayer} alt="" className="flayer" />

                        </div>
                        <div className="d-flex gap-2 justify-content-end mb-3">
                            <a href="">

                                <div className="d-flex align-items-center" style={{ backgroundColor: "#3b5999", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                    <FontAwesomeIcon icon={faFacebook} className='redes-icon' style={{ fontSize: "15px" }} />
                                    <span>Facebook</span>
                                </div>
                            </a>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#000", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                <FontAwesomeIcon icon={faXTwitter} className='redes-icon' style={{ fontSize: "15px" }} />
                                <span>Twitter</span>
                            </div>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#25d366", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                <FontAwesomeIcon icon={faWhatsapp} className='redes-icon' style={{ fontSize: "15px" }} />
                                <span>Whatsapp</span>
                            </div>
                        </div>
                        <p className="texto-noticia" dangerouslySetInnerHTML={insertarHTML(evento.texto)}>
                        </p>
                        <div className="leer-mas">
                            <h1 className="border-section mb-4">Te puede interesar</h1>
                            <div className="row">
                                {eventos.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-md-4 leer-mas-article leer-mas-article" key={index}>
                                        <img src={element.flayer} alt="" />
                                        <p className="leer-mas-texto mt-2">
                                            <a href={`/evento/${element._id}`}>{element.titulo}</a>
                                        </p>
                                    </div>
                                ))}
                                <a href={`/agenda/12/1`} className="btn-vermas">VER MAS</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pt-5" style={{marginTop: "10px"}}>
                        <div className="row gap-3 mt-4 pt-4">
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

export default Evento