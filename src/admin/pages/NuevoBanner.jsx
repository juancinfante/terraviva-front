/* eslint-disable no-unused-vars */
import api from "../../api/api";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import "../css/nuevoBanner.css"; // Asegúrate de tener este archivo CSS

const NuevoBanner = () => {
  const [imagenes, setImagenes] = useState([]);
  const [banners, setBanners] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [imagen, setImagen] = useState(null); // Imagen para pantalla completa
  const [bannerFull, setBannerFull] = useState(null);
  const [bannerMobile, setBannerMobile] = useState(null);
  const [linkEvento, setLinkEvento] = useState("");

  const folder = "banners"; // Carpeta en Cloudinary
  const bannerId = "67559d3b65e8f7b19bb717ff";

  const obtenerImagenes = async () => {
    try {
      setCargando(true);
      const response = await api.get(`api/getimages/${folder}`); // Usamos api.get
      setImagenes(response.data); // Suponiendo que el backend retorna las imágenes en 'data'
    } catch (error) {
      console.error("Error al obtener imágenes:", error);
    } finally {
      setCargando(false);
    }
  };

  const obtenerBanners = async () => {
    try {
      setCargando(true); // Indicamos que estamos cargando
      const response = await api.get('/api/get-banners'); // Solicitar banners desde la API
      setBanners(response.data.banners);
      console.log(response) // Guardamos los banners en el estado
    } catch (error) {
      console.error("Error al obtener los banners:", error);
    } finally {
      setCargando(false); // Detenemos el estado de carga
    }
  };

  const subirImagen = async () => {
    try {
      setCargando(true);

      const formData = new FormData();
      formData.append("file", imagen);
      formData.append("folder", folder);

      const response = await api.post('/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert("Imagen subida correctamente");
        window.location.reload()
        obtenerImagenes(); // Actualizar lista de imágenes

      } else {
        alert("Error al subir la imagen");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarImagen = async (id) => {
    const imageId = id.split('/')[1]; // Esto obtendrá solo la parte después de "clubcyt/"
    try {
      if (window.confirm("¿Seguro que deseas eliminar esta imagen?")) {
        const response = await api.post(`/api/image/${imageId}`, JSON.stringify({
          folder,
        }), {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.status === 200) {
          alert(response.data.message || "Imagen eliminada correctamente");
          obtenerImagenes(); // Actualizar lista de imágenes
        } else {
          alert(response.data.error || "Error al eliminar la imagen");
        }
      }
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
    }
  };

  const asignarBanner = async (bannerId, tipo, image_url) => {
    try {
      if (window.confirm(`¿Seguro que deseas colocar esta imagen en ${tipo} esta imagen?`)) {

        const response = await api.put(`/api/edit-banners/${bannerId}`, {
          tipo: tipo,
          image_url: image_url,
        });
        if (response.status === 200) {
          alert(`Banner ${tipo} asignado correctamente.`);
          obtenerImagenes(); // Actualizar lista de banners
        window.location.reload()
        }
      }

    } catch (error) {
      console.error("Error al asignar el banner:", error);
    }
  };

  const asignarLinkEvento = async (bannerId, link) => {
    try {
      const response = await api.put(`/api/edit-link/${bannerId}`, {
        link_evento: link,
      });

      if (response.status === 200) {
        alert(`Link asignado correctamente.`);
        obtenerImagenes(); // Actualizar lista de banners
        window.location.reload()
      }
    } catch (error) {
      console.error("Error al asignar el banner:", error);
    }
  }

  // Cargar imágenes al montar el componente
  useEffect(() => {
    obtenerImagenes();
    obtenerBanners();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="contenedor">
        <h2 className="header-title">Administrar Banners</h2>

        {/* Formulario para agregar imágenes */}
        <div className="add-banner-form">
          <h3>Agregar banners</h3>
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
            />
            <button onClick={subirImagen} className="upload-btn">
              Subir
            </button>
          </div>
        </div>
        {/* Formulario para asignar un link de evento */}
        <div className="event-link-form">
          <h3>Asignar Link de Evento</h3>
          <input
            type="text"
            placeholder="Introduce el link del evento"
            onChange={(e) => setLinkEvento(e.target.value)}
            className="event-link-input"
          />
          <button className="save-link-btn"
            onClick={(e) => asignarLinkEvento(bannerId, linkEvento)}          >
            Guardar Link
          </button>
        </div>

        <div className="banner-container">
          <h1>Banners Actuales</h1>
          {cargando ? (
            <p>Cargando banners...</p>
          ) : (
            banners.length > 0 ? (
              banners.map((banner) => (
                <div key={banner._id} className="banner-images">
                  {banner.bannerFull && (
                    <img src={banner.bannerFull} alt="Banner Full" className="banner-full" />
                  )}
                  {banner.bannerMobile && (
                    <img src={banner.bannerMobile} alt="Banner Mobile" className="banner-mobile" />
                  )}
                  <h4>Link evento: {
                    banner.url
                  } </h4>
                </div>
              ))
            ) : (
              <p>No hay banners disponibles.</p>
            )
          )}

        </div>


        {/* Mostrar imágenes actuales */}
        {cargando && <p>Cargando imágenes...</p>}
        <h2 style={{ paddingTop: "50px" }}>Banco de banners</h2>
        <div className="image-list">
          {imagenes.map((imagen) => (
            <div key={imagen.public_id} className="image-card">
              <img
                src={imagen.url}
                alt={imagen.public_id}
              />
              <div className="image-actions">
                <button
                  onClick={() => eliminarImagen(imagen.public_id)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
                <div className="assign-buttons">
                  <button
                    onClick={() => asignarBanner(bannerId, "bannerFull", imagen.url)}
                    className="assign-btn"
                  >
                    Asignar como Banner Full
                  </button>
                  <button
                    onClick={() => asignarBanner(bannerId, "bannerMobile", imagen.url)}
                    className="assign-btn"
                  >
                    Asignar como Banner Mobile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </>
  );
};

export default NuevoBanner;
