/* eslint-disable no-unused-vars */
import Navbar from "../components/Navbar"
import { Breadcrumb } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

const Busquedas = () => {

    const params = useParams();

    const [busquedas, setBusquedas] = useState([]);
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");
    
    const getBusquedas = async () => {
        try {
            const resp = await api.get(`/api/noticia/b/${params.busq}/${params.limit}/${params.page}`);
            setBusquedas(resp.data.noticia.docs)
            setData(resp.data.noticia)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBusquedas();
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
                </Breadcrumb>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 col-lg-9 d-flex flex-column gap-3 mas-noticias">
                            <h1 className="border-section mb-4">Resultados de: {params.busq} </h1>
                            {
                                busquedas.map((element, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <Link to={`/noticia/${element._id}`}>
                                                <img src={element.img_portada} alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                            </Link>
                                        </div>
                                        <div className="col-12 col-sm-6 col-lg-8">
                                            {/* <div className="category-post">{element.provincia} </div> */}
                                            <Link to={`/noticia/${element._id}`}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    {/* <p style={{fontSize: "14px", color: "black"}} className="mt-2 mb-2">{convertirFecha(element.created_at)}</p> */}
                                                    <h5 className="fs-4 mt-2">{element.titulo}</h5>
                                                    <p className="elipsis">{element.descripcion}</p>
                                                    {/* <p>Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.</p> */}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                ))
                            }
                            <ul className="paginationn">

                                {
                                    params.busq == undefined ? (data.hasPrevPage ?
                                        <a href={`/noticias/${params.limit}/${parseInt(params.page) - 1}`}>
                                            <li>
                                                «
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                «
                                            </li>
                                        </a>) :
                                        data.hasPrevPage ?
                                            <a href={`/noticias/b/${params.busq}/${params.limit}/${parseInt(params.page) - 1}`}>
                                                <li>
                                                    «
                                                </li>
                                            </a> :
                                            <a className="disabled-pagination">
                                                <li>
                                                    «
                                                </li>
                                            </a>
                                }
                                <a className="activa">
                                    <li>
                                        {data.page}
                                    </li>
                                </a>
                                {
                                    params.busq == undefined ? (data.hasNextPage ?
                                        <a href={`/noticias/${params.limit}/${parseInt(params.page) + 1}`}>
                                            <li>
                                                »
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                »
                                            </li>
                                        </a>) :
                                        data.hasNextPage ?
                                            <a href={`/noticias/b/${params.busq}/${params.limit}/${parseInt(params.page) + 1}`}>
                                                <li>
                                                    »
                                                </li>
                                            </a> :
                                            <a className="disabled-pagination">
                                                <li>
                                                    »
                                                </li>
                                            </a>
                                }
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3">
                            <h1 className="border-section mb-4">Busqueda</h1>
                            <div className="input-modal">
                                <input type="text" placeholder="buscar" required value={input} onChange={(e) => setInput(e.target.value)}/>
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
            </div>
            <Footer/>
        </>
    )
}

export default Busquedas