import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import "../css/Noticia.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Breadcrumb } from "react-bootstrap";
import api from "../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Noticia = () => {

    const params = useParams();

    const [noticia, setNoticia] = useState([]);
    const [noticias, setNoticias] = useState([]);
    const [publis, setPublis] = useState([]);

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesNoticias = publis.filter(publicidad => publicidad.colocar_en[0].noticias >= 1 && publicidad.colocar_en[0].noticias <= 8);
    // Ordenar las publicidades filtradas por su número de noticias
    publicidadesNoticias.sort((a, b) => a.colocar_en[0].noticias - b.colocar_en[0].noticias);

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

    const getPubli = async () => {
        try {
            const resp = await api.get('api/publis');
            setPublis(resp.data.publis)
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
        // eslint-disable-next-line no-unused-vars
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

    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
    }, []);


    useEffect(() => {
        getNoticia();
        getNoticias();
        getPubli();
        setCurrentUrl(window.location.href);
        console.log(currentUrl)
    }, [])

    let image = "https://storage.googleapis.com/cmperstribe_storage_usha/Banner/IMG_3640.JPG";

    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <meta name="csrf_token" content="" />
                <title>{noticia.titulo}</title>
                <meta property="type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="title" content={noticia.titulo}/>
                <meta property="og:image" content={image} />
                <meta property="og:title" content={noticia.titulo} data-react-helmet="true" />
                <meta content="image/*" property="og:image:type" />
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
                            <p className="titulo mb-3">{noticia.titulo}</p>
                            <p className="autor">
                                <img src={noticia.fotoEditor} alt="" />
                                <span style={{ fontSize: "14px" }}>{noticia.editor} - {convertirFecha(noticia.created_at)}</span>
                            </p>
                        </div>
                        <img src={noticia.img_portada} alt="" className="noticia-img" />
                        <div className="d-flex gap-2 justify-content-end mb-3">
                            <div className="d-flex gap-1">
                                <FacebookShareButton
                                    url={currentUrl}
                                    title={noticia.titulo}
                                >
                                    <FacebookIcon size={36} />
                                </FacebookShareButton>
                                <TwitterShareButton
                                    url={currentUrl}
                                    title={noticia.titulo}
                                >
                                    <TwitterIcon size={36} />
                                </TwitterShareButton>
                                <WhatsappShareButton
                                    url={currentUrl}
                                    title={noticia.titulo}
                                >
                                    <WhatsappIcon size={36} />
                                </WhatsappShareButton>
                                {/* <a
                                    href={
                                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
                                    }
                                > compartir
                                </a> */}
                            </div>
                            {/* <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://terrraviva.netlify.app/noticia/66148f08873ef517f15d5a4f")}`}>FACEBOOK</a>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#3b5999", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                <FontAwesomeIcon icon={faFacebook} className='redes-icon' style={{ fontSize: "15px" }} />
                                <span>Facebook</span>
                            </div>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#000", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                <FontAwesomeIcon icon={faXTwitter} className='redes-icon' style={{ fontSize: "15px" }} />
                                <span>Twitter</span>
                            </div>
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#25d366", color: "white", fontSize: "13px", padding: "2px 3px" }}>
                                <FontAwesomeIcon icon={faWhatsapp} className='redes-icon' style={{ fontSize: "15px" }} />
                                <span>Whatsapp</span>
                            </div> */}
                        </div>
                        <p className="texto-noticia" dangerouslySetInnerHTML={insertarHTML(noticia.texto)}>
                        </p>
                        <div className="leer-mas">
                            <h1 className="border-section mb-4">Te puede interesar</h1>
                            <div className="row">
                                {noticias.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-md-4 leer-mas-article" key={index}>
                                        <img src={element.img_portada} alt="" style={{ height: "240px" }} />
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
            <Footer />
        </>
    )
}

export default Noticia