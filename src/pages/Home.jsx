/* eslint-disable no-unused-vars */
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Tabs from '../components/Tabs'
import Ticker from '../components/Ticker'
import Sections from '../components/Sections'
import Footer from '../components/Footer'
import CarouselGalleria from '../components/CarouselGalleria'
import MasNoticias from '../components/MasNoticias'
import BannerSantiago from '../components/BannerSantiago'
import NewBanner from '../components/NewBanner'

const Home = () => {
  return (
    <>
        <Navbar />
        <NewBanner />
        <BannerSantiago />
        <MasNoticias />
        <CarouselGalleria />
      <Footer />
    </>
  )
}

export default Home