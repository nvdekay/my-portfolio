// src/App.jsx
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './pages/Hero'
import About from './pages/About'
import Projects from './pages/Projects'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Chatbot from './pages/Chatbot'
import AdminDashboard from './pages/AdminDashboard'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Landing from './pages/Landing'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000
    })
  }, [])

  return (
    <Router>
      <div className='bg-zinc-800'>
        <Routes>
          {/* Portfolio Routes */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Projects />
              <Certificates />
              <Contact />
              <Chatbot />
            </>
          } />
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App