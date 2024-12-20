/* eslint-disable no-unused-vars */
import { Carousel } from "react-bootstrap"
import '../css/NewBanner.css'
import { Link } from "react-router-dom"
import api from '../api/api';
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const NewBanner = () => {

    const [noticias, setNoticias] = useState([]);

    const getNoticias = async () => {
        try {
            const resp = await api.get('api/noticias/5/1');
            setNoticias(resp.data.docs);
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
                        <Carousel className="overflow-hidden" slide interval={1500} indicators={false}>
                            {
                                noticias.length != 0 ?
                                    noticias.slice(0, 3).map((element, index) => (
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
                                    )) :
                                    <Carousel.Item>
                                        <div className="carousel-portada">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                            />
                                        </div>
                                    </Carousel.Item>
                            }
                        </Carousel>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="row gap-4">
                            {
                                noticias.length != 0 ? noticias.slice(3, 5).map((element, index) => (
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
                                )) :
                                <>
                                    <div className="col-12" style={{ height: "49%" }}>
                                            <div className="sidebar-portada">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                                />
                                            </div>
                                    </div>
                                    <div className="col-12" style={{ height: "49%" }}>
                                            <div className="sidebar-portada">
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                                />
                                            </div>
                                    </div>
                                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewBanner