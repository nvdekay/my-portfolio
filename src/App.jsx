import { React, useEffect } from 'react'
import Hero from './pages/Hero'
import AOS from 'aos'
import 'aos/dist/aos.css'
import About from './pages/About'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  })
  return (
    <main className='bg-zinc-800'>
      <Hero />
      <About />
    </main>
  )
}

export default App
