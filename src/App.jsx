import './App.css'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Tabs from './components/Tabs'
import Ticker from './components/Ticker'
import Sections from './components/Sections'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Ticker/>
    <div className="container-nav">
      <Navbar /> 
    </div>
    <div className="container2">
    <Banner />
    <Tabs />
    <Sections />
    </div>
    <Footer />
    </>
  )
}

export default App
