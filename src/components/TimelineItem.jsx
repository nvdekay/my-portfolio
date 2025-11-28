import { motion } from 'framer-motion';

const TimelineItem = ({ title, dateRange, role, description, highlights = [], index = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 pb-8 border-l-2 border-blue-500/30 last:pb-0"
        >
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 ring-4 ring-gray-900" />

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                {/* Header */}
                <div className="mb-3">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        <span className="text-blue-400">●</span>
                        {title}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-medium mb-2">
                        {dateRange}
                    </div>
                    {role && (
                        <p className="text-gray-300 italic text-sm font-medium">{role}</p>
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                        {description}
                    </p>
                )}

                {/* Highlights */}
                {highlights.length > 0 && (
                    <ul className="space-y-2">
                        {highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
                                <span className="leading-relaxed">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default TimelineItem;
