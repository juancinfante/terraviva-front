import { BrowserRouter, Routes, Route } from "react-router-dom";
import Noticias from "../pages/Noticias";
import Home from "../pages/Home";
import Noticia from "../pages/Noticia";
import Galeria from "../pages/Galeria";
import Album from "../pages/Album";
import Agenda from "../pages/Agenda";
import Busquedas from "../pages/Busquedas";
import Evento from "../pages/Evento";


const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route path="/albums/:limit/:page" element={<Galeria />}/>
                <Route path="/evento/:id" element={<Evento />}/>
                <Route path="/album/:id" element={<Album />}/>
                <Route path="/noticias/:limit/:page" element={<Noticias />}/>
                <Route path="/noticias/:prov/:limit/:page" element={<Noticias />}/>
                <Route path="noticias/b/:busq/:limit/:page" element={<Busquedas />}/>
                <Route path="/noticia/:id" element={<Noticia />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/agenda/:limit/:page" element={<Agenda />}/>
                <Route path="/agenda/:prov/:limit/:page" element={<Agenda />}/>
            </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter