import Navbar from "../components/Navbar"
import { Breadcrumb } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../css/evento.css'
import api from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Footer from "../components/Footer";

const Evento = () => {

    const [evento, setEvento] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [publis, setPublis] = useState([]);

    const params = useParams();


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

    function formatDate(fecha) {
        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        // Crear un objeto de fecha a partir de la entrada
        const date = new Date(fecha);

        // Obtener el día de la semana, día del mes y mes de la fecha
        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate() + 1;
        const month = months[date.getMonth()];
        // eslint-disable-next-line no-unused-vars
        const year = date.getFullYear();

        // Devolver la fecha formateada
        return `${dayOfWeek} ${dayOfMonth} de ${month}`;
    }

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
        getPubli();
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
                <div className="row mb-5">
                    <div className="col-12 col-lg-9">
                <h1 className="border-section mb-4">Agenda</h1>
                        {/* <div className="title-noticia">
                            <p className="titulo">{evento.titulo}</p>
                            <h1>{formatDate(evento.fecha)} </h1>
                        </div>
                        <div className="d-flex w-100 justify-content-center mb-4 mt-4">
                            <img src={evento.flayer} alt="" className="flayer" />
                        </div> */}
                        <h1 className="titulo-evento">{evento.titulo}</h1>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="">
                                    <img src={evento.flayer} alt="" className="flayer"/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-3 mb-3 d-flex flex-column justify-items-beetween">
                                <p className="texto-evento mb-3" dangerouslySetInnerHTML={insertarHTML(evento.texto)}>
                                </p>
                                <h4>{"Fecha: " + formatDate(evento.fecha)}</h4>
                                <h4>{"Lugar: " + evento.direccion}</h4>
                                <h4>{"Horario: " + evento.horario}</h4>
                            </div>
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
                    <div className="col-12 col-lg-3 pt-5" style={{ marginTop: "10px" }}>
                        <div className="row gap-3 mt-4 pt-4">
                            {
                                publis.map((element, index) => (
                                    fechaPasada(element.egreso) && element.colocar_en.includes("noticias") && (
                                        <div className="col-12" key={index}>
                                            <a href={element.link} target='blank'>
                                                <img src={element.foto} alt="" style={{ width: "100%", objectFit: "cover" }} />
                                            </a>
                                        </div>
                                    )
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

export default Evento