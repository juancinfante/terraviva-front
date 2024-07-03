import { useState } from "react"
import '../css/navbar.css';
import { Link } from "react-router-dom";
import terravivabco from '../assets/terraviva-bco.png'
import { Dropdown, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState("");

    const handleBuscar = async () => {
        if(input !== ""){
            location.href = `/noticias/b/${input}/10/1`;
        }
    }

    return (
        <>
            <header className="mb-4">
                <div className="container d-flex align-items-center justify-content-between">
                    <Link to="/">
                        <img src={terravivabco} alt="" style={{ width: "150px" }} />
                    </Link>
                    <div className="menuToggle" onClick={handleShow}></div>
                    <div className="d-none d-lg-block">
                        <div className="menu-navbar d-flex justify-content-center align-items-center gap-2">
                            <Dropdown className="dropdown-navbar">
                                <Dropdown.Toggle className="dropdown-toggle1" id="dropdown-basic">
                                    Noticias
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/noticias/10/1">Todas</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Buenos Aires/10/1">Buenos Aires</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Capital Federal/10/1">Capital Federal</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Catamarca/10/1">Catamarca</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Jujuy/10/1">Jujuy</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Cordoba/10/1">Cordoba</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/La Rioja/10/1">La Rioja</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Salta/10/1">Salta</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Santiago del Estero/10/1">Santiago del Estero</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Tucuman/10/1">Tucuman</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Chaco/10/1">Chaco</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Chubut/10/1">Chubut</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Corrientes/10/1">Corrientes</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Entre Rios/10/1">Entre Rios</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Formosa/10/1">Formosa</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/La Pampa/10/1">La Pampa</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Mendoza/10/1">Mendoza</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Misiones/10/1">Misiones</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Neuquen/10/1">Neuquen</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Rio Negro/10/1">Rio Negro</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/San Juan/10/1">San Juan</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/San Luis/10/1">San Luis</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Santa Cruz/10/1">Santa Cruz</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Tierra Del Fuego/10/1">Tierra Del Fuego</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="menu2-navbar d-flex gap-4">
                                <Link to={"/agenda/9/1"}>Agenda</Link>
                                <Link to={"/albums/9/1"}>Galeria</Link>
                            </div>
                            <div className="input-modal">
                                <input type="text" placeholder="buscar" required value={input} onChange={(e) => setInput(e.target.value)}/>
                                <button onClick={() => handleBuscar()}>
                                        <FontAwesomeIcon icon={faSearch} className='redes-icon' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <Offcanvas show={show} onHide={handleClose} backdrop="static">
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="row">
                                <div className="col-12">
                                    <div className="input-modal">
                                        <input type="text" placeholder="buscar" required value={input} onChange={(e) => setInput(e.target.value)} />
                                        <button>
                                            <a href={`/noticias/b/${input}/10/1`}>
                                                <FontAwesomeIcon icon={faSearch} className='redes-icon' />
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Dropdown className="dropdown">
                                <Dropdown.Toggle className="dropdown-toggle2" id="dropdown-basic">
                                    Noticias
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/noticias/10/1">Todas</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Santiago del Estero/10/1">Santiago del Estero</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Tucuman/10/1">Tucuman</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Salta/10/1">Salta</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Jujuy/10/1">Jujuy</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Catamarca/10/1">Catamarca</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Cordoba/10/1">Cordoba</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Buenos Aires/10/1">Buenos Aires</Dropdown.Item>
                                    <Dropdown.Item href="/noticias/Rosario/10/1">Rosario</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="menu-modal">
                                <a href="/agenda/12/1">Agenda</a>
                                <a href="/albums/9/1">Galeria</a>
                            </div>

                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </header>

            <div className="shadow"></div>
        </>
    )
}

export default Navbar