import { Breadcrumb, Accordion } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import '../css/agenda.css'
import api from '../api/api';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Redes from '../components/Redes';

const Agenda = () => {

    const params = useParams();
    const [eventos, setEventos] = useState([]);
    const [publis, setPublis] = useState([]);
    const [data, setData] = useState([]);

    // Filtrar las publicidades que tengan 'inicio'
    const publicidadesAgenda = publis.filter(publicidad => publicidad.colocar_en[0].agenda >= 1 && publicidad.colocar_en[0].agenda <= 8);

    // Ordenar las publicidades filtradas por su número de inicio
    publicidadesAgenda.sort((a, b) => a.colocar_en[0].agenda - b.colocar_en[0].agenda);

    const getEventos = async () => {
        try {
            if (params.prov == undefined) {
                const resp = await api.get(`api/eventos/${params.limit}/${params.page}`);
                setEventos(resp.data.eventos.docs);
                setData(resp.data.eventos);
            } else {
                const resp = await api.get(`api/eventos/${params.prov}/${params.limit}/${params.page}`);
                setEventos(resp.data.docs);
                setData(resp.data);
            }
        } catch (error) {
            console.log(error);
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
    function obtenerFechaFormateadaDia(fechaStr) {
        // Dividir la fecha en partes
        const partes = fechaStr.split('-');

        // Obtener el día, mes y año
        const dia = partes[2];

        const fechaFormateada = `${dia}`;

        return fechaFormateada;
    }
    function obtenerFechaFormateadaMes(fechaStr) {
        // Dividir la fecha en partes
        const partes = fechaStr.split('-');

        // Obtener el día, mes y año
        const mes = partes[1];

        // Meses en texto
        const mesesTexto = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        // Obtener el mes en texto
        const mesTexto = mesesTexto[parseInt(mes, 10) - 1];

        // Construir la fecha formateada
        const fechaFormateada = `${mesTexto}`;

        return fechaFormateada;
    }

    useEffect(() => {
        getEventos();
        getPubli();
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Inicio</Breadcrumb.Item>
                    <Breadcrumb.Item href="/agenda/9/1">
                        Agenda
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className="row ">
                    <div className="col-12 col-lg-9">

                        {
                            params.prov !== undefined ?
                                <h1 className="border-section mb-4">Agenda: {params.prov} </h1>
                                :
                                <h1 className="border-section mb-4">Agenda: Proximos eventos </h1>
                        }
                        <Accordion className='mb-4'>
                            <Accordion.Item eventKey="0" className="acordion">
                                {
                                    params.prov !== undefined ?
                                        <Accordion.Header className="acordion">{params.prov}</Accordion.Header>

                                        :
                                        <Accordion.Header className="acordion" style={{ fontWeight: "bold" }}>Todas</Accordion.Header>

                                }
                                <Accordion.Body>
                                    <ul className='provincias-agenda'>
                                        <li>
                                            <a href="/agenda/12/1">Todas</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Buenos aires/12/1">Buenos Aires</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Capital Federal/12/1">Capital Federal</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Catamarca/12/1">Catamarca</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Cordoba/12/1">Cordoba</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/La Rioja/12/1">La Rioja</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Salta/12/1">Salta</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Santa Fe/12/1">Santa Fe</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Santiago del Estero/12/1">Santiago del Estero</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Tucuman/12/1">Tucuman</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Jujuy/12/1">Jujuy</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Chaco/12/1">Chaco</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Chubut/12/1">Chubut</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Corrientes/12/1">Corrientes</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Entre Rios/12/1">Entre Rios</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Formosa/12/1">Formosa</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/La Pampa/12/1">La Pampa</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Mendoza/12/1">Mendoza</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Misiones/12/1">Misiones</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Neuquen/12/1">Neuquen</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Rio Negro/12/1">Rio Negro</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/San Juan/12/1">San Juan</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/San Luis/12/1">San Luis</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Santa Cruz/12/1">Santa Cruz</a>
                                        </li>
                                        <li>
                                            <a href="/agenda/Tierra del Fuego/12/1">Tierra del Fuego</a>
                                        </li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <div className="row">
                            {
                                eventos.length == 0 ?
                                    <h1 className="text-center mt-5 mb-5">NO HAY EVENTOS PROXIMOS</h1>
                                    :
                                    ""
                            }
                            {
                                eventos.map((element, index) => (
                                     (
                                        <div className="col-12 col-sm-6 col-xl-4 mb-4" key={index}>
                                            <div className="agenda-flayer2">
                                                <img src={element.flayer} alt="" style={{ objectFit: "cover" }} />
                                                <div className="info d-flex justify-content-around">
                                                    <div className="col-3">
                                                        <p>{obtenerFechaFormateadaDia(element.fecha)}</p>
                                                        <p>{obtenerFechaFormateadaMes(element.fecha)}</p>
                                                    </div>
                                                    <div className="lugar-evento col-6">
                                                        <p>{element.provincia}</p>
                                                        {/* <p>{element.horario +"Hs"}</p> */}
                                                    </div>
                                                    <div className="col-3">
                                                        <a href={`/evento/${element._id}`}>+ INFO</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                ))
                            }
                            <ul className="paginationn">

                                {
                                    params.prov == undefined ? (data.hasPrevPage ?
                                        <a href={`/agenda/${params.limit}/${parseInt(params.page) - 1}`}>
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
                                            <a href={`/agenda/${params.prov}/${params.limit}/${parseInt(params.page) - 1}`}>
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
                                        <a href={`/agenda/${params.limit}/${parseInt(params.page) + 1}`}>
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
                                            <a href={`/agenda/${params.prov}/${params.limit}/${parseInt(params.page) + 1}`}>
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
                    </div>
                    <div className="col-12 col-lg-3 pt-5">
                        <div className="row gap-3 pt-5">
                            {
                                publicidadesAgenda.map((element, index) => (
                                  (
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

export default Agenda