import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

const Education = () => {
    const education = [
        {
            title: 'FPT University',
            dateRange: '09/2023 - Present',
            role: 'Bachelor of Software Engineering',
            description: 'Focused on software development, algorithms, and modern web technologies. Achieved excellent academic performance and participated in various tech competitions.',
            highlights: [
                'GPA: 3.5/4.0',
                'Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems',
                'Member of Japanese Software Engineers Club (JS Club)'
            ]
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Education
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent" />
            </h2>
            <div className="space-y-0">
                {education.map((edu, index) => (
                    <TimelineItem key={index} {...edu} index={index} />
                ))}
            </div>
        </motion.section>
    );
};

export default Education;
