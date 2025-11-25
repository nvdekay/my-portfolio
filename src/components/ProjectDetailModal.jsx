import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTimes, 
    faGlobe, 
    faCode, 
    faCalendarAlt, 
    faClock,
    faExternalLinkAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
    if (!project) return null;

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Calculate duration display
    const getDurationText = () => {
        const months = project.duration_months || 0;
        if (months === 0) return 'N/A';
        if (months === 1) return '1 month';
        if (months < 12) return `${months} months`;
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
        return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-white/10 max-w-4xl w-full my-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white z-10"
                            >
                                <FontAwesomeIcon icon={faTimes} className="text-xl" />
                            </button>

                            {/* Header with Image */}
                            <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                <img
                                    src={project.image_url || '/assets/images/projects/default.jpg'}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-4 py-2 bg-teal-500/90 backdrop-blur-sm text-white font-semibold rounded-full text-sm capitalize shadow-lg">
                                        {project.category || 'Project'}
                                    </span>
                                </div>

                                {/* Title at bottom of image */}
                                <div className="absolute bottom-4 left-6 right-6">
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        {project.title}
                                    </h2>
                                    {project.description && (
                                        <p className="text-gray-300 text-sm">
                                            {project.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                {/* Project Links */}
                                <div className="flex flex-wrap gap-4">
                                    {project.url && (
                                        <a
                                            href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-teal-500/50"
                                        >
                                            <FontAwesomeIcon icon={faGlobe} />
                                            Visit Website
                                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                                        </a>
                                    )}
                                    {project.github_url && (
                                        <a
                                            href={project.github_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 font-semibold shadow-lg"
                                        >
                                            <FontAwesomeIcon icon={faGithub} />
                                            View on GitHub
                                            <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
                                        </a>
                                    )}
                                </div>

                                {/* Project Timeline */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Start Date */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-teal-400 mb-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            <span className="font-semibold text-sm">Start Date</span>
                                        </div>
                                        <p className="text-white text-lg font-bold">
                                            {formatDate(project.start_date)}
                                        </p>
                                    </div>

                                    {/* End Date */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-teal-400 mb-2">
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                            <span className="font-semibold text-sm">End Date</span>
                                        </div>
                                        <p className="text-white text-lg font-bold">
                                            {formatDate(project.end_date)}
                                        </p>
                                    </div>

                                    {/* Duration */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                        <div className="flex items-center gap-2 text-teal-400 mb-2">
                                            <FontAwesomeIcon icon={faClock} />
                                            <span className="font-semibold text-sm">Duration</span>
                                        </div>
                                        <p className="text-white text-lg font-bold">
                                            {getDurationText()}
                                        </p>
                                    </div>
                                </div>

                                {/* Long Description */}
                                {project.long_description && (
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCode} className="text-teal-400" />
                                            Project Details
                                        </h3>
                                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                                            {project.long_description}
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                {project.tech_stack && project.tech_stack.length > 0 && (
                                    <div className="bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/30 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faCode} className="text-teal-400" />
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.tech_stack.map((tech, index) => (
                                                <motion.span
                                                    key={index}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-teal-500/50 transition-all duration-300 hover:scale-105"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetailModal;
