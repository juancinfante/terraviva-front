/* eslint-disable no-unused-vars */
import { Carousel } from "react-bootstrap"
import '../css/NewBanner.css'
import { Link } from "react-router-dom"
import api from '../api/api';
import { useEffect, useState } from "react";

const NewBanner = () => {

    const [noticias, setNoticias] = useState([]);

    const getNoticias = async () => {
        try {
            const resp = await api.get('/api/noticias/10/1');
            setNoticias(resp.data.noticias.docs);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getNoticias();
    }, [])
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 mb-3 mb-md-0">
                        <Carousel className="overflow-hidden" slide interval={3000} prevIcon={false} nextIcon={false} indicators={false}>
                            {noticias.slice(0, 3).map((element, index) => (
                                <Carousel.Item key={index}>
                                    <Link to={`/noticia/${element._id}`}>
                                        <div className="carousel-portada">
                                            <img src={element.img_portada} alt="" />
                                            <div className="info">
                                                <div className="category-post">
                                                    {element.provincia}
                                                </div>
                                                <div className="post-title">
                                                    <h2>
                                                        {element.titulo}
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row gap-4">
                            {
                                noticias.slice(3,5).map((element, index) => (
                                    <div className="col-12" style={{ height: "49%" }} key={index}>
                                        <a href={`/noticia/${element._id}`}>
                                            <div className="sidebar-portada">
                                                <img src={element.img_portada} alt="" />
                                                <div className="info">
                                                    <div className="category-post">
                                                    {element.provincia}
                                                    </div>
                                                    <div className="post-title">
                                                        <h2>
                                                        {element.titulo}
                                                        </h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBanner