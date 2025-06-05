import React from 'react'
import { useTypedText } from '../hooks/useTypedText'
import { motion } from 'framer-motion'

function Hero() {
    const roles = ['Frontend Developer', 'Software Engineer', 'Backend Developer']
    const typedText = useTypedText(roles, 10, 2000) // tốc độ gõ và delay giữa các role

    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col justify-center items-center lg:ml-60'>
            <main
                id='home'
                className='flex flex-col-reverse md:flex-row items-center w-full max-w-[1280px] mx-auto px-4 md:px-8 pb-4 pt-24 mt-14 md:mt-36 gap-8'
            >
                <section
                    className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mt-10 md:mt-0 relative px-4 md:px-0 lg:px-8'
                    data-aos='fade-up'
                    data-aos-delay='100'
                >
                    <header className="flex flex-col items-center md:items-start">
                        <h6 className="text-white text-secondary-dark text-lg lg:text-2xl font-medium mb-2 md:mb-2 transition-all duration-300">
                            Hello, I am
                        </h6>
                        <h1 className="text-[#bb65d3] text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 leading-tight">
                            Nguyen Vu<br />
                            Dang Khanh
                        </h1>
                        <h2 className='text-xl sm:text-4xl md:text-2xl font-bold text-white mb-3 flex justify-center md:justify-start'>
                            I am a{' '}
                            <motion.span
                                key={typedText}
                                initial={{ opacity: 0, x: 0 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className='ml-2 text-[#bb65d3]'
                            >
                                {typedText}
                            </motion.span>
                        </h2>

                        <div className='flex items-center space-x-4 mb-6 justify-center md:justify-start'>
                            <a href="https://github.com/nvdekay" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/socials/github.png" alt="github" className='w-11 h-11' />
                            </a>
                            <a href="https://www.facebook.com/nvdeekay.07/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/socials/facebook.png" alt="facebook" className='w-11 h-11' />
                            </a>
                            <a href="https://www.instagram.com/nvdeekay.07/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/socials/instagram.png" alt="instagram" className='w-11 h-11' />
                            </a>
                            <a href="https://www.linkedin.com/in/nvdeekay07/" target="_blank" rel="noopener noreferrer">
                                <img src="/assets/images/socials/linkedin.png" alt="linkedin" className='w-11 h-11' />
                            </a>
                        </div>


                        <a href="#about" className='flex justify-center md:justify-start items-center w-full'>
                            <button class="select-none border-4 border-black bg-gray-500 pb-[10px] transition ease-in-out transform hover:-translate-y-1 hover:shadow-lg active:pb-0 active:mb-[10px] active:translate-y-[10px] cursor-pointer">
                                <div class="bg-[#dddddd] border-4 border-white px-4 py-[2px] text-[1.2em] tracking-[1px]">
                                    About me!
                                </div>
                            </button>
                        </a>
                    </header>
                </section>

                <figure
                    data-aos='fade-up'
                    data-aos-delay='500'
                    className='w-full md:w-1/2 flex justify-center items-center'
                >
                    <img
                        src="/assets/images/avatars/avthero.jpg"
                        alt="Hero Image"
                        className='w-[200px] sm:w-[280px] md:w-[400px] max-w-[90vw] aspect-square object-cover rounded-full border-[6px] border-transparent bg-gradient-to-tr from-[#8e6cf5] via-[#bb61c5] to-[#cd3cf5] p-[3px]'
                    />
                </figure>
            </main>
        </div>
    )
}

export default Hero
