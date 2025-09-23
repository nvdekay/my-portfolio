import { motion, AnimatePresence } from 'framer-motion'
import { useProjectsWithTech, useSiteSettings } from '../hooks/usePortfolioData'
import ErrorMessage from '../components/ErrorMessage'
import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ project, index }) => {
    const technologies = project.technologies || []

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1, // Staggered animation
                ease: "easeOut"
            }}
            layout // Smooth layout changes
            className='relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto'
        >
            <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#3cbff5] rounded-full blur-3xl opacity-50 -top-5 left-10"></div>

            <div className='z-10 flex flex-col h-full'>
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
                    <header className="flex-grow">
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                    </header>

                    <p className="text-gray-200 text-base mb-4 flex-grow">{project.description}</p>

                    {/* Tech Stack */}
                    {technologies.length > 0 && (
                        <div className="mt-auto pt-4">
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
    const { data: projects, loading, error } = useProjectsWithTech();
    const { data: settings } = useSiteSettings();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    if (error) {
        return <ErrorMessage message="Error loading projects" />;
    }

    // Sắp xếp các project theo created_at giảm dần
    const sortedProjects = useMemo(() => {
        if (!projects) return [];
        return [...projects].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }, [projects]);

    const totalPages = Math.ceil(sortedProjects.length / pageSize);
    const paginatedProjects = sortedProjects.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to projects section smoothly
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            const headerOffset = 100; // Offset để không bị che bởi header
            const elementPosition = projectsSection.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

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
                {/* Sử dụng AnimatePresence để handle smooth transitions khi chuyển trang */}
                <AnimatePresence mode="wait">
                    {paginatedProjects.length > 0 ? (
                        <motion.div
                            key={currentPage} // Key thay đổi khi chuyển trang để trigger animation
                            className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {paginatedProjects.map((project, index) => (
                                <ProjectCard
                                    key={`${project.id}-${currentPage}`} // Unique key cho mỗi trang
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        !loading && (
                            <motion.div
                                className="col-span-full text-center text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                No projects found.
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </section>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <motion.div
                    className="flex justify-center items-center gap-4 mt-12 mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 text-white border border-gray-600 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Previous
                    </button>

                    <span className="text-gray-400">
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 text-white border border-gray-600 rounded-full hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        Next
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </motion.div>
            )}
        </main>
    );
}

export default Projects;