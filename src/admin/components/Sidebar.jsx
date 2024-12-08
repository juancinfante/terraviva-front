/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../css/sidebar.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'
import swal from 'sweetalert'



export const Sidebar = () => {

    const [barraLateral, setBarralateral] = useState(false)
    const [usuario, setUsuario] = useState([]);
    const [privilegios, setPrivilegios] = useState([])

    const navigate = useNavigate();

    
    const handleMenu = () => {
        if (barraLateral) {
            setBarralateral(false);
        } else {
            setBarralateral(true);
        }
    }
    const userID = localStorage.getItem("id");

    const checkUser = async () => {
        if (userID !== undefined) {
            try {
                const resp = await api.get(`api/usuario/${userID}`);
                setUsuario(resp.data.usuario[0]);
                setPrivilegios(resp.data.usuario[0].privilegios);
                localStorage.setItem("fotoPerfil",resp.data.usuario[0].foto);
                localStorage.setItem("Nombre", resp.data.usuario[0].nombre);
                localStorage.setItem("Apellido", resp.data.usuario[0].apellido);
            } catch (error) {
                navigate('/login');
                console.log(error);
            }
        }
    }
    const logOut = () => {
        swal({
            title: "Seguro deseas salir?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem('id');
                localStorage.removeItem('Nombre');
                localStorage.removeItem('Apellido');
                localStorage.removeItem('fotoPerfil');
              navigate('/login')
            } else {
              console.log("first")
            }
          });
    }

    useEffect(() => {
        
        checkUser();
        
    }, [])

    return (
        <>
            <div className="menu" onClick={handleMenu}>
                <ion-icon name="menu-outline"></ion-icon>
                <ion-icon name="close-outline"></ion-icon>
            </div>

            <div className={barraLateral ? "barra-lateral max-barra-lateral pt-5" : "barra-lateral pt-5"}>
                <div className='mt-5 mb-2'>
                    <div className="nombre-pagina d-flex justify-content-center">
                        <img src={usuario.foto} alt="Foto de Perfil"
                            style={{ width: "120px", height: "120px", objectFit: "cover" }} className='rounded-circle mb-2' />
                    </div>
                    <h4 className='d-flex justify-content-center'>{usuario.nombre}</h4>
                </div>

                <nav className="navegacion">
                    <ul>
                    {
                            privilegios.includes("noticias") ?
                                <>
                                    <li>
                                        <Link to={'/admin'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="newspaper-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    NOTICIAS
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </> : ""
                        }
                        {
                            privilegios.includes("galeria") ?
                                <>
                                    <li>
                                        <Link to={'/galeria'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="images-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    GALERIA
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </> : ""
                        }
                        {
                            privilegios.includes("agenda") ?
                                <>
                                    <li>
                                        <Link to={'/agenda'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="images-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    AGENDA
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </> : ""
                        }
                        {
                            privilegios.includes("usuarios") ?
                                <>
                                    <li>
                                        <Link to={'/usuarios'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="images-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    USUARIOS
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </> : ""
                        }
                        {
                            privilegios.includes("publicidad") ?
                                <>
                                    <li>
                                        <Link to={'/publicidad'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="images-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    PUBLICIDAD
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                </> : ""
                        }
                                    <li>
                                        <Link to={'/nuevobanner'}>
                                            <div className='sidebar-list'>
                                                <ion-icon name="images-outline"></ion-icon>
                                                <span style={{color: "black"}}>
                                                    BANNER CENTRAL
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                        <li>
                            <Link to={`/cuenta/${userID}`}>
                                <div className='sidebar-list'>
                                    <ion-icon name="cog-outline"></ion-icon>
                                    <span style={{color: "black"}}>
                                        CUENTA
                                    </span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link onClick={logOut}>
                                <div className='sidebar-list'>
                                    <ion-icon name="cog-outline"></ion-icon>
                                    <span style={{color: "black"}}>
                                        SALIR
                                    </span>
                                </div>
                            </Link>
                        </li>
                        {/* <li>
                                <div className='sidebar-list' onClick={logOut}>
                                    <ion-icon name="log-out-outline"></ion-icon>
                                    <span>
                                        SALIR
                                    </span>
                                </div>
                        </li> */}
                        {/* <li>
                    <a href="#">
                        <ion-icon name="bookmark-outline"></ion-icon>
                        <span>Important</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <ion-icon name="alert-circle-outline"></ion-icon>
                        <span>Spam</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <ion-icon name="trash-outline"></ion-icon>
                        <span>Trash</span>
                    </a>
                </li> */}
                    </ul>
                </nav>

                <div>
                    <div className="linea"></div>


                    {/* <div className="modo-oscuro">
                <div className="info">
                    <ion-icon name="moon-outline"></ion-icon>
                    <span>Drak Mode</span>
                </div>
                <div className="switch">
                    <div className="base">
                        <div className="circulo">
                            
                        </div>
                    </div>
                </div>
            </div> */}
                    {/* <div className="usuario">
                        <img src="https://randomuser.me/api/portraits/men/86.jpg" alt="" />
                        <div className="info-usuario">
                            <div className="nombre-email">
                                <span className="nombre">Jhampier</span>
                                <span className="email">jhampier@gmail.com</span>
                            </div>
                            <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                        </div>
                    </div> */}
                </div>

            </div>
        </>
    )
}
