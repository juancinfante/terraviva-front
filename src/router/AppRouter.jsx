import { BrowserRouter, Routes, Route } from "react-router-dom";
import Noticias from "../pages/Noticias";
import Home from "../pages/Home";
import Noticia from "../pages/Noticia";
import Entrevistas from "../pages/Entrevistas"
import Galeria from "../pages/Galeria";
import Album from "../pages/Album";
// import Admin from "../pages/admin/Admin";
// import AgregarNoticia from "../pages/admin/AgregarNoticia";
// import EditarNoticia from "../pages/admin/EditarNoticia";
// import NoticiasAdmin from "../pages/admin/Noticias";

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route path="/albums/:limit/:page" element={<Galeria />}/>
                <Route path="/album/:id" element={<Album />}/>
                <Route path="/noticias/:limit/:page" element={<Noticias />}/>
                <Route path="/noticias/:prov/:limit/:page" element={<Noticias />}/>
                <Route path="/noticia/:id" element={<Noticia />}/>
                <Route path="/entrevistas" element={<Entrevistas />}/>
                <Route path="/" element={<Home />}/>
                {/* <Route path="/admin" element={<Admin />}/>
                <Route path="/admin/noticias" element={<NoticiasAdmin />}/>
                <Route path="/admin/agregarnoticia" element={<AgregarNoticia />}/>
                <Route path="/admin/editar/:id" element={<EditarNoticia />}/> */}
            </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter