import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const NavbarLinks = [
    { id: 1, name: 'Home', link: '#home' },
    { id: 2, name: 'About', link: '#about' },
    { id: 3, name: 'Skills', link: '#skills' },
    { id: 4, name: 'Projects', link: '#projects' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-60 text-white flex-col items-center py-10 space-y-8 z-50 border-r border-gray-700">

        <a href="#home" className="text-3xl font-bold italic">nvdeekay.07</a>
        {NavbarLinks.map((link) => (
          <a key={link.id} href={link.link} className="text-lg hover:text-gray-300">
            {link.name}
          </a>
        ))}
        <button className="text-white border-2 py-2 px-6 hover:bg-purple-800 rounded-full text-lg">
          Contact
        </button>
      </aside>

      {/* Mobile Navbar Toggle */}
      <div className="lg:hidden fixed top-5 left-5 z-50">
        <button onClick={() => setIsOpen(true)} className="focus:outline-none">
          <FontAwesomeIcon icon={faBars} className="text-white w-8 h-8" />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-2/3 h-full bg-[#801b9c] z-50 transform transition-transform duration-300 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:hidden flex flex-col items-start pt-10 pl-6 space-y-6`}
      >

        {/* Close Button */}
        <button onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-white">
          <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
        </button>

        <a href="#home" className="text-2xl font-bold italic text-white">
          nvdeekay.07
        </a>
        {NavbarLinks.map((link) => (
          <a
            key={link.id}
            href={link.link}
            className="text-lg text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <button className="text-white border-2 py-2 px-6 hover:bg-purple-800 rounded-full text-lg">
          Contact
        </button>
      </div>
    </>
  );
}

export default Navbar;
