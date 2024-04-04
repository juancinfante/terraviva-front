/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../css/Noticia.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faWhatsapp, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Breadcrumb } from "react-bootstrap";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import api from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";


const Noticia = () => {

    const params = useParams();

    const [noticia, setNoticia] = useState([]);
    const [noticias, setNoticias] = useState([]);

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

    const link = encodeURI(window.location.href);
    const msg = encodeURIComponent("hola");
    const title = encodeURIComponent("titulo")


    useEffect(() => {
        getNoticia();
        getNoticias();
    }, [])

    return (
        <>
        <Helmet>
          {/* Etiquetas meta de Open Graph para la página principal */}
          <meta property="og:title" content="Título de tu página principal" />
          <meta property="og:description" content="Descripción de tu página principal" />
          <meta property="og:url" content="URL_de_tu_página_principal" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806557/test-img/cheqz8fpl2tdmoormt4g.jpg" />
          {/* Otras etiquetas meta de Open Graph según sea necesario */}
        </Helmet>

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
                            <p className="titulo">{noticia.titulo}</p>
                            <p className="autor">
                                <img src={noticia.fotoEditor} alt="" />
                                <span style={{ fontSize: "14px" }}>{noticia.editor} - {convertirFecha(noticia.created_at)}</span>
                            </p>
                        </div>
                        <img src={noticia.img_portada} alt="" className="noticia-img" />
                        <div className="d-flex gap-2 justify-content-end mb-3">
                            <a href={`https://www.facebook.com/share.php?u=${link}`}>

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
                                    <div className="col-4 leer-mas-article" key={index}>
                                        <img src={element.img_portada} alt="" />
                                        <p className="leer-mas-texto mt-2">
                                            <a href={`/noticia/${element._id}`}>{element.titulo}</a>
                                        </p>
                                    </div>
                                ))}
                                <a href={`/noticias/${noticia.provincia}/10/1`} className="btn-vermas">VER MAS</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <h1 className="border-section mb-4">Redes</h1>
                        <a href="https://www.facebook.com/terravivafolclore" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#3b5999" }}>
                                <FontAwesomeIcon icon={faFacebook} className='redes-icon' />
                                <span>12345 Fans</span>
                                <span>Like</span>
                            </div>
                        </a>
                        <a href="https://twitter.com/terravivanoa" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#55acee" }}>
                                <FontAwesomeIcon icon={faTwitter} className='redes-icon' />
                                <span>12345 Fans</span>
                                <span>Seguir</span>
                            </div>
                        </a>
                        <a href="https://www.youtube.com/user/terravivafolclore" target='blank'>
                            <div className='redes-home' style={{ backgroundColor: "#cc181e" }}>
                                <FontAwesomeIcon icon={faYoutube} className='redes-icon' />
                                <span>12345 Fans</span>
                                <span>Suscribir</span>
                            </div>
                        </a>
                        <div>
                            <h1 className="border-section mb-4">Tags</h1>
                            <div className='blog-tags mb-5'>
                                <ul>
                                    <li>
                                        <a href="">#PEÑA</a>
                                    </li>
                                    <li>
                                        <a href="">#MARCELOTOLEDO</a>
                                    </li>
                                    <li>
                                        <a href="">#CARABAJAL</a>
                                    </li>
                                    <li>
                                        <a href="">#TERRAVIVA</a>
                                    </li>
                                    <li>
                                        <a href="">#NESTORGARNICA</a>
                                    </li>
                                    <li>
                                        <a href="">#ENTRADA</a>
                                    </li>
                                    <li>
                                        <a href="">#PEÑA</a>
                                    </li>
                                    <li>
                                        <a href="">#MARCELOTOLEDO</a>
                                    </li>
                                    <li>
                                        <a href="">#CARABAJAL</a>
                                    </li>
                                    <li>
                                        <a href="">#TERRAVIVA</a>
                                    </li>
                                    <li>
                                        <a href="">#NESTORGARNICA</a>
                                    </li>
                                    <li>
                                        <a href="">#ENTRADA</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row gap-3">
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
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Noticia