/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CarouselGalleria from '../components/CarouselGalleria'
import MasNoticias from '../components/MasNoticias'
import NewBanner from '../components/NewBanner'
import BannerSantiago from '../components/BannerSantiago'

const Home = () => {
  return (
    <>
        <Navbar />
        <NewBanner />
        <BannerSantiago/>
        <MasNoticias />
        <CarouselGalleria />
        <Footer />
    </>
  )
}

export default Home