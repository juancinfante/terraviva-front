import { useState, useEffect } from "react";
import api from "../api/api";

const BannerSantiago = () => {


    const [banner, setBanner] = useState(null); // Banner actual para pantalla completa
    // Banner actual para mobile


    // Obtener banners actuales del modelo
    const obtenerBannersActuales = async () => {
        try {
            const response = await api.get("/api/get-banners"); // Endpoint para obtener los banners
            const { banners } = response.data;
            if (banners && banners.length > 0) {
                const bannerActual = banners[0]; // Asumiendo que trabajamos con un único modelo
                setBanner(bannerActual);
                console.log(banner)
            }
        } catch (error) {
            console.error("Error al obtener banners actuales:", error);
        }
    };

    // Cargar imágenes y banners al montar el componente
    useEffect(() => {
        obtenerBannersActuales();
    }, []);
    return (
        <>
            {banner ?
                <><div className='container d-none d-md-block' >
                    <div style={{ width: "100%" }}>
                        <a href={banner.url} target='_blank' rel='noreferrer'>
                            <img src={banner.bannerFull} className='w-100 mt-4 banner-sgo' style={{ height: 120 }} />
                        </a>
                    </div>
                </div>
                    <div className='container d-block d-md-none' >
                        <div style={{ width: "100%" }}>
                            <a href={banner.url} target='_blank' rel='noreferrer'>
                                <img src={banner.bannerMobile} className='w-100 mt-4 banner-sgo' style={{ height: 130 }} />
                            </a>
                        </div>
                    </div></> : ""}

        </>
    )
}

export default BannerSantiago
