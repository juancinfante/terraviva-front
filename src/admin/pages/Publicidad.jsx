/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Button } from "react-bootstrap"
import DataTable from "react-data-table-component"
import { useEffect, useState } from "react"
import api from "../../api/api"

import swal from "sweetalert"

const Publicidad = () => {

    const [publis, setPublis] = useState([]);

    const obtenerPublis = async () => {
        try {
            const resp = await api.get('api/publis');
            setPublis(resp.data.publis.reverse());
        } catch (error) {
            console.log(error)
        }
    }

    
    const data = publis;

    const columns = [
      {
        name: "Publicidad",
        selector: row => <img src={row.foto} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover'}}/>,
        width: '150px'
      },
      {
        name: "Cliente",
        selector: row => row.nombre_cliente,
        width: '150px'
      },
      {
        name: "Ingreso",
        selector: row => cambiarFormatoFecha(row.ingreso),
        width: '150px'
      },
      {
        name: "Egreso",
        selector: row => cambiarFormatoFecha(row.egreso),
        width: '200px'
      },
      {
        name: "Aparece en",
        selector: row => row.colocar_en + " ",
        width: '200px'
      },
      {
        name: "Link",
        selector: row => <a href={row.link}>{row.link}</a>,
        width: '200px'
      },
      {
        cell:(row) => 
        <Link className='' to={`/editarpublicidad/${row._id}`}>
          <Button variant="secondary">EDITAR</Button>
        </Link>,
      },
      {
        cell:(row) =>  <Button variant="danger" onClick={() => handleBorrar(row._id) }>BORRAR</Button>,
  
      },
    ]
  
    const paginationComponentOptions = {
      rowsPerPageText: 'Filas por página',
      rangeSeparatorText: 'de',
      selectAllRowsItem: true,
      selectAllRowsItemText: 'Todos',
  
    };
    function cambiarFormatoFecha(fecha) {
        // Analizar la cadena de fecha en el formato yyyy-mm-dd
        var partesFecha = fecha.split('-');
        var fechaObjeto = new Date(partesFecha[0], partesFecha[1] - 1, partesFecha[2]);
    
        // Extraer día, mes y año
        var dia = fechaObjeto.getDate();
        var mes = fechaObjeto.getMonth() + 1;
        var año = fechaObjeto.getFullYear();
    
        // Formatear según el formato deseado: dd-mm-yyyy
        var fechaFormateada = dia + '-' + mes + '-' + año;
    
        return fechaFormateada;
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
                const resp = await api.delete(`api/publi/${id}`);
            } catch (error) {
              console.log(error)
            }
            location.href="/publicidad";
          }
        });
      }

    useEffect(() => {
        obtenerPublis();
    },[])


    return (
        <>
            <Sidebar />
            <div className="contenedor" style={{backgroundColor: "#242424", height: "100vh"}}>
                <Link to={"/nuevapublicidad"} className="col-3">
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

export default Publicidad