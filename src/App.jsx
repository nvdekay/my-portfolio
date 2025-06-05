import { React, useEffect } from 'react'
import Hero from './pages/Hero'
import AOS from 'aos'
import 'aos/dist/aos.css'
import About from './pages/About'
import Navbar from './components/Navbar'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Certificates from './pages/Certificates'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  })
  return (
    <main className='bg-zinc-800'>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Certificates />
      <Contact />
    </main>
  )
}

export default App
