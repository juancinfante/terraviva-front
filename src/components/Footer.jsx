import '../css/footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <>
        <div className="footer">
            <div className="container-footer">
                <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703806755/test-img/lddntygnvx1r7vbuc3jl.png" alt="" />
                <p>Santiago del Estero, Argentina.</p>
                <ul>
                    <li>
                        <a href="">
                            <FontAwesomeIcon icon={faFacebook}/>    
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <FontAwesomeIcon icon={faInstagram}/>    
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <FontAwesomeIcon icon={faXTwitter}/>    
                        </a>
                    </li>
                </ul>
            </div>
        </div>
         <div className="footer2">
            <div className="container-footer2">
                    <p>© Copyright 2023, All Rights Reserved</p>
                    <ul>
                        <li>
                            <a href="">
                                Noticias   
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Pais   
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Agenda   
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Entrevistas   
                            </a>
                        </li>
                        <li>
                            <a href="">
                                Galeria
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
    </>
  )
}

export default Footer