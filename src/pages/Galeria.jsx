import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import '../css/galeria.css';
import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';


const Galeria = () => {

    const [albums, setAlbums] = useState([]);
    const [data, setData] = useState([]);

    const params = useParams();

    const getAlbums = async () => {
        try {
            const resp = await api.get(`api/albums/${params.limit}/${params.page}`);
            setAlbums(resp.data.albums.docs);
            setData(resp.data.albums);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAlbums();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Galeria
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <h1 className="border-section mb-4">Galerias</h1>
                        <div className="row">

                            {
                                albums.map((element, index) => (
                                    <div className="col-12 col-sm-6 col-lg-4 mb-4" key={index}>
                                        <a href={`/album/${element._id}`}>
                                            <div className="album-container">
                                                <img src={element.fotos[0]} alt="" />
                                                <div className="info-album">
                                                    <h2>{element.nombre}</h2>
                                                    <p>{element.fecha}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <ul className="paginationn">
                                {
                                    data.hasPrevPage ?
                                        <a href={`/albums/${params.limit}/${data.prevPage}`}>
                                            <li>
                                                «
                                            </li>
                                        </a>
                                        : <a className="disabled-pagination">
                                            <li>
                                                «
                                            </li>
                                        </a>
                                }
                                {
                                    <a className="activa">
                                        <li>
                                            {data.page}
                                        </li>
                                    </a>
                                }
                                {
                                    data.hasNextPage ?
                                        <a href={`/albums/${params.limit}/${data.nextPage}`}>
                                            <li>
                                                »
                                            </li>
                                        </a>
                                        : <a className="disabled-pagination">
                                            <li>
                                                »
                                            </li>
                                        </a>
                                }

                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-3 pt-5">
                        <div className="row gap-3 pt-5">
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

export default Galeria