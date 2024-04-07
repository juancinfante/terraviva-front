/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import api from '../api/api';
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faYoutube, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/masNoticias.css';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const MasNoticias = () => {

    const [noticias, setNoticias] = useState([]);
    const [input, setInput] = useState("");

    const getNoticias = async () => {
        try {
            const resp = await api.get('api/noticias/20/1');
            setNoticias(resp.data.noticias.docs.reverse())
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getNoticias();
    }, [])
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
        const fechaFormateada = `${diaMes} de ${mes} del ${ano}`;

        return fechaFormateada;
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h1 className="border-section mb-4">Mas noticias</h1>
                        <div className="row">
                            {
                                noticias.slice(5, 13).map((element, index) => (
                                    <div className="col-12 col-md-6 mb-4" key={index}>
                                        <a href={`/noticia/${element._id}`}>
                                            <img src={element.img_portada} alt="" style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                                            <div className='d-flex justify-content-between mt-3'>
                                                <h5 className="category-post" style={{ fontSize: "15px", fontWeight: "bold" }}>{element.provincia}</h5>
                                                <h5 style={{ fontSize: "15px", }}>
                                                    {convertirFecha(element.created_at)}
                                                </h5>
                                            </div>
                                            <h5 className="titulo-galeria " style={{ fontWeight: "600" }}>
                                                {element.titulo}
                                            </h5>
                                        </a>
                                    </div>
                                ))
                            }
                            <div className="vermas w-100 d-flex justify-content-center">
                                <button>
                                    <Link to="/noticias/10/1">
                                        <span className='p-3' style={{ color: "white", fontWeight: "bold" }}>
                                            VER MAS
                                        </span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3">
                        <h1 className="border-section mb-4">Busqueda</h1>
                        <div className="input-modal">
                            <input type="text" placeholder="buscar" required value={input} onChange={(e) => setInput(e.target.value)} />
                            <button>
                                <a href={`/noticias/b/${input}/10/1`}>
                                    <FontAwesomeIcon icon={faSearch} className='redes-icon' />
                                </a>
                            </button>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default MasNoticias