import { useState } from 'react'
import '../css/tabs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
const Tabs = () => {

    const [tab, setTab] = useState(1);

    const handleTab = (id) => {
        setTab(id);
    }
  return (
    <>
        <div className="tabs-section">
            <div className="tabs-container">
                <div className="tabs-header">
                    <p>PAIS</p>
                    <ul>
                        <li onClick={() => handleTab(1)} className={tab == 1 ? "red" : "" }>SANTIAGO</li>
                        <li onClick={() => handleTab(2)} className={tab == 2 ? "red" : "" }>TUCUMAN</li>
                        <li onClick={() => handleTab(3)} className={tab == 3 ? "red" : "" }>SALTA</li>
                        <li onClick={() => handleTab(4)} className={tab == 4 ? "red" : "" }>JUJUY</li>
                        <li onClick={() => handleTab(5)} className={tab == 5 ? "red" : "" }>CATAMARCA</li>
                        <li onClick={() => handleTab(6)} className={tab == 6 ? "red" : "" }>SANTA FE</li>
                    </ul>
                </div>
                <div className={tab == 1 ? "simple-tab show" : "hidden"}>
                    <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/e26d2b_marceylabra.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>SANTIAGO DEL ESTERO</p>
                            </span>
                            <p className='titulo'>Marcelo Toledo y La Brasita de mi Chala harán la última peña del año en Santiago</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>La Peña por los sueños llega a la ciudad de La Banda</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <button>VER MAS</button>
                    </div>
                </div>
                <div className={tab == 2 ? "simple-tab show" : "hidden"}>
                <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/dd33c4_precosquintucuman.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>TUCUMAN</p>
                            </span>
                            <p className='titulo'>Estos son los ganadores del Pre Cosquín sede Tucumán</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tab == 3 ? "simple-tab show" : "hidden"}>
                <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/890210_serata.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>SALTA</p>
                            </span>
                            <p className='titulo'>Galleguillo, Caballero y Pennisi, los primeros confirmados en la Serenata de Cafayate 2024</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tab == 4 ? "simple-tab show" : "hidden"}>
                <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/951281_caspala.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>JUJUY</p>
                            </span>
                            <p className='titulo'>Caspalá, el pueblo jujeño de 250 habitantes que mantiene prácticas culturales y agrícolas milenarias</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tab == 5 ? "simple-tab show" : "hidden"}>
                <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/284f6d_nestorguno.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>CATAMARCA</p>
                            </span>
                            <p className='titulo'>Catamarca: El Festival El Colono anunció su grilla artística</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={tab == 6 ? "simple-tab show" : "hidden"}>
                <div className="main-news" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/cccfa6_ralydescalza.jpg')"}}>
                        <div className="filter">
                            <span>
                                <p className='provincia'>SANTA FE</p>
                            </span>
                            <p className='titulo'>Gran expectativa en Acebal por el Festival de la Música Itinerante</p>
                            <span>
                                <p  className='fecha'>20 de Diciembre del 2023</p>
                            </span>
                        </div>
                    </div>
                    <div className="secondary-news">
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                        <div className="inner">
                            <img src={"http://terraviva.com.ar/administrador/img/uploads/8531be_salitralsde.jpg"} alt="" />
                            <div className="info">
                                <span>
                                <p>Salitral celebra sus 20 años de trayectoria en la previa a la Nochebuena</p>
                                </span>
                                <p className="fecha">
                                    20 de Diciembre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="tabs-redes">
                    <p>SIGUENOS EN NUESTRAS REDES</p>
                <div className="container">
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
                    <div className="publi" style={{"backgroundImage" : "url('https://th.bing.com/th/id/OIP.473zzt-5RGt0moHvQw-G7gAAAA?rs=1&pid=ImgDetMain')"}}>
                    </div>
                </div>
            </div>  
        </div>
        
    </>
  )
}

export default Tabs