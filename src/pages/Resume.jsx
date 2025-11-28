import { motion } from 'framer-motion';
import { useSiteSettings } from '../hooks/usePortfolioData';
import WorkExperience from '../components/WorkExperience';
import Education from '../components/Education';
import Activities from '../components/Activities';
import HonorsAwards from '../components/HonorsAwards';

const Resume = () => {
    const { data: settings } = useSiteSettings();

    return (
        <main id='resume' className='p-4 ml-0 lg:ml-60 min-h-screen'>
            {/* Header Section */}
            <section data-aos='fade-up' data-aos-delay='300'>
                <header className='text-center relative py-16'>
                    {/* Decorative Images */}
                    <img
                        src={settings.hero_image_left || "/assets/images/avatars/imghero.png"}
                        alt=""
                        className='absolute z-0 left-2 top-2 sm:left-16 sm:top-8 transform -rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                    
                    {/* Glow Effect */}
                    <div className="absolute z-0 w-72 h-36 sm:w-96 sm:h-44 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 top-10 sm:top-16 left-1/2 transform -translate-x-1/2" />

                    <div className="relative z-10">
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className='text-4xl sm:text-5xl font-bold mb-4'
                        >
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'>
                                Resume
                            </span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className='text-gray-400 mt-4 text-sm sm:text-base max-w-2xl mx-auto'
                        >
                            My professional journey, achievements, and educational background
                        </motion.p>
                    </div>

                    <img
                        src={settings.hero_image_right || "/assets/images/avatars/imghero.png"}
                        alt=""
                        className='absolute z-0 right-2 top-2 sm:right-16 sm:top-8 transform rotate-12 w-24 h-auto sm:w-32 opacity-70'
                    />
                </header>
            </section>

            {/* Main Content - Two Column Layout */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                    {/* Left Column - Work, Education, Activities */}
                    <div className='space-y-12'>
                        <WorkExperience />
                        <Education />
                        <Activities />
                    </div>

                    {/* Right Column - Honors & Awards */}
                    <div>
                        <HonorsAwards />
                    </div>
                </div>
            </div>

            {/* Decorative Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/20 to-transparent blur-3xl pointer-events-none" />
        </main>
    );
};

export default Resume;
