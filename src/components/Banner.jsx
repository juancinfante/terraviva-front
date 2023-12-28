import '../css/banner.css'

const Banner = () => {
  return (
    <>
        <div className="banner">
            <div className="banner-first">
                <div className="filter">
                    <span>
                    <p className='provincia'>JUJUY</p>
                    </span>
                    <p className='titulo'>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p>
                    <span><p  className='fecha'>20 de Diciembre del 2023</p></span>
                </div>
            </div>
            <div className="banner-second">
                <div className="inner">
                    <div className="filter2">
                    <span>
                    <p className='provincia'>SANTIAGO DEL ESTERO</p>
                    </span>
                    <p className='titulo'>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p>
                    <span><p  className='fecha'>20 de Diciembre del 2023</p></span>
                    </div>
                </div>
                <div className="inner" style={{"backgroundImage" : "url('http://terraviva.com.ar/administrador/img/uploads/ef9d40_adatiseshow.jpg')"}}>
                    <div className="filter2">
                    <span>
                    <p className='provincia'>CATAMARCA</p>
                    </span>
                    <p className='titulo'>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p>
                    <span><p  className='fecha'>20 de Diciembre del 2023</p></span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Banner