/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Button, Form } from "react-bootstrap"
import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import api from "../../api/api"

import swal from "sweetalert"

const Usuarios = () => {

  const navigate = useNavigate();
  

    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = async () => {
        try {
            const resp = await api.get('api/usuarios');
            setUsuarios(resp.data.usuarios);
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
                const resp = await api.delete(`api/usuario/${id}`);
            } catch (error) {
              console.log(error)
            }
            location.href="/usuarios";
          }
        });
      }
      function eliminarObjetoPorNombre(arreglo, nombre) {
        // Busca el índice del objeto con el nombre proporcionado
        const indice = arreglo.findIndex(objeto => objeto.nombre === nombre);
        
        // Si se encuentra el objeto, elimínalo del arreglo
        if (indice !== -1) {
          arreglo.splice(indice, 1);
        }
        
        // Retorna el arreglo modificado
        return arreglo;
      }


    const data = eliminarObjetoPorNombre(usuarios, localStorage.getItem("Nombre"));
    const columns = [
        {
            name: "Foto",
            selector: row => <img src={row.foto} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover'}}/>,
            width: '150px'
          },
        {
          name: "Nombre",
          selector: row => row.nombre,
          width: '150px'
        },
        {
          name: "Apellido",
          selector: row => row.apellido,
          width: '150px'
        },
        {
          name: "Usuario",
          selector: row => row.username,
          width: '150px'
        },
        {
          name: "email",
          selector: row => row.email,
          width: '200px'
        },
        {
          name: "Privilegios",
          selector: row => row.privilegios + " ",
          width: '200px'
        },
        {
          cell:(row) => 
          <Link className='' to={`/editarusuario/${row._id}`}>
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
        selectAllRowsItemText: 'Todos'
    
      };

    useEffect(() => {
        obtenerUsuarios();
    },[])

  return (
    <>
        <Sidebar/>
        <div className="contenedor" style={{backgroundColor: "#242424" , height: "100vh"}}>
          <div className="search d-flex justify-content-between mb-4">
            <Link to={"/nuevousuario"}>
              <Button variant="primary">
                Agregar usuario
              </Button>
            </Link>
            {/* <Form.Control type="text" style={{width: "300px"}} 
                          placeholder="BUSCAR"
                          onChange={handleFilter}/> */}
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

export default Usuarios