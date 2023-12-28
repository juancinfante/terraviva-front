import '../css/banner.css'

const Banner = () => {
  return (
    <>
        <div className="banner">
            <div className="banner-first" style={{"backgroundImage" : "url('https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703804789/test-img/vu9qfitgwynp7ndmytu9.jpg')"}}>
                <div className="filter">
                    <span>
                    <p className='provincia'>JUJUY</p>
                    </span>
                    <p className='titulo'>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p>
                    <span><p  className='fecha'>20 de Diciembre del 2023</p></span>
                </div>
            </div>
            <div className="banner-second">
                <div className="inner" style={{"backgroundImage" : "url('https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703804978/test-img/l8j8fwdgrkr5tlwh8txf.jpg')"}}>
                    <div className="filter2">
                    <span>
                    <p className='provincia'>SANTIAGO DEL ESTERO</p>
                    </span>
                    <p className='titulo'>Convocan a artistas a participar del certamen de la Canción Inédita ´Canto a Cafayate´</p>
                    <span><p  className='fecha'>20 de Diciembre del 2023</p></span>
                    </div>
                </div>
                <div className="inner" style={{"backgroundImage" : "url('https://res.cloudinary.com/dwjhbrsmf/image/upload/v1703805147/test-img/cx2rjh6dzjw2i0k0iixm.jpg')"}}>
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