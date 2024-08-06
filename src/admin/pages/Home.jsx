/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar"
import Button from 'react-bootstrap/Button';
import DataTable from "react-data-table-component"
import { useEffect, useState } from 'react';
import api from "../../api/api"

import { Accordion, Form } from "react-bootstrap";
import swal from "sweetalert";

const Home = () => {


  const [noticias, setNoticias] = useState([]);
  const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();

  const userID = localStorage.getItem("id");

    const checkUser = async () => {
        if (userID !== undefined) {
            try {
                const resp = await api.get(`api/usuario/${userID}`);
                setUsuario(resp.data.usuario[0]);
            } catch (error) {
                navigate('/login');
                console.log(error);
            }
        }
    }


  const obtenerNoticias = async () => {
    try {
      const resp = await api.get('api/noticias/60/1');
      setNoticias(resp.data.noticias.docs);
    } catch (error) {
      console.log(error)
    }
  }

  const data = noticias;

  const columns = [
    {
      name: "Portada",
      selector: row => <img src={row.img_portada} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />,
      width: '150px'
    },
    {
      name: "Titulo",
      selector: row => row.titulo,
      width: '150px'
    },
    {
      name: "autor",
      selector: row => row.editor,
      width: '150px'
    },
    {
      name: "provincia",
      selector: row => row.provincia,
      width: '150px'
    },
    {
      name: "Creado",
      selector: row => formatoFecha(row.created_at),
      width: '200px'
    },

    {
      cell: (row) =>
        <Link className='' to={`https://terraviva.com.ar/noticia/${row._id}`} target="blank">
          <Button variant="primary">VER</Button>
        </Link>,

    },
    {
      cell: (row) =>
        <Link className='' to={`/editarnoticia/${row._id}`}>
          <Button variant="secondary">EDITAR</Button>
        </Link>,
    },
    {
      cell: (row) => userID === "6622f7958172b1c073834907" ? <Button variant="danger" onClick={() => handleBorrar(row._id)}>BORRAR</Button> : ""
    },
  ]

  const paginationComponentOptions = {
    rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',

  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
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
      .then(async (willDelete) => {
        if (willDelete) {
          try {
            const resp = await api.delete(`api/noticia/${id}`);
          } catch (error) {
            console.log(error)
          }
          location.href = "/admin";
        }
      });
  }

  useEffect(() => {
    obtenerNoticias();
    checkUser();
  }, [])

  return (
    <>
      <Sidebar />
      <div className="contenedor" style={{ backgroundColor: "#242424" }}>
        <div className="search d-flex justify-content-between mb-4">
          <Link to={"/nuevanoticia"} className="col-3">
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

export default Home