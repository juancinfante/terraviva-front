/* eslint-disable no-unused-vars */
import banner from '../assets/nuevo-banner.jpg'
import bannerDemi from '../assets/demi.jpg'
import bannerViolinero from '../assets/violinero.jpg'
import bannerDemiViolinero from '../assets/demi-violinero.jpg'
const BannerSantiago = () => {
    return (
        // <div className='container'>
        //     <div style={{ width: "100%" }}>
        //         <img src={banner} className='w-100 mt-5 banner-sgo'/>
        //     </div>
        // </div>
        <>
        <div className='container d-none d-lg-block'>
            <div style={{ width: "100%" }}>
                <img src={bannerDemiViolinero} className='w-100 mt-5 banner-sgo'/>
            </div>
        </div>
        <div className='container d-block d-lg-none'>
            <div style={{ width: "100%" }}>
                <img src={bannerViolinero} className='w-100 mt-4 banner-sgo'/>
            </div>
        </div>
        <div className='container d-block d-lg-none'>
            <div style={{ width: "100%" }}>
                <img src={bannerDemi} className='w-100 mt-4 banner-sgo'/>
            </div>
        </div>
        </>
    )
}

export default BannerSantiago