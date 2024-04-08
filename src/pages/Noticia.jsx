/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../css/Noticia.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faWhatsapp, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Breadcrumb } from "react-bootstrap";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import api from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { faSearch } from "@fortawesome/free-solid-svg-icons";


const Noticia = () => {

    const params = useParams();

    const [noticia, setNoticia] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [input, setInput] = useState("");


    const getNoticia = async () => {
        try {
            const resp = await api.get(`api/noticia/${params.id}`);
            setNoticia(resp.data.noticia[0]);
        } catch (error) {
            console.log(error);
        }
    }
    const getNoticias = async () => {
        try {
            const resp = await api.get('api/noticias/6/1');
            setNoticias(resp.data.noticias.docs)
        } catch (error) {
            console.log(error)
        }
    }

    function insertarHTML(html) {
        return { __html: html };
    }


    function convertirFecha(fecha) {
        // Obtenemos el nombre del día de la semana
        const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diaSemana = diasSemana[new Date(fecha).getDay()];

        // Obtenemos el día del mes
        const diaMes = new Date(fecha).getDate();

        // Obtenemos el nombre del mes
        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const mes = meses[new Date(fecha).getMonth()];

        // Obtenemos el año
        const ano = new Date(fecha).getFullYear();

        // Formateamos la fecha
        const fechaFormateada = `${diaMes} / ${mes} / ${ano}`;

        return fechaFormateada;
    }


    useEffect(() => {
        getNoticia();
        getNoticias();
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
                    <Breadcrumb.Item active>
                        Santiago del Estero
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row mb-5">
                    <div className="col-12 col-lg-9">
                        <h1 className="border-section mb-4">{noticia.provincia}</h1>
                        <div className="title-noticia">
                            <p className="titulo mb-3">{noticia.titulo}</p>
                            <p className="autor">
                                <img src={noticia.fotoEditor} alt="" />
                                <span style={{ fontSize: "14px" }}>{noticia.editor} - {convertirFecha(noticia.created_at)}</span>
                            </p>
                        </div>
                        <img src={noticia.img_portada} alt="" className="noticia-img" />
                        <div className="d-flex gap-2 justify-content-end mb-3">
                            <a href="">

                            <div className="d-flex align-items-center" style={{backgroundColor: "#3b5999", color: "white", fontSize:"13px", padding:"2px 3px"}}>
                                <FontAwesomeIcon icon={faFacebook} className='redes-icon' style={{fontSize:"15px"}}/>
                                <span>Facebook</span>
                            </div>
                            </a>
                            <div className="d-flex align-items-center" style={{backgroundColor: "#000", color: "white", fontSize:"13px", padding:"2px 3px"}}>
                                <FontAwesomeIcon icon={faXTwitter} className='redes-icon' style={{fontSize:"15px"}}/>
                                <span>Twitter</span>
                            </div>
                            <div className="d-flex align-items-center" style={{backgroundColor: "#25d366", color: "white", fontSize:"13px", padding:"2px 3px"}}>
                                <FontAwesomeIcon icon={faWhatsapp} className='redes-icon' style={{fontSize:"15px"}}/>
                                <span>Whatsapp</span>
                            </div>
                        </div>
                        <p className="texto-noticia" dangerouslySetInnerHTML={insertarHTML(noticia.texto)}>
                        </p>
                        <div className="leer-mas">
                            <h1 className="border-section mb-4">Te puede interesar</h1>
                            <div className="row">
                                {noticias.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-md-4 leer-mas-article" key={index}>
                                        <img src={element.img_portada} alt="" style={{height: "240px"}}/>
                                        <p className="leer-mas-texto mt-2">
                                            <a href={`/noticia/${element._id}`}>{element.titulo}</a>
                                        </p>
                                    </div>
                                ))}
                                <a href={`/noticias/10/1`} className="btn-vermas">VER MAS</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pt-5">
                            <div className="row gap-3 pt-4">
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

export default Noticia