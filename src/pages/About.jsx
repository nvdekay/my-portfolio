// src/pages/About.jsx
import React from 'react'
import { usePersonalInfo, useSkills, useSiteSettings } from '../hooks/usePortfolioData'
import ErrorMessage from '../components/ErrorMessage'

function About() {
    const { data: personalInfo, loading: personalLoading, error: personalError } = usePersonalInfo()
    const { data: skills, loading: skillsLoading, error: skillsError } = useSkills()
    const { data: settings } = useSiteSettings()

    const ScrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (personalError || skillsError) {
        return <ErrorMessage message="Error loading about data" />
    }

    const person = personalInfo?.[0] || {}
    
    // Group skills by category
    const skillsByCategory = skills?.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
    }, {}) || {}

    return (
        <section
            id="about"
            className="lg:ml-60 min-h-screen overflow-hidden flex items-center justify-center text-white px-4 sm:px-6 mb-16"
        >
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                <figure
                    data-aos='fade-right'
                    data-aos-delay='500'
                    className='relative flex justify-center items-center h-full'
                >
                    <div className="z-10 relative">
                        <div className="absolute rounded-full -inset-4 bg-gradient-to-br from-[#6d2897] via-[#6c95f5] to-[#bb61c5] blur-xl opacity-60 animate-pulse-slow"></div>
                        <img
                            src={person.about_image_url || "/assets/images/avatars/about.png"}
                            alt="About Photo"
                            className='relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105'
                        />
                    </div>
                </figure>

                <article
                    data-aos="fade-left"
                    data-aos-delay="500"
                    className="text-center lg:text-left relative lg:mt-28"
                >
                    <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10"></div>
                    <header className='flex flex-col items-start'>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                            {settings.about_title || 'About me'}
                        </h1>
                        <hr className="border-t-2 border-[#9c3fda] w-1/4 mb-6 sm:mb-8 self-start" />
                    </header>

                    <div className="flex flex-col items-start">
                        <h3 className="text-tertiary-dark text-xl md:text-3xl font-medium mb-4 transition-all duration-300">Skills</h3>
                        <ul className="text-tertiary-dark/70 leading-7 transition-all duration-300 list-disc ml-8 mb-8 text-left">
                            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                                <li key={category}>
                                    <span className="font-bold">{category}: </span>
                                    <span>
                                        {categorySkills.map(skill => skill.name).join(', ')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <footer className="flex flex-row gap-4 flex-wrap justify-center lg:justify-start">
                        <div className="flex justify-center items-center">
                            <button 
                                onClick={() => ScrollToSection('contact')} 
                                className="inline-block py-[6px] px-4 text-lg border-2 border-black rounded-[10px] shadow-[5px_5px_0_0_#000] transition-all duration-300 ease-in-out cursor-pointer hover:bg-white hover:text-[#000000] hover:border-[#6c95f5] hover:shadow-[5px_5px_0_0_#6c95f5] active:bg-[#a9a8aa] active:shadow-none active:translate-y-[4px]"
                            >
                                Contact me
                            </button>
                        </div>
                        <a
                            href={person.resume_url}
                            download={true}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex justify-center items-center"
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
    );
}

export default About;