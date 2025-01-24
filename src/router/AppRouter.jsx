import { BrowserRouter, Routes, Route } from "react-router-dom";
import Noticias from "../pages/Noticias";
import Home from "../pages/Home";
import Noticia from "../pages/Noticia";
import Galeria from "../pages/Galeria";
import Album from "../pages/Album";
import Agenda from "../pages/Agenda";
import Busquedas from "../pages/Busquedas";
import Evento from "../pages/Evento";
import ScrollToTop from "../components/ScrollToTop";

import Login from "../admin/pages/Login";
import HomeAdmin from "../admin/pages/Home";
import Cuenta from "../admin/pages/Cuenta";
import Gallery from "../admin/pages/Gallery";
import AgendaAdmin from "../admin/pages/Agenda";
import NuevaNoticia from "../admin/pages/NuevaNoticia";
import EditarNoticia from "../admin/pages/EditarNoticia";
import Usuarios from "../admin/pages/Usuarios";
import NuevoUsuario from "../admin/pages/NuevoUsuario";
import EditarUsuario from "../admin/pages/EditarUsuario";
import NuevoAlbum from "../admin/pages/NuevoAlbum";
import EditarAlbum from "../admin/pages/EditarAlbum";
import NuevoEvento from "../admin/pages/NuevoEvento";
import EditarEvento from "../admin/pages/EditarEvento";
import NuevaPublicidad from "../admin/pages/NuevaPublicidad";
import Publicidad from "../admin/pages/Publicidad";
import EditarPublicidad from "../admin/pages/EditarPublicidad";
import NuevoBanner from "../admin/pages/NuevoBanner";
import Colaboradores from "../pages/Colaboradores";

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
            <ScrollToTop/>
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
                <Route path="/colaboradores" element={<Colaboradores />}/>
                
                {/* ZONA ADMIN */}
                <Route path="/login" element={<Login />}/>
                <Route path="/admin" element={<HomeAdmin />}/>
                <Route path="/cuenta/:id" element={<Cuenta />}/> 
                <Route path="/galeria" element={<Gallery />}/>
                <Route path="/agenda" element={<AgendaAdmin />}/>
                
                <Route path="/publicidad" element={<Publicidad />}/>
                <Route path="/usuarios" element={<Usuarios />}/>
                
                 <Route path="/nuevanoticia" element={<NuevaNoticia />}/>
                 <Route path="/editarnoticia/:id" element={<EditarNoticia />}/>
                <Route path="/editarnoticia/:id" element={<EditarNoticia />}/>
                <Route path="/nuevousuario" element={<NuevoUsuario />}/>
                <Route path="/editarusuario/:id" element={<EditarUsuario />}/>
                <Route path="/nuevoalbum" element={<NuevoAlbum />}/>
                <Route path="/editaralbum/:id" element={<EditarAlbum />}/>
                <Route path="/nuevoevento" element={<NuevoEvento />}/>
                <Route path="/editarevento/:id" element={<EditarEvento />}/>
                <Route path="/nuevapublicidad" element={<NuevaPublicidad />}/>
                <Route path="/editarpublicidad/:id" element={<EditarPublicidad />}/> 
                <Route path="/nuevobanner" element={<NuevoBanner />}/> 

            </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter