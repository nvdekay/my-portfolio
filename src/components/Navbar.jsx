import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faHouseChimney, faAddressCard, faDiagramProject, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const NavbarLinks = [
    { id: 1, icon: faHouseChimney, name: 'Home', link: '/' },
    { id: 2, icon: faAddressCard, name: 'About', link: '#about' },
    { id: 3, icon: faDiagramProject, name: 'Projects', link: '#projects' },
    { id: 4, icon: faEnvelope, name: 'Contact', link: '#contact' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-60 text-white flex-col py-10 z-50 border-r border-gray-700">
        <div className="text-3xl font-bold italic mb-10 w-full text-center">
          <a href="/" className="block">nvdeekay.07</a>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center space-y-8">
          {NavbarLinks.map((link) => (
            <a
              key={link.id}
              href={link.link}
              className="text-lg hover:text-gray-300 flex items-center"
            >
              {link.icon && <FontAwesomeIcon icon={link.icon} className="mr-2" />}
              {link.name}
            </a>
          ))}
        </div>
        <div className="text-sm text-gray-400 text-center mt-10">
          Last updated: 6/6/2025
        </div>
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
