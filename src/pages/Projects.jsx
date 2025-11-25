import { motion, AnimatePresence } from "framer-motion";
import {
  useProjectsWithTech,
  useSiteSettings,
} from "../hooks/usePortfolioData";
import ErrorMessage from "../components/ErrorMessage";
import ProjectDetailModal from "../components/ProjectDetailModal";
import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faGlobe,
  faRocket,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const ProjectCard = ({ project, index, onClick }) => {
  // Sử dụng tech_stack từ metadata, fallback về technologies nếu không có
  const techList =
    project.tech_stack && project.tech_stack.length > 0
      ? project.tech_stack
      : (project.technologies || []).map((t) => t.name);

  return (
    <motion.article
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1, // Staggered animation
        ease: "easeOut",
      }}
      layout // Smooth layout changes
      className="relative bg-gray-800 rounded overflow-hidden shadow-lg group w-full max-w-sm mx-auto cursor-pointer hover:shadow-2xl hover:shadow-teal-500/30 transition-shadow duration-300"
    >
      <div className="absolute z-0 w-40 h-40 sm:w-60 sm:h-60 bg-[#3cbff5] rounded-full blur-3xl opacity-50 -top-5 left-10"></div>

      <div className="z-10 flex flex-col h-full">
        <figure className="relative">
          <img
            src={project.image_url || '/assets/images/projects/default.jpg'}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            alt={project.title}
          />
        </figure>

        <div className="px-6 py-4 relative h-full flex flex-col">
          <header className="flex-grow">
            <h3 className="text-white font-bold text-xl mb-2">
              {project.title}
            </h3>
          </header>

          <p className="text-gray-200 text-base mb-4 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          {techList.length > 0 && (
            <div className="mt-auto pt-4">
              <div className="text-teal-500 font-semibold">Tech Stack:</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {techList.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-500/20 border border-blue-500/40 rounded-[20px] text-blue-300 inline-block text-[12px] px-[10px] py-[3px] transition-all duration-300 hover:bg-blue-500/30"
                  >
                    {typeof tech === "string" ? tech : tech.name}
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
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pageSize = 6;

  // Handler để mở modal
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Handler để đóng modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Delay để animation hoàn thành
  };

  // Filter options - chỉ có 2 category: landing và website
  const filterOptions = [
    { value: "ALL", label: "All Projects", icon: faLayerGroup },
    { value: "website", label: "Websites", icon: faGlobe },
    { value: "landing", label: "Landing Pages", icon: faRocket },
  ];

  if (error) {
    return <ErrorMessage message="Error loading projects" />;
  }

  // Sort and filter projects
  const filteredAndSortedProjects = useMemo(() => {
    if (!projects) return [];

    let filtered = [...projects];

    // Apply filter theo category từ metadata
    if (activeFilter !== "ALL") {
      filtered = filtered.filter(
        (project) => project.category === activeFilter
      );
    }

    // Sort by created_at descending
    return filtered.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [projects, activeFilter]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / pageSize);
  const paginatedProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to projects section smoothly
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const headerOffset = 100;
      const elementPosition = projectsSection.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  return (
    <main id="projects" className="p-4 ml-0 lg:ml-60 min-h-screen">
      <section data-aos="fade-up" data-aos-delay="300">
        <header className="text-center relative">
          <img
            src={
              settings.hero_image_left || "/assets/images/avatars/imghero.png"
            }
            alt=""
            className="absolute z-0 left-2 top-2 sm:left-16 sm:top-32 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70"
          />
          <div className="absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-[#3cbff5] rounded-full blur-3xl opacity-50 top-10 sm:top-28 left-1/2 transform -translate-x-1/2"></div>

          <div>
            <h1 className="text-3xl text-white sm:text-4xl font-bold mb-6">
              {settings.projects_title || "My Projects"}
            </h1>
            <p className="text-gray-400 mt-2 sm:mt-4 text-sm sm:text-base">
              {settings.projects_subtitle ||
                "Here are some of the projects I have worked on"}
            </p>
          </div>
          <img
            src={
              settings.hero_image_right || "/assets/images/avatars/imghero.png"
            }
            alt=""
            className="absolute z-0 right-2 top-2 sm:right-16 sm:top-32 transform rotate-12 w-24 h-auto sm:w-32 opacity-70"
          />
        </header>
      </section>

      {/* Filter Tabs */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-24 mb-12 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {filterOptions.map((option) => {
              const projectCount =
                option.value === "ALL"
                  ? projects?.length || 0
                  : projects?.filter((p) => p.category === option.value)
                      .length || 0;

              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`
                                        relative px-6 py-3 rounded-full font-medium text-sm
                                        transition-all duration-300 overflow-hidden
                                        border-2 backdrop-blur-sm
                                        ${
                                          activeFilter === option.value
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-500/50"
                                            : "bg-gray-800/50 text-gray-300 border-gray-700 hover:border-gray-600 hover:bg-gray-700/50"
                                        }
                                    `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <FontAwesomeIcon icon={option.icon} />
                    <span>{option.label}</span>
                    <span
                      className={`
                                            px-2 py-0.5 rounded-full text-xs font-bold
                                            ${
                                              activeFilter === option.value
                                                ? "bg-white/20"
                                                : "bg-gray-700"
                                            }
                                        `}
                    >
                      {projectCount}
                    </span>
                  </span>

                  {/* Active indicator */}
                  {activeFilter === option.value && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 -z-10 rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.section>

      <section
        data-aos="fade-up"
        data-aos-delay="500"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-6 sm:px-12 lg:px-24"
      >
        {/* Sử dụng AnimatePresence để handle smooth transitions khi chuyển trang */}
        <AnimatePresence mode="wait">
          {paginatedProjects.length > 0 ? (
            <motion.div
              key={`${currentPage}-${activeFilter}`} // Key thay đổi khi chuyển trang hoặc filter
              className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {paginatedProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.id}-${currentPage}-${activeFilter}`}
                  project={project}
                  index={index}
                  onClick={handleProjectClick}
                />
              ))}
            </motion.div>
          ) : (
            !loading && (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faLayerGroup}
                      className="text-4xl text-gray-600"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400">
                    No projects found
                  </h3>
                  <p className="text-gray-500">
                    {activeFilter !== "ALL"
                      ? `No ${activeFilter.toLowerCase()} projects available yet.`
                      : "No projects available yet."}
                  </p>
                </div>
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default Projects;
