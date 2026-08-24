import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Benefits } from './components/Benefits'
import { Catalog } from './components/Catalog'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'
import { FloatingWhatsapp } from './components/FloatingWhatsapp'

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Benefits />
      <Catalog />
      <About />
      <Contact />
      <Newsletter />
      <Footer />
      <FloatingWhatsapp />
    </>
  )
}

export default App
