/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
import swal from "sweetalert"
import api from "../../api/api"
import { useEffect, useState } from "react"


const Agenda = () => {

  const [eventos, setEventos] = useState([]);

  const data = eventos;

  const obtenerEventos = async() => {
    try {
      const resp = await api.get('api/eventos/1000/1');
      setEventos(resp.data.eventos.docs.reverse());
    } catch (error) {
      console.log(error)
    }
  }

  const handleBorrar = async (id) => {
    swal({
      title: "Estas Seguro?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
            const resp = await api.delete(`api/evento/${id}`);
            console.log(resp)
        } catch (error) {
          console.log(error)
        }
        location.href="/agenda";
      }
    });
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

  const columns = [
    {
      name: "Flayer",
      selector: row => <img src={row.flayer} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover'}}/>,
      width: '150px'
    },
    {
      name: "Titulo",
      selector: row => row.titulo,
      width: '150px'
    },
    {
      name: "Creado",
      selector: row => formatoFecha(row.created_at),
      width: '200px'
    },
    
    {
      cell:(row) => 
      <Link className='' to={`https://terrraviva.netlify.app/evento/${row._id}`} target="blank">
        <Button variant="primary">VER</Button>
      </Link>,

    },
    {
      cell:(row) => 
      <Link className='' to={`/editarevento/${row._id}`}>
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

  useEffect(() => {
    obtenerEventos();
  },[])
  return (
    <>
      <Sidebar />
      <div className="contenedor" style={{backgroundColor: "#242424"}}>
        <Link to={"/nuevoevento"} className="col-3">
          <Button variant="primary">
            NUEVO +
          </Button>
        </Link>
        <DataTable
                className="mt-4"
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

export default Agenda