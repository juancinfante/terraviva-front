/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Button, Form } from "react-bootstrap"
import api from "../../api/api"

import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import swal from "sweetalert"

const Gallery = () => {

  const [albums, setAlbums] = useState([]);

  const obtenerAlbums = async () => {
    try {
      const resp = await api.get('api/albums/9999999/1');
      setAlbums(resp.data.albums.docs);
    } catch (error) {
      console.log(error)
    }
  }

  const data = albums;

  const columns = [
    {
      name: "Portada",
      selector: row => <img src={row.fotos[0]} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
      width: '150px'
    },
    {
      name: "Nombre",
      selector: row => row.nombre,
      width: '150px'
    },
    {
      name: "PH",
      selector: row => row.ph,
      // selector: row => row.created_at,
      width: '200px'
    },
    {
      name: "Creado",
      //   selector: row => row.ph,
      selector: row => formatoFecha(row.created_at),
      width: '200px'
    },

    {
      cell: (row) =>
        <Link className='' to={`https://terrraviva.netlify.app/album/${row._id}`} target="blank">
          <Button variant="primary">VER</Button>
        </Link>,

    },
    {
      cell: (row) =>
        <Link className='' to={`/editaralbum/${row._id}`}>
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
            const resp = await api.delete(`api/album/${id}`);
          } catch (error) {
            console.log(error)
          }
          location.href = "/galeria";
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

  const handleFilter = (e) => {
    if (e.target.value === "") {
      obtenerAlbums()
    }
    const filtroDeBusqueda = data.filter(albums => {

      return albums.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        || albums.ph.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setAlbums(filtroDeBusqueda);
  }

  const navigate = useNavigate();
  const userID = localStorage.getItem("id");

  const checkUser = async () => {
      if (userID !== undefined) {
          try {
              const resp = await api.get(`api/usuario/${userID}`);
              if(!resp.data.usuario[0].privilegios.includes("galeria")){
                navigate("/");
              }
          } catch (error) {
              navigate('/login');
              console.log(error);
          }
      }
  }
  useEffect(() => {
    checkUser();
    obtenerAlbums();
  }, [])
  return (
    <>
      <Sidebar />
      <div className="contenedor" style={{backgroundColor: "#242424"}}>
        <div className="search d-flex justify-content-between mb-4">
          <Link to={"/nuevoalbum"} className="col-3">
            <Button variant="primary">
              NUEVA +
            </Button>
          </Link>
          <Form.Control type="text" style={{ width: "300px" }}
            placeholder="BUSCAR"
            onChange={handleFilter} />
        </div>
        <DataTable
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

export default Gallery