import banner from '../assets/nuevo-banner.jpg'
const BannerSantiago = () => {
    return (
        <div className='container'>
            <div style={{ width: "100%" }}>
                <img src={banner} className='w-100 mt-5 banner-sgo'/>
            </div>
        </div>
    )
}

export default BannerSantiago