import banner from '../assets/banner-santiago-gobierno.jpg'
const BannerSantiago = () => {
    return (
        <div className='container'>
            <div style={{ width: "100%" }}>
                <img src={banner} className='w-100 mt-5' style={{height: "100px", objectFit: "fill"}}/>
            </div>
        </div>
    )
}

export default BannerSantiago