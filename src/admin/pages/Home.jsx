/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar"
import Button from 'react-bootstrap/Button';
import DataTable from "react-data-table-component"
import { useEffect, useState } from 'react';
import api from "../../api/api"

import { Form } from "react-bootstrap";
import swal from "sweetalert";

const Home = () => {


  const [noticias, setNoticias] = useState([]);

  const navigate = useNavigate();
  
  const userID = localStorage.getItem("id");

  const checkUser = async () => {
      if (userID !== undefined) {
          try {
              const resp = await api.get(`api/usuario/${userID}`);
              if(!resp.data.usuario[0].privilegios.includes("noticias")){
                navigate(`/cuenta/${userID}`);
              }
          } catch (error) {
              navigate('/login');
              console.log(error);
          }
      }
  }
  
  
  const obtenerNoticias = async() => {
    try {
      const resp = await api.get('api/noticias/1000/1');
      setNoticias(resp.data.noticias.docs.reverse());
    } catch (error) {
      console.log(error)
    }
  }
  
  function convertirAFormatoCorto(fechaISO) {
    // Parsear la cadena de fecha a un objeto Date
    const fecha = new Date(fechaISO);
  
    // Extraer los componentes de la fecha
    const dia = ('0' + fecha.getDate()).slice(-2); // Asegura 2 dígitos para el día
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Asegura 2 dígitos para el mes
    const año = fecha.getFullYear().toString().slice(-2); // Obtiene los últimos 2 dígitos del año
  
    // Construir la fecha en el formato deseado (dd/mm/aa)
    const fechaFormateada = `${año}-${mes}-${dia}`;
  
    return fechaFormateada;
  }

  function convertirAFormatoConHorarioArgentina(fechaISO) {
    // Crear un objeto Date a partir de la cadena ISO
    const fecha = new Date(fechaISO);
  
    // Formateador para la fecha y hora en la zona horaria de Argentina
    const opciones = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Argentina/Buenos_Aires'
    };
  
    const formateador = new Intl.DateTimeFormat('es-AR', opciones);
    const [
      {value: dia},,
      {value: mes},,
      {value: año},,
      {value: hora},,
      {value: minuto}
    ] = formateador.formatToParts(fecha);
  
    // Construir la fecha y hora en el formato deseado (dd/mm/aa HH:MM)
    const fechaConHorario = `${año}/${mes}/${dia} ${hora}:${minuto}`;
  
    return fechaConHorario;
  }

  function convertirAFormatoConHorario(fechaISO) {
    // Parsear la cadena de fecha a un objeto Date
    const fecha = new Date(fechaISO);
  
    // Extraer los componentes de la fecha
    const dia = ('0' + fecha.getDate()).slice(-2); // Asegura 2 dígitos para el día
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Asegura 2 dígitos para el mes
    const año = fecha.getFullYear().toString().slice(-2); // Obtiene los últimos 2 dígitos del año
  
    // Extraer y formatear las horas y minutos
    const horas = ('0' + fecha.getHours()).slice(-2); // Asegura 2 dígitos para las horas
    const minutos = ('0' + fecha.getMinutes()).slice(-2); // Asegura 2 dígitos para los minutos
  
    // Construir la fecha y hora en el formato deseado (dd/mm/aa HH:MM)
    const fechaConHorario = `${año}/${mes}/${dia} ${horas}:${minutos}`;
  
    return fechaConHorario;
  }
  const data = noticias;

  const columns = [
    {
      name: "Portada",
      selector: row => <img src={row.img_portada} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover'}}/>,
      width: '150px'
    },
    {
      name: "Titulo",
      selector: row => row.titulo,
      width: '150px'
    },
    {
      name: "descripcion",
      selector: row => row.descripcion,
      width: '150px'
    },
    {
      name: "Creado",
      selector: row => formatoFecha(row.created_at),
      width: '200px'
    },
    
    {
      cell:(row) => 
      <Link className='' to={`https://terrraviva.vercel.app/noticia/${row._id}`} target="blank">
        <Button variant="primary">VER</Button>
      </Link>,

    },
    {
      cell:(row) => 
      <Link className='' to={`/editarnoticia/${row._id}`}>
        <Button variant="secondary">EDITAR</Button>
      </Link>,
    },
    {
      cell:(row) =>  <Button variant="danger" onClick={() => handleBorrar(row._id)}>BORRAR</Button>,

    },
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',

  };

  const handleFilter = (e) => {
    if(e.target.value === ""){
      obtenerNoticias()
    }
    const filtroDeBusqueda = data.filter(noticia => {
      
      return noticia.titulo.toLowerCase().includes(e.target.value.toLowerCase())
       || noticia.descripcion.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setNoticias(filtroDeBusqueda);
  }

  function formatoFecha(fecha) {
    const d = new Date(fecha);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    const milliseconds = String(d.getMilliseconds()).padStart(3, '0');
    return `${day}-${month}-${year}`;
  }

  const handleBorrar = async (id) => {
    swal({
      title: "Estas Seguro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async(willDelete) => {
      if (willDelete) {
        try {
            const resp = await api.delete(`api/noticia/${id}`);
        } catch (error) {
          console.log(error)
        }
        location.href="/";
      }
    });
  }

  useEffect(()=> {
    checkUser();
    obtenerNoticias();
  },[])

  return (
    <>
        <Sidebar/>
        <div className="contenedor" style={{backgroundColor: "#242424"}}>
          <div className="search d-flex justify-content-between mb-4">
            <Link to={"/nuevanoticia"} className="col-3">
              <Button variant="primary">
                NUEVA +
              </Button>
            </Link>
            <Form.Control type="text" style={{width: "300px"}} 
                          placeholder="BUSCAR"
                          onChange={handleFilter}/>
          </div>
            <DataTable
                columns={columns}
                data = {data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                dense
                />
        </div>
    </>
  )
}

export default Home