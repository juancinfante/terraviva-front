import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import api from "../api/api";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "../components/Footer";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Album = () => {

    const [fotos, setFotos] = useState([]);
    const [album, setAlbum] = useState([]);


    const params = useParams();

    const getAlbum = async () => {
        try {
            const resp = await api.get(`api/album/${params.id}`);
            setFotos(resp.data.album[0].fotos);
            setAlbum(resp.data.album[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const generarArregloConFotos = (urls) => {
        const images = [];
        urls.forEach(url => {
            const imagen = {
                original: url,
                thumbnail: url
            };
            images.push(imagen);
        });
        return images;
    }

    useEffect(() => {
        getAlbum();

    }, [])

    return (
        <>
            <Navbar />
            <div className="container mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Album
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border-section mb-4">Album</h1>
                <div className="d-flex flex-column mb-4">
                    <h1>{album.nombre}</h1>
                    <p>{album.fecha}</p>
                </div>
                <div className="row">
                    <div className="col-12 col-lg-9" style={{marginBottom: "200px"}}>
                    <ReactImageGallery items={generarArregloConFotos(fotos)} />
                    </div>
                    <div className="col-12 col-lg-3">
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

export default Album