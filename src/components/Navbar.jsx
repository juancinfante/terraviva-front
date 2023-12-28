import { useState } from "react"
import '../css/navbar.css';
const Navbar = () => {

    const [active, setActive] = useState('');
    const [activeDd, setActiveDp] = useState('');
    const handleActive = () => {
        if(active){
            setActive('')
        }else{
            setActive(true)
        }
    }
    const handleActiveDp = () => {
        if(activeDd){
            setActiveDp('')
        }else{
            setActiveDp(true)
        }
    }
    return (
    <>
        <header className={active ? "active" : ""}>
            <a href="#" className="logo">Terraviva.com.ar</a>
        <div className="menuToggle" onClick={handleActive}></div>
            <nav>
                <ul>
                    <li><a href="#">Noticias</a></li>
                    <li><a href="#" onClick={handleActiveDp}>Pais<b>+</b></a>
                        <ul className={activeDd ? "display-none" : ""}>
                            <li><a href="#">Santiago</a></li>
                            <li><a href="#">Tucuman</a></li>
                            <li><a href="#">Salta</a></li>
                            <li><a href="#">Jujuy</a></li>
                            <li><a href="#">Catamarca</a></li>
                            <li><a href="#">Santa fe</a></li>
                            
                        </ul>
                    </li>
                    <li><a href="#">Agenda</a></li>
                    <li><a href="#">Entrevistas</a></li>
                    <li><a href="#">Artistas</a></li>
                    {/* <li><input type="search" />Buscar</li> */}
                </ul>
            </nav>
        </header>
        <div className="shadow"></div>
    </>
    )
}

export default Navbar