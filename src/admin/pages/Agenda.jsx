/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Accordion, Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
import swal from "sweetalert"
import api from "../../api/api"
import { useEffect, useState } from "react"


const Agenda = () => {

  const [eventos, setEventos] = useState([]);

  const data = ordenarPorFecha(eventos);

  const obtenerEventos = async () => {
    try {
      const resp = await api.get('api/eventos/1000/1');
      setEventos(resp.data.eventos.docs.reverse());
    } catch (error) {
      console.log(error)
    }
  }
  function ordenarPorFecha(data) {
    // Función de comparación personalizada para ordenar por fecha
    function compararFechas(a, b) {
      // Convertir las fechas de string a objetos Date
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      
      // Comparar las fechas y devolver el resultado de la comparación
      return fechaA - fechaB;
    }
    
    // Ordenar el arreglo de objetos por fecha utilizando la función de comparación
    data.sort(compararFechas);
    
    return data;
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
          location.href = "/agenda";
        }
      });
  }

  function convertirFecha(fecha) {
    // Dividir la fecha en partes
    const partes = fecha.split('-');
    
    // Reorganizar las partes en el nuevo formato
    const nuevaFecha = partes[2] + '-' + partes[1] + '-' + partes[0];
    
    return nuevaFecha;
  }

  const columns = [
    {
      name: "Flayer",
      selector: row => <img src={row.flayer} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
      width: '150px'
    },
    {
      name: "Titulo",
      selector: row => row.titulo,
      width: '250px'
    },
    {
      name: "Provincia",
      selector: row => row.provincia,
      width: '250px'
    },
    {
      name: "Fecha",
      selector: row => convertirFecha(row.fecha),
      width: '250px'
    },
    {
      cell: (row) =>
        <Link className='' to={`https://terrraviva.netlify.app/evento/${row._id}`} target="blank">
          <Button variant="primary">VER</Button>
        </Link>,

    },
    {
      cell: (row) =>
        <Link className='' to={`/editarevento/${row._id}`}>
          <Button variant="secondary">EDITAR</Button>
        </Link>,
    },
    {
      cell: (row) => <Button variant="danger" onClick={() => handleBorrar(row._id)}>BORRAR</Button>,

    },
  ]
  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',

  };
  const handleFilter = (provincia) => {
    if (provincia === "Todas") {
      obtenerEventos();
    }
    const filtroDeBusqueda = data.filter(evento => {

      return evento.provincia.includes(provincia);
    })
    setEventos(filtroDeBusqueda);
  }
  useEffect(() => {
    obtenerEventos();
  }, [])
  return (
    <>
      <Sidebar />
      <div className="contenedor" style={{ backgroundColor: "#242424", height: "300vh" }}>
        <div className="row">
          <div className="col-6">
            <Link to={"/nuevoevento"} className="col-3">
              <Button variant="primary">
                NUEVO +
              </Button>
            </Link>
          </div>
          <div className="col-6">
            <Accordion className='mb-4' style={{zIndex: "2"}}>
              <Accordion.Item eventKey="0" className="acordion">
                <Accordion.Header className="acordion" style={{ fontWeight: "bold" }}>Provincia</Accordion.Header>
                <Accordion.Body>
                  <ul className='provincias-agenda'>
                    <li onClick={e => handleFilter("Todas")} >
                      Todas
                    </li>
                    <li onClick={e => handleFilter("Santiago del Estero")}>
                      Santiago del Estero
                    </li>
                    <li onClick={e => handleFilter("Tucuman")}>
                      Tucuman
                    </li>
                    <li onClick={e => handleFilter("Catamarca")}>
                      Catamarca
                    </li>
                    <li onClick={e => handleFilter("Salta")}>
                      Salta
                    </li>
                    <li onClick={e => handleFilter("Cordoba")}>
                      Cordoba
                    </li>
                    <li onClick={e => handleFilter("Jujuy")}>
                      Jujuy
                    </li>
                    <li onClick={e => handleFilter("Rosario")}>
                      Rosario
                    </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <DataTable
          className="mt-4"
          columns={columns}
          data={data}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          dense
        />
      </div>
    </>
  )
}

export default Agenda