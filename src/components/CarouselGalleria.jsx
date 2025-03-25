/* eslint-disable no-unused-vars */
import { Carousel } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../css/CarouselGaleria.css'
import api from "../api/api"
import { useEffect, useState } from "react"


const CarouselGalleria = () => {

    const [albums, setAlbums] = useState([]);

    const getAlbums = async () => {
        try {
            const resp = await api.get('api/albums/12/1');
            const albunes = resp.data.albums.docs;
            setAlbums(albunes.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)))
        } catch (error) {
            console.log(error)
        }
        
    }
    // Función para dividir el array en trozos de tamaño 4
    const dividirAlbumesEnGrupos4 = (albumes) => {
        let grupos = [];
        for (let i = 0; i < albumes.length; i += 4) {
            grupos.push(albumes.slice(i, i + 4));
        }
        return grupos;
    };
    const dividirAlbumesEnGrupos3 = (albumes) => {
        let grupos = [];
        for (let i = 0; i < albumes.length; i += 3) {
            grupos.push(albumes.slice(i, i + 3));
        }
        return grupos;
    };
    const dividirAlbumesEnGrupos1 = (albumes) => {
        let grupos = [];
        for (let i = 0; i < albumes.length; i += 1) {
            grupos.push(albumes.slice(i, i + 1));
        }
        return grupos;
    };

    function formatDate(fecha) {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

        const date = new Date(fecha);

        const dayOfWeek = days[date.getDay()];
        const dayOfMonth = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${dayOfWeek} ${dayOfMonth} de ${month} del ${year}`;
    }

    useEffect(() => {
        getAlbums();
    }, [])



    return (
        <>
            <div className="container">
                <h1 className="border-section">Galerías</h1>
                    {/* CAROUSEL LG */}
                    <Carousel slide interval={1500} className="mt-4 mb-5 overflow-hidden d-none d-lg-block" style={{ width: "100%", height: "250px" }} indicators={false}>
                        {dividirAlbumesEnGrupos4(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-sm-3 d-flex flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.portada} className="w-100" style={{ height: "170px", objectFit: "cover" }} />
                                                 <h5 style={{fontSize: "12px"}} className="mt-2">{formatDate(album.fecha)} </h5>
                                                <h5 className="titulo-galeria mt-2 fw-bold">{album.nombre}</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    
                    <Carousel interval={1500} className="mt-4 mb-5 overflow-hidden d-md-none d-lg-none" style={{ width: "100%", height: "300px" }} indicators={false}>
                        {dividirAlbumesEnGrupos1(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-12 flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.portada} className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                                <h5 className="titulo-galeria mt-2 fw-bold">{album.nombre}</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Carousel interval={1500} className="mt-4 mb-5 overflow-hidden d-none d-md-block d-lg-none" style={{ width: "100%", height: "300px" }} indicators={false}>
                        {dividirAlbumesEnGrupos3(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-sm-6 d-flex flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.portada} className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                                <h5 className="titulo-galeria mt-2 fw-bold">{album.nombre}</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="vermas w-100 d-flex justify-content-center">
                                <button>
                                    <Link className="p-3" to="/albums/9/1">
                                        <span style={{color: "white", fontWeight: "bold"}}>
                                        VER MÁS
                                        
                                        </span>
                                    </Link>
                                </button>
                            </div>
            </div>

        </>
    )
}

export default CarouselGalleria