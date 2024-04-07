// /* eslint-disable react/no-unknown-property */
import Navbar from "../components/Navbar"
// import Ticker from "../components/Ticker"
import Footer from "../components/Footer"
import { Breadcrumb } from "react-bootstrap"
import publi1 from '../assets/publi1.png';
import publi2 from '../assets/publi2.png';
import publi3 from '../assets/publi3.png';
import publi4 from '../assets/publi4.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "../css/noticias.css"
import { Link, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



const Noticias = () => {
    
    const [noticias, setNoticias] = useState([]);
    const [data, setData] = useState([]);
    
    const [input, setInput] = useState("");
    const params = useParams();


    const getNoticias = async () => {
        if (params.prov !== undefined) {
            const resp = await api.get(`api/noticias/${params.prov}/${params.limit}/${params.page}`);
            setNoticias(resp.data.docs.reverse())
            setData(resp.data);
        } else {
            const resp = await api.get(`api/noticias/${params.limit}/${params.page}`);
            setNoticias(resp.data.noticias.docs.reverse())
            setData(resp.data.noticias)
        }
    }

    useEffect(() => {
        getNoticias();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    {
                        params.prov ?
                            <>
                                <Breadcrumb.Item href="/noticias/10/1">
                                    Noticias
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {params.prov}
                                </Breadcrumb.Item>
                            </> :
                            <>
                                <Breadcrumb.Item active>
                                    Noticias
                                </Breadcrumb.Item>
                            </>
                    }
                </Breadcrumb>
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-md-8 col-lg-9 d-flex flex-column gap-3 mas-noticias">
                        {
                            params.prov ?
                                <h1 className="border-section mb-4">{params.prov}</h1> :
                                <h1 className="border-section mb-4">Mas noticias</h1>
                        }
                        {
                            noticias.length == 0 ?
                                <h1 className="text-center mt-5 mb-5">NO HAY NOTICIAS</h1>
                                :

                                noticias.map((element, index) => (
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
                                params.prov == undefined ? (data.hasPrevPage ?
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
                                        <a href={`/noticias/${params.prov}/${params.limit}/${parseInt(params.page) - 1}`}>
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
                                params.prov == undefined ? (data.hasNextPage ?
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
                                        <a href={`/noticias/${params.prov}/${params.limit}/${parseInt(params.page) + 1}`}>
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
            <Footer />
            {/* <Ticker/>
        <div className="container-nav">
        </div>

        <div className="container2">
            <div className="article-container">
                <div className="section1">
                    <div className="header">
                        Noticias - PAIS
                    </div>
                    <div className="section1-cat">
                        CATEGORIA: PAIS
                    </div>
                    <div className="section1-article">
                        <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806557/test-img/cheqz8fpl2tdmoormt4g.jpg" alt="" />
                        <div className="info">
                            <p className="provincia">SANTIAGO</p>
                            <a href=""><p className="title"><Link to={"/noticia"}>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</Link></p></a>
                            <p className="fecha">20 de Diciembre, 2023</p>
                            <p className="texto">El músico y compositor santiagueño Cóndor López, despide el año con mucho folklore y con amigos como invitados espe </p>
                            <a href=""><button>LEER MAS</button></a>
                        </div>
                    </div>
                    <div className="section1-article">
                        <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806547/test-img/ofpca14ypk2ws82mgdkx.jpg" alt="" />
                        <div className="info">
                            <p className="provincia">SANTIAGO</p>
                            <a href=""><p className="title">Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p></a>
                            <p className="fecha">20 de Diciembre, 2023</p>
                            <p className="texto">El músico y compositor santiagueño Cóndor López, despide el año con mucho folklore y con amigos como invitados especiales para compartir una noche de música y amistad. La cita es para este viernes 29 de diciembre</p>
                            <a href=""><button>LEER MAS</button></a>
                        </div>
                    </div>
                    <div className="section1-article">
                        <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806567/test-img/kadgvrnpulzbm9q5cr7h.jpg" alt="" />
                        <div className="info">
                            <p className="provincia">SANTIAGO</p>
                            <a href=""><p className="title">Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p></a>
                            <p className="fecha">20 de Diciembre, 2023</p>
                            <p className="texto">El músico y compositor santiagueño Cóndor López, despide el año con mucho folklore y con amigos como invitados especiales para compartir una noche de música y amistad. La cita es para este viernes 29 de diciembre</p>
                            <a href=""><button>LEER MAS</button></a>
                        </div>
                    </div>
                    <div className="section1-article">
                        <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806589/test-img/pxrvklie9jevru8eoikd.jpg" alt="" />
                        <div className="info">
                            <p className="provincia">SANTIAGO</p>
                            <a href=""><p className="title">Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p></a>
                            <p className="fecha">20 de Diciembre, 2023</p>
                            <p className="texto">El músico y compositor santiagueño Cóndor López, despide el año con mucho folklore y con amigos como invitados especiales para compartir una noche de música y amistad. La cita es para este viernes 29 de diciembre</p>
                            <a href=""><button>LEER MAS</button></a>
                        </div>
                    </div>
                    <div className="articles-pagination">
                        <a href="" className="actual-page">1</a>
                        <a href="">2</a>
                        <a href="">3</a>
                    </div>
                </div>
                <div className="section2">
                    <div className="tabs-redes w-100">
                        <p>SIGUENOS EN NUESTRAS REDES</p>
                            <div className="redes">
                                    <a href="#" className='icon fb'>
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="#" className='icon ig'>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                    <a href="#" className='icon tw'>
                                        <FontAwesomeIcon icon={faXTwitter} />
                                    </a>
                            </div>
                    </div>
                    <div className="otras-noticias">
                        <p>MAS NOTICIAS</p>
                            <ul>
                                <li><a href=""> - CATAMARCA</a></li>
                                <li><a href=""> - SALTA</a></li>
                                <li><a href=""> - TUCUMAN</a></li>
                                <li><a href=""> - JUJUY</a></li>
                                <li><a href=""> - CORDOBA</a></li>
                                <li><a href=""> - ROSARIO</a></li>
                            </ul>
                    </div>
                    <div className="elfsight-app-e67d7d8b-182f-4ac5-8231-e167d55a2743" data-elfsight-app-lazy></div>
                </div>
            </div>
        </div>
        <Footer /> */}

        </>
    )
}

export default Noticias