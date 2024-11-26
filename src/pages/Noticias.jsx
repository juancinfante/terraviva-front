import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Breadcrumb } from "react-bootstrap"
import "../css/noticias.css"
import { Link, useParams } from "react-router-dom"
import api from "../api/api";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import Redes from "../components/Redes";



const Noticias = () => {

    const [noticias, setNoticias] = useState([]);
    const [data, setData] = useState([]);
    const [publis, setPublis] = useState([]);

    const params = useParams();

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesNoticias = publis.filter(publicidad => publicidad.colocar_en[0].noticias >= 1 && publicidad.colocar_en[0].noticias <= 8);
    // Ordenar las publicidades filtradas por su número de inicio
    publicidadesNoticias.sort((a, b) => a.colocar_en[0].noticias - b.colocar_en[0].noticias);

    const getNoticias = async () => {
        if (params.prov !== undefined) {
            const resp = await api.get(`api/noticias/${params.prov}/${params.limit}/${params.page}`);
            setNoticias(resp.data.docs)
            setData(resp.data);
        } else {
            const resp = await api.get(`api/noticias/${params.limit}/${params.page}`);
            setNoticias(resp.data.noticias.docs)
            setData(resp.data.noticias)
        }
    }
    const getPubli = async () => {
        try {
            const resp = await api.get('api/publis');
            setPublis(resp.data.publis)
        } catch (error) {
            console.log(error)
        }
    }
    function fechaPasada(fecha) {
        // Convertir la fecha pasada como string a un objeto Date
        const partesFecha = fecha.split('-');
        const fechaComparar = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]); // Formato: Año, Mes (0-11), Día

        // Obtener la fecha actual
        const hoy = new Date();

        // Comparar las fechas
        if (fechaComparar > hoy) {
            return true; // La fecha ya pasó
        } else {
            return false; // La fecha aún no ha pasado
        }
    }

    useEffect(() => {
        getNoticias();
        getPubli();
    }, [])

    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    {
                        params.prov ?
                            <>
                                <Breadcrumb.Item href="/noticias/10/1">
                                    Noticias
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    {params.prov}
                                </Breadcrumb.Item>
                            </> :
                            <>
                                <Breadcrumb.Item active>
                                    Noticias
                                </Breadcrumb.Item>
                            </>
                    }
                </Breadcrumb>
            </div>
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-md-8 col-lg-9 d-flex flex-column gap-3 mas-noticias">
                        {
                            params.prov ?
                                <h1 className="border-section mb-4">{params.prov}</h1> :
                                <h1 className="border-section mb-4">Más noticias</h1>
                        }
                        {
                            noticias.length == 0 ?
                            <>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-4">
                                        <Link to={`/noticia/`}>
                                            {/* <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg" alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} /> */}
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                                className="w-100" style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-8">
                                        <Link to={`/noticia/`}>
                                            <div className="d-flex flex-column justify-content-between">
                                                <h5 className="fs-4 mt-2"><Skeleton/></h5>
                                                <p className="elipsis"><Skeleton/></p>
                                                <p className="elipsis"><Skeleton/></p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-4">
                                        <Link to={`/noticia/`}>
                                            {/* <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg" alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} /> */}
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                                className="w-100" style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-8">
                                        <Link to={`/noticia/`}>
                                            <div className="d-flex flex-column justify-content-between">
                                                <h5 className="fs-4 mt-2"><Skeleton/></h5>
                                                <p className="elipsis"><Skeleton/></p>
                                                <p className="elipsis"><Skeleton/></p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-lg-4">
                                        <Link to={`/noticia/`}>
                                            {/* <img src="https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg" alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} /> */}
                                            <img
                                                src={noticias}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null;
                                                    currentTarget.src = "https://res.cloudinary.com/dwjhbrsmf/image/upload/v1713281326/terraviva/dummy_j0enwk.jpg";
                                                }}
                                                className="w-100" style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-12 col-sm-6 col-lg-8">
                                        <Link to={`/noticia/`}>
                                            <div className="d-flex flex-column justify-content-between">
                                                <h5 className="fs-4 mt-2"><Skeleton/></h5>
                                                <p className="elipsis"><Skeleton/></p>
                                                <p className="elipsis"><Skeleton/></p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </>
                                :

                                noticias.map((element, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <Link to={`/noticia/${element._id}`}>
                                                <img src={element.img_portada} alt="" className="w-100" style={{ height: "200px", objectFit: "cover" }} />
                                            </Link>
                                        </div>
                                        <div className="col-12 col-sm-6 col-lg-8">
                                            {/* <div className="category-post">{element.provincia} </div> */}
                                            <Link to={`/noticia/${element._id}`}>
                                                <div className="d-flex flex-column justify-content-between">
                                                    {/* <p style={{fontSize: "14px", color: "black"}} className="mt-2 mb-2">{convertirFecha(element.created_at)}</p> */}
                                                    <h5 className="fs-4 mt-2">{element.titulo}</h5>
                                                    <p className="elipsis">{element.descripcion}</p>
                                                    {/* <p>Maecenas accumsan tortor ut velit pharetra mollis. Proin eu nisl et arcu iaculis placerat sollicitudin ut est. In fringilla dui dui.</p> */}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>

                                ))
                        }
                        <ul className="paginationn">

                            {
                                params.prov == undefined ? (data.hasPrevPage ?
                                    <a href={`/noticias/${params.limit}/${parseInt(params.page) - 1}`}>
                                        <li>
                                            «
                                        </li>
                                    </a> :
                                    <a className="disabled-pagination">
                                        <li>
                                            «
                                        </li>
                                    </a>) :
                                    data.hasPrevPage ?
                                        <a href={`/noticias/${params.prov}/${params.limit}/${parseInt(params.page) - 1}`}>
                                            <li>
                                                «
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                «
                                            </li>
                                        </a>
                            }
                            <a className="activa">
                                <li>
                                    {data.page}
                                </li>
                            </a>
                            {
                                params.prov == undefined ? (data.hasNextPage ?
                                    <a href={`/noticias/${params.limit}/${parseInt(params.page) + 1}`}>
                                        <li>
                                            »
                                        </li>
                                    </a> :
                                    <a className="disabled-pagination">
                                        <li>
                                            »
                                        </li>
                                    </a>) :
                                    data.hasNextPage ?
                                        <a href={`/noticias/${params.prov}/${params.limit}/${parseInt(params.page) + 1}`}>
                                            <li>
                                                »
                                            </li>
                                        </a> :
                                        <a className="disabled-pagination">
                                            <li>
                                                »
                                            </li>
                                        </a>
                            }
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 col-lg-3 pt-5">
                        <div className="row gap-3 pt-5">
                        {
                                publicidadesNoticias.map((element, index) => (
                                    fechaPasada(element.egreso) && (
                                        <div className="col-12" key={index}>
                                            <a href={element.link} target='blank'>
                                                <img src={element.foto} alt="" style={{ width: "100%", objectFit: "cover" }} />
                                            </a>
                                        </div>)
                                ))
                            }
                        </div>
                        <Redes />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Noticias