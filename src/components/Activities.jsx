import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

const Activities = () => {
    const activities = [
        {
            title: 'JS Club - Japanese Software Engineers',
            dateRange: '01/2024 - Present',
            role: 'Head of Expertise Department Gen 12 | Member Of Expertise Department',
            highlights: [
                'Led and managed the Expertise Department, overseeing all technical activities and initiatives within the club',
                'Delegate tasks to club officer team, ensuring they understand their responsibilities and motivating them to succeed',
                'Organized tech workshops and coding competitions for club members'
            ]
        },
        {
            title: 'Coding Inspiration 2023',
            dateRange: '07/2023 - 08/2023',
            role: 'Deputy Event Organizer',
            highlights: [
                'Led logistical planning and coordination',
                'Managed team of volunteers effectively',
                'Facilitated participant engagement and networking'
            ]
        }
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
        >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Activities
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-blue-500/50 to-transparent" />
            </h2>
            <div className="space-y-0">
                {activities.map((activity, index) => (
                    <TimelineItem key={index} {...activity} index={index} />
                ))}
            </div>
        </motion.section>
    );
};

export default Activities;
