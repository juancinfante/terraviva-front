import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import api from "../api/api";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Footer from "../components/Footer";

const Album = () => {

    const [fotos, setFotos] = useState([]);
    const [album, setAlbum] = useState([]);


    const params = useParams();

    const getAlbum = async () => {
        try {
            const resp = await api.get(`api/album/${params.id}`);
            setFotos(resp.data.album[0].fotos);
            setAlbum(resp.data.album[0]);
        } catch (error) {
            console.log(error)
        }
    }

    const generarArregloConFotos = (urls) => {
        const images = [];
        urls.forEach(url => {
            const imagen = {
                original: url,
                thumbnail: url
            };
            images.push(imagen);
        });
        return images;
    }

    useEffect(() => {
        getAlbum();

    }, [])

    return (
        <>
            <Navbar />
            <div className="container mb-5">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Album
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border-section mb-4">Album</h1>
                <div className="d-flex flex-column mb-4">
                    <h1>{album.nombre}</h1>
                    <p>{album.fecha}</p>
                </div>
                <div className="w-100">
                    <ReactImageGallery items={generarArregloConFotos(fotos)} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Album