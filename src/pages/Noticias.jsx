/* eslint-disable react/no-unknown-property */
import Navbar from "../components/Navbar"
import Ticker from "../components/Ticker"
import Footer from "../components/Footer"
import "../css/article-config.css"
import "../css/noticias.css"
import '../css/tabs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom"
const Noticias = () => {
  return (
    <>
        <Ticker/>
        <div className="container-nav">
            <Navbar />
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
        <Footer />
    </>
  )
}

export default Noticias