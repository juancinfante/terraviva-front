import '../css/headerTop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const HeaderTop = () => {
  return (
    <>
        <div className="top">
            <div className="container d-flex justify-content-between align-items-center pt-2 pb-2">
                <p>Miercoles 20 de Agosto</p>
                <div className="icons-top d-flex gap-2 fs-6">
                    <a href="https://www.facebook.com/terravivafolclore">
                        <FontAwesomeIcon icon={faFacebook} className='icon-top' />
                    </a>
                    <a href="https://www.instagram.com/terravivafolclore">
                        <FontAwesomeIcon icon={faInstagram} className='icon-top' />
                    </a>
                    <a href="https://twitter.com/terravivanoa">
                        <FontAwesomeIcon icon={faXTwitter} className='icon-top' />
                    </a>
                    <a href="https://www.youtube.com/user/terravivafolclore">
                        <FontAwesomeIcon icon={faYoutube} className='icon-top' />
                    </a>
                </div>
            </div>
        </div>
    </>
  )
}

export default HeaderTop