/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CarouselGalleria from '../components/CarouselGalleria'
import MasNoticias from '../components/MasNoticias'
import NewBanner from '../components/NewBanner'
import BannerSantiago from '../components/BannerSantiago'
import HeaderTop from '../components/HeaderTop'
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <HeaderTop />
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