import React from 'react'
import Navbar from '../components/Navbar'
import { useTypedText } from '../hooks/useTypedText'
import { motion } from 'framer-motion'

function Hero() {
    const roles = ['Frontend Developer', 'Software Engineer', 'Backend Developer']
    const typedText = useTypedText(roles, 10, 2000) // tốc độ gõ và delay giữa các role

    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[600px] flex flex-col justify-center items-center'>
            <div className='md:h-[550px] h-[500px] w-[450px] absolute transform rotate-45 z-0 right-2 top-28'></div>
            <Navbar />
            <main
                id='home'
                className='flex flex-col-reverse md:flex-row justify-center items-center z-10 w-full px-4 md:px-52 pb-4 md:pt-32 pt-24 mt-14 md:mt-0 gap-8'
            >

                <section
                    className='flex-1 text-center md:text-left mt-10 md:mt-0 relative'
                    data-aos='fade-up'
                    data-aos-delay='100'
                >

                    <div className='absolute -z-10 w-60 h-60 blur-4xl opacity-50 -top-5 -left-12'></div>
                    <header>
                        <p className='text-sm sm:text-2xl md:text-lg font-semibold text-white mb-1'>
                            Hello, I am
                        </p>
                        <h1 className='text-8xl md:text-5xl sm:text-4xl font-bold text-[#bb65d3] mb-4'>
                            Nguyen Vu Dang Khanh
                        </h1>
                        <h2 className='text-xl sm:text-4xl md:text-2xl font-bold text-white mb-3 flex'>
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
                        <div className='flex items-center space-x-4 mb-6'>
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
                    </header>

                    <a href="https://drive.google.com/file/d/1ymaK0DjPnRdvP0oMgAxGSO7b-eK81hvW/view?usp=drive_link" download={true} target='_blank' rel='noopener noreferrer'>
                        <button className="group relative w-[150px] h-[40px] border-2 border-[#323232] shadow-[4px_4px_0_#323232] rounded-[10px] bg-[#eee] overflow-hidden flex items-center transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none">
                            <span className="group-hover:text-transparent text-[#323232] font-semibold pl-[22px] transition-all duration-300">
                                Download CV
                            </span>
                            <span className="absolute right-0 h-full w-[39px] bg-[#dedede] flex items-center justify-center translate-x-[109px] group-hover:translate-x-0 group-hover:w-[148px] transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="w-[20px] fill-[#323232]">
                                    <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
                                    <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
                                    <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
                                </svg>
                            </span>
                        </button>

                    </a>

                </section>
                <figure
                    data-aos='fade-up'
                    data-aos-delay='500'
                    className='flex-1 flex justify-center items-center'
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
