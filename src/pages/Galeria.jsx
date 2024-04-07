import { Breadcrumb } from "react-bootstrap"
import Navbar from "../components/Navbar"
import '../css/galeria.css';
import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

const Galeria = () => {

    const [albums, setAlbums] = useState([]);
    const [data, setData] = useState([]);

    const params = useParams();

    const getAlbums = async () => {
        try {
            const resp = await api.get(`api/albums/${params.limit}/${params.page}`);
            setAlbums(resp.data.albums.docs);
            setData(resp.data.albums);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAlbums();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        Galeria
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="border-section mb-4">Galerias</h1>
                <div className="row">
                    {
                        albums.map((element, index) => (
                            <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                                <a href={`/album/${element._id}`}>
                                    <div className="album-container">
                                        <img src={element.fotos[0]} alt="" />
                                        <div className="info-album">
                                            <h2>{element.nombre}</h2>
                                            <p>{element.fecha}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))
                    }
                    <div>
                        <ul className="paginationn">
                            {
                                data.hasPrevPage ? 
                                <a href={`/albums/${params.limit}/${data.prevPage}`}>
                                <li>
                                    «
                                </li>
                            </a>
                            : <a className="disabled-pagination">
                                <li>
                                    «
                                </li>
                            </a>
                            }
                            {
                             <a className="activa">
                                <li>
                                {data.page}
                                </li>
                                </a>
                            }
                            {
                                 data.hasNextPage ?
                                 <a href={`/albums/${params.limit}/${data.nextPage}`}>
                                 <li>
                                 »
                                 </li>
                             </a>
                             : <a className="disabled-pagination">
                                 <li>
                                 »
                                 </li>
                             </a> 
                            }
                            
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>                        
        </>
    )
}

export default Galeria