import '../css/headerTop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { useEffect, useState } from 'react';

const HeaderTop = () => {

    const [clima, setClima] = useState("");

    function obtenerFechaActual() {
        const fechaActual = new Date();
        const fechaFormateada = format(fechaActual, "EEEE dd 'de' MMMM", { locale: esLocale });
        return fechaFormateada;
    }

    const obtenerClima = async() => {
        try {
            const resp = await fetch(`https://api.weatherapi.com/v1/current.json?key=0eb07b77650e45a3a94143508241304&q=Santiago del Estero&aqi=no`);
            const datos = await resp.json();
            setClima(datos.current.temp_c);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        obtenerClima()
    })
  return (
    <>
        <div className="top">
            <div className="container d-flex justify-content-between align-items-center pt-2 pb-2">
                <p>{obtenerFechaActual().toUpperCase() +", "+ clima +"°c" } </p>
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