import { motion } from 'framer-motion'
import { useProjectsWithTech, useSiteSettings } from '../hooks/usePortfolioData'
import ErrorMessage from '../components/ErrorMessage'

const ProjectCard = ({ project }) => {
    const technologies = project.technologies || []
    
    return (
        <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className='relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto'
        >
            <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#3cbff5] rounded-full blur-3xl opacity-50 -top-5 left-10"></div>

            <div className='z-10'>
                <figure className='relative'>
                    <img 
                        src={project.image_url} 
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                        alt={project.title}
                    />
                    {(project.demo_url || project.github_url) && (
                        <div className='absolute h-[202px] inset-0 flex items-center justify-center bg-blue-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <div className="flex gap-2">
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <button className='bg-white font-medium text-black py-2 px-4 rounded-3xl shadow hover:text-white hover:bg-[#2879d5]'>
                                            Live Preview
                                        </button>
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        <button className='bg-gray-600 font-medium text-white py-2 px-4 rounded-3xl shadow hover:bg-gray-700'>
                                            GitHub
                                        </button>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}
                </figure>
                
                <div className="px-6 py-4 relative h-full flex flex-col">
                    <header>
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                    </header>

                    <p className="text-gray-200 text-base mb-4">{project.description}</p>

                    {/* Tech Stack */}
                    {technologies.length > 0 && (
                        <div className="mb-0 pt-4">
                            <div className="text-teal-500 font-semibold">Tech Stack:</div>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech.id}
                                        className="hover:bg-green-600 cursor-pointer bg-white/10 border border-white/20 rounded-[20px] text-white inline-block text-[12px] px-[10px] py-[3px] transition-all duration-300"
                                        style={{ backgroundColor: tech.color + '20', borderColor: tech.color + '40' }}
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

function Projects() {
    const { data: projects, loading, error } = useProjectsWithTech()
    const { data: settings } = useSiteSettings()


    if (error) {
        return <ErrorMessage message="Error loading projects" />
    }

    return (
        <main id='projects' className='p-4 ml-0 lg:ml-60 min-h-screen'>
            <section data-aos='fade-up' data-aos-delay='300'>
                <header className='text-center relative'>
                    <img
                        src={settings.hero_image_left || "/assets/images/avatars/imghero.png"}
                        alt=""
                        className='absolute z-0 left-2 top-2 sm:left-16 sm:top-32 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                    <div className="absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-[#3cbff5] rounded-full blur-3xl opacity-50 top-10 sm:top-28 left-1/2 transform -translate-x-1/2"></div>

                    <div>
                        <h1 className='text-3xl text-white sm:text-4xl font-bold mb-6'>
                            {settings.projects_title || 'My Projects'}
                        </h1>
                        <p className='text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base'>
                            {settings.projects_subtitle || 'Here are some of the projects I have worked on'}
                        </p>
                    </div>
                    <img
                        src={settings.hero_image_right || "/assets/images/avatars/imghero.png"}
                        alt=""
                        className='absolute z-0 right-2 top-2 sm:right-16 sm:top-32 transform rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                </header>
            </section>

            <section
                data-aos='fade-up'
                data-aos-delay='500'
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 sm:mt-64 px-6 sm:px-12 lg:px-24'
            >
                {projects?.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </section>
        </main>
    )
}

export default Projects