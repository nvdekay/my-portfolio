import { section } from 'framer-motion/client'
import React from 'react'

function About() {
    return (
        <section
            id='about'
            className='min-h-screen overflow-hidden flex items-center justify-center text-white px-4 sm:px-6'
        >
            <div className='max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center'>
                <figure
                    data-aos='fade-right'
                    data-aos-delay='500'
                    className='flex flex-wrap justify-center gap-4 relative'
                >
                    <div className='h-[200px] sm:h-[300px] w-[300px] sm:w-[400px] lg:h-[300px] lg:w-[500px] bg-gradient-to-l
                    from-[#6d2897] via-[#6c95f5] to-[#bb61c5] absolute transform rotate-12 z-0 right-5 -top-2 md:top-10 rounded-full'></div>
                    <img
                        src="/assets/images/avatars/bot_about.png"
                        alt="About pic 1"
                        className='absolute -top-2 left-5 sm:left-10 transform -translate-y-12 z-20 w-24 h-24 sm:w-32 sm:h-32 rounded-3xl shadow-lg'
                    />

                    <img
                        src=""
                        alt=""
                        className='relative z-10 w-36 h-44 sm:w-40 sm:h-40 md:w-72 md:h-96 rounded-lg shadow-lg'
                    />
                </figure>

                <article
                    data-aos='fade-left'
                    data-aos-delay='500'
                    className='text-center lg:text-left relative'
                >
                    <div className='absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10'></div>
                    <header>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6'>About me</h1>

                    </header>
                    <p className='text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        Loborum quidem aperiam natus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
                        Loborum quidem aperiam natus.
                    </p>
                    <footer className='flex flex-row'>
                        <a
                            href=""
                            className='flex justify-center md:justify-start items-center w-full'
                        >
                            <button class="inline-block px-2 py-1 text-xl text-white bg-[#ff5252] border-2 border-black rounded-[10px] shadow-[5px_5px_0_0_#000] transition-all duration-300 ease-in-out cursor-pointer hover:bg-white hover:text-[#ff5252] hover:border-[#ff5252] hover:shadow-[5px_5px_0_0_#ff5252] active:bg-[#fcf414] active:shadow-none active:translate-y-[4px]">
                                Contact me!
                            </button>


                        </a>

                        <a
                            href="https://drive.google.com/file/d/1ymaK0DjPnRdvP0oMgAxGSO7b-eK81hvW/view?usp=drive_link"
                            download={true}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex justify-center md:justify-start items-center w-full'
                        >
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
                    </footer>

                </article>
            </div>


        </section>
    )
}

export default About
