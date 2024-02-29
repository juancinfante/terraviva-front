import { BrowserRouter, Routes, Route } from "react-router-dom";
import Noticias from "../pages/Noticias";
import Home from "../pages/Home";
import Noticia from "../pages/Noticia";
import Entrevistas from "../pages/Entrevistas"

const AppRouter = () => {
  return (
    <>
    <BrowserRouter>
            <Routes>
                <Route path="/noticias" element={<Noticias />}/>
                <Route path="/noticia" element={<Noticia />}/>
                <Route path="/entrevistas" element={<Entrevistas />}/>
                <Route path="/" element={<Home />}/>
            </Routes>
    </BrowserRouter>
    </>
  )
}

export default AppRouter