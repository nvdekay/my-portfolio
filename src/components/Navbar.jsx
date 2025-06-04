import { React, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const NavbarLinks = [
    { id: 1, name: 'Home', link: '#home' },
    { id: 2, name: 'About', link: '#about' },
    { id: 3, name: 'Skills', link: '#skills' },
    { id: 4, name: 'Projects', link: '#projects' },
  ];

  return (
    <header className='fixed top-0 left-0 right-0 z-50 text-white' data-aos='fade-up' data-aos-delay='300'>
      <div className='contariner mx-auto flex items-center justify-between p-5'>
        {/* Logo */}
        <a href='#home' className='text-4xl font-bold italic text-white'>nvdeekay.07</a>

        {/* Mobile Menu toggle */}
        <button className='md:hidden focus:outline-none' onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className='text-white w-8 h-8' />
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex space-x-7'>
          {NavbarLinks.map((link) => (
            <a key={link.id} href={link.link} className='text-lg hover:text-gray-300'>{link.name}</a>
          ))}

          <button className='inline-flex text-white border-2 py-2 px-4 focus:outline-none hover:bg-purple-800 rounded-full text-lg'>
            {" "}
            Contact{" "}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-[#801b9c] absolute top-0 left-0 w-full h-screen flex flex-col 
      items-center justify-center space-y-8 pt-16`}>
        {/* Close button */}
        <button className='absolute top-5 right-5 text-white' onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} className='w-8 h-8' />
        </button>
        {/* Mobile Navigation  */}
        {NavbarLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            className='text-lg hover:text-gray-300 text-white'
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))
        }

        {/* Contact button */}
        <button className='inline-flex text-white border-2 py-2 px-6   focus:outline-none hover:bg-purple-800 rounded-full text-lg'>
          {" "}
          Contact{" "}
        </button>
      </div>


    </header >
  )
}

export default Navbar
