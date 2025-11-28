import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

const WorkExperience = () => {
    const experiences = [
        {
            title: 'VPBank',
            dateRange: '09/2025 - Present',
            role: 'Fullstack Developer',
            highlights: [
                'Was specially recruited after winning VPBank Technology Hackathon 2024',
                'Developing CAIP (Conversation AI Platform) for VPBank to improving customer experience',
                'Developing and maintaining both front-end and back-end features of the business customer application, ensuring seamless user experiences',
                'Optimizing application performance and troubleshooting issues to enhance reliability and efficiency',
                'Conducting thorough testing and debugging to maintain code integrity and ensure robust deployment'
            ]
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Work Experience
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent" />
            </h2>
            <div className="space-y-0">
                {experiences.map((exp, index) => (
                    <TimelineItem key={index} {...exp} index={index} />
                ))}
            </div>
        </motion.section>
    );
};

export default WorkExperience;
