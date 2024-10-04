/* eslint-disable no-unused-vars */
import banner from '../assets/nuevo-banner.jpg'
import banner_terra_mobile from '../assets/banner_terra_mobile.jpg'
import bannerDemi from '../assets/demi.jpg'
import bannerViolinero from '../assets/violinero.jpg'
import bannerDemiViolinero from '../assets/demi-violinero.jpg'
import banner_raly from '../assets/ralyquimsa.png'
import banner_raly_mobile from '../assets/ralyquimsa_mobile.png'

const BannerSantiago = () => {
    return (
        <>
            <div className='container d-none d-md-block' >
                <div style={{ width: "100%" }}>
                    <a href="https://www.entradaweb.com.ar/evento/e52085ec/step/1" target='_blank' rel='noreferrer'>
                        <img src={banner_raly} className='w-100 mt-4 banner-sgo' style={{ height: 120 }} />
                    </a>
                </div>
            </div>
            <div className='container d-block d-md-none' >
                <div style={{ width: "100%" }}>
                    <a href="https://www.entradaweb.com.ar/evento/e52085ec/step/1" target='_blank' rel='noreferrer'>
                        <img src={banner_raly_mobile} className='w-100 mt-4 banner-sgo' style={{ height: 130 }} />
                    </a>
                </div>
            </div>
        </>
    )
}

export default BannerSantiago
