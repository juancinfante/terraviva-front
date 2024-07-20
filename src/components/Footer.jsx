import '../css/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import terrabco from '../assets/terraviva-bco.png';
const Footer = () => {
  return (
    <>
        <div className="footer mt-5 p-5">
            <div className="container container-footer d-flex flex-column gap-3 align-items-center flex-md-row justify-content-between">
                <a href="/">
                    <img src={terrabco} alt="" style={{width: "200px"}} />
                </a>
                <p>Santiago del Estero, Argentina.</p>
                <ul>
                    <li>
                        <a href="https://www.facebook.com/terravivafolclore" target='blank'>
                            <FontAwesomeIcon icon={faFacebook}/>    
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/terravivafolclore" target='blank'>
                            <FontAwesomeIcon icon={faInstagram}/>    
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com/terravivanoa" target='blank'>
                            <FontAwesomeIcon icon={faXTwitter}/>    
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/user/terravivafolclore" target='blank'>
                            <FontAwesomeIcon icon={faYoutube}/>    
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="encabezado">
                <div className="container d-flex flex-column gap-3 align-items-center flex-md-row justify-content-between">
                    <span>Copyright © 2024 Terraviva</span>
                    <ul className='d-flex flex-column gap-3 flex-md-row'>
                        <li><a href="/noticias/10/1">Noticias</a></li>
                        <li><a href="/agenda/10/1">Agenda</a></li>
                        <li><a href="/galeria/9/1">Galería</a></li>
                        <li><a href="">Nosotros</a></li>
                        <li><a href="">Contacto</a></li>
                    </ul>
                </div>
        </div>
        
    </>
  )
}

export default Footer