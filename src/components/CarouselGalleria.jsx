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
            setAlbums(resp.data.albums.docs);
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

    useEffect(() => {
        getAlbums();
    }, [])



    return (
        <>
            <div className="container">
                <h1 className="border-section">Galerias</h1>
                    {/* CAROUSEL LG */}
                    <Carousel slide interval={2000} className="mt-4 mb-5 overflow-hidden d-none d-lg-block" style={{ width: "100%", height: "250px" }} prevIcon={false} nextIcon={false} indicators={false}>
                        {dividirAlbumesEnGrupos4(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-sm-3 d-flex flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.fotos[0]} className="w-100" style={{ height: "170px", objectFit: "cover" }} />
                                                 <h5 style={{fontSize: "12px"}} className="mt-2">{album.fecha} </h5>
                                                <h5 className="titulo-galeria mt-2 fw-bold">{album.nombre}</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    
                    <Carousel interval={2000} className="mt-4 mb-5 overflow-hidden d-md-none d-lg-none" style={{ width: "100%", height: "300px" }} prevIcon={false} nextIcon={false} indicators={false}>
                        {dividirAlbumesEnGrupos1(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-12 flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.fotos[0]} className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                                <h5 className="titulo-galeria mt-2 fw-bold">{album.nombre}</h5>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <Carousel interval={2000} className="mt-4 mb-5 overflow-hidden d-none d-md-block d-lg-none" style={{ width: "100%", height: "300px" }} prevIcon={false} nextIcon={false} indicators={false}>
                        {dividirAlbumesEnGrupos3(albums).map((grupoAlbumes, indiceGrupo) => (
                            <Carousel.Item key={indiceGrupo}>
                                <div className="row d-flex">
                                    {grupoAlbumes.map((album, indiceAlbum) => (
                                        <div key={indiceAlbum} className="col-sm-6 d-flex flex-column" style={{ height: "300px" }}>
                                            <Link to={`/album/${album._id}`}>
                                                <img src={album.fotos[0]} className="w-100" style={{ height: "200px", objectFit: "cover" }} />
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
                                        VER MAS
                                        
                                        </span>
                                    </Link>
                                </button>
                            </div>
            </div>

        </>
    )
}

export default CarouselGalleria