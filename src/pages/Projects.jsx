import { article, image, li, main } from 'framer-motion/client'
import React from 'react'

const ProjectCard = ({ image, title, description, link }) => {
    return (
        <article className='relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto'>
            <div className='absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 -top-5 left-10'></div>

            <div className='relative z-10'>
                <figure className='relative'>
                    <img src={image} className="w-full h-48 object-cover transition-tranform duration-300 group-hover:scale-110" alt="" />
                    <a
                        href={link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='absolute h-[202px] inset-0 flex items-center justify-center bg-purple-800 bg-opacity-50 opacity-0
                    group-hover:opacity-100 transition-opacity duration-300'
                    >
                        <button className='bg-white font-medium text-black py-2 px-4 rounded-3xl shadow hover:text-white hover:bg-[#2879d5]'>
                            Live Preview
                        </button>
                    </a>
                </figure>
                <div className='px-6 py-4'>
                    <header>
                        <h3 className='text-white font-bold text-xl mb-2'>{title}</h3>
                    </header>
                    <p className='text-gray-200 text-base'>{description}</p>
                </div>
            </div>
        </article>
    );
};


function Projects() {
    const listProjects = [
        {
            image: 'assets/images/projects/project.png',
            title: 'My Portfolio',
            description: 'A personal portfolio website built with ReactJS, Vite, TailwindCSS and Framer Motion, showcasing my skills and projects in a visually appealing and user-friendly interface.',
            link: 'https://khanhnvd.vercel.app/'
        },
        {
            image: 'assets/images/projects/project.png',
            title: 'Mavent',
            description: 'A role-based platform enabling event operations from Super Admin to Participant. Developed key features like event dashboards, task and document management, user role control, and multi-role registration workflows.',
            link: 'https://github.com/nphi1410/Mavent'
        },
        {
            image: 'assets/images/projects/project.png',
            title: 'BoostYourStyle',
            description: 'A full-stack e-commerce website built with Java (Servlet, JSP, JSTL, JDBC) and Bootstrap, featuring separate user and admin interfaces for a complete online shopping experience.',
            link: 'https://github.com/nvdekay/boost-your-style'
        },
        {
            image: 'assets/images/projects/project.png',
            title: 'HelloWorld',
            description: 'A simple web application built with HTML, CSS, and JavaScript, showcasing a basic user interface and functionality.',
            link: ''
        }
    ]
    return (
        <main className='p-4 ml-0 md:ml-60 min-h-screen'>
            <section
                data-aos='fade-up'
                data-aos-delay='300'
            >
                <header className='text-center'>
                    <img
                        src="/assets/images/avatars/imghero.png"
                        alt=""
                        className='absolute z-0 left-2 top-2 sm:left-16 sm:top-32 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                    <div className='absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-[#cd3cf5] rounded-full blur-3xl opacity-50 top-10 sm:top-28 left-1/2 transform -translate-x-1/2'></div>
                    <div>
                        <h1 className='text-3xl text-white sm:text-4xl font-bold mb-6'>
                            My <span className='text-purple-400'>Projects</span>
                        </h1>
                        <p className='text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base'>
                            Here are some of the projects I have worked on
                        </p>
                    </div>
                    <img
                        src="/assets/images/avatars/imghero.png"
                        alt=""
                        className='absolute z-0 right-2 top-2 sm:right-16 sm:top-32 transform rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                </header>
            </section>

            <section
                data-aos='fade-up'
                data-aos-delay='500'
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-48 sm:mt-64'
            >
                {listProjects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        image={project.image}
                        title={project.title}
                        description={project.description}
                        link={project.link}
                    />
                ))}
            </section>
        </main>
    )
}

export default Projects
