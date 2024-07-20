import { useEffect, useState } from 'react';
import api from '../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/masNoticias.css';
import { Link } from 'react-router-dom';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const MasNoticias = () => {

    const [noticias, setNoticias] = useState([]);
    const [publis, setPublis] = useState([]);


    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesInicio = publis.filter(publicidad => publicidad.colocar_en[0].inicio >= 1 && publicidad.colocar_en[0].inicio <= 8);
    // Ordenar las publicidades filtradas por su número de inicio
    publicidadesInicio.sort((a, b) => a.colocar_en[0].inicio - b.colocar_en[0].inicio);

    const getNoticias = async () => {
        try {
            const resp = await api.get('api/noticias/21/1');
            setNoticias(resp.data.noticias.docs);
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
        getNoticias();
        getPubli();
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h1 className="border-section mb-4">Más noticias</h1>
                        <div className="row">
                            {noticias.length != 0 ?
                                noticias.slice(5, 20).map((element, index) => (
                                    <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                                        <a href={`/noticia/${element._id}`}>
                                            <div className="masnoticia" key={index}>
                                                <img src={element.img_portada} alt="" />
                                                <div className="info">
                                                    <div className="category-post-noticias">
                                                        {element.provincia}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="post-title mt-2">
                                                <p>
                                                    {element.titulo}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                )) :
                                <>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div className="masnoticia">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                        <div className="post-title mt-2">
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                            <p>
                                                {<Skeleton />}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="vermas w-100 d-flex justify-content-center mt-5">
                                <button>
                                    <Link to="/noticias/10/1">
                                        <span className='p-2' style={{ color: "white", fontWeight: "bold" }}>
                                            VER MÁS
                                        </span>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 mt-5">
                        <div className="row gap-3 mt-5">
                            {
                                publicidadesInicio.map((element, index) => (
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
                                <span>+230mil</span>
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
                                <span>+32mil</span>
                                <span>Seguir</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MasNoticias