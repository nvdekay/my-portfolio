import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

const HonorsAwards = () => {
    const awards = [
        {
            title: 'GenAI Hackathon 2024',
            dateRange: '06/2024 - 07/2024',
            role: 'First Prize',
            highlights: [
                'MindGPT - An AI application designed to offer intelligent suggestions and high personalization capabilities, creating intuitive and user-specific mindmaps',
                'Aims to improve learning efficiency, enhance creative thinking, and strengthen problem-solving skills',
                'Contributes to advancing the quality of education and fostering an innovative learning environment for future generations',
                'Competed against 20 teams and over 80 participants from across the country',
                'Organizer: FUNiX'
            ]
        },
        {
            title: 'VPBank Technology Hackathon 2024',
            dateRange: '04/2024 - 06/2024',
            role: 'Champion',
            highlights: [
                'An application designed to provide various functionalities to help users create and manage architecture design diagrams more effectively',
                'With the power of ChatGPT 4, our application can provide users the ability to create architecture design from scratch with a more interactive and user-friendly experience',
                'Beat over 150 teams from different Companies and Universities',
                'Organizer: VPBank, AWS',
                'Nam sinh viên IT giành quán quân cuộc thi, được đặc cách tuyển dụng dù chưa tốt nghiệp',
                'VPBank Technology Hackathon 2024 tìm ra nhà vô địch',
                'Chung kết cuộc thi Technology Hackathon 2024'
            ]
        },
        {
            title: 'F-Talent Code 2023',
            dateRange: '10/2023',
            role: 'Consolation Prize',
            highlights: [
                'An algorithm contest organized by FPT University across the entire campus',
                'Demonstrated strong problem-solving and coding skills'
            ]
        },
        {
            title: 'FPTU Student Achievement Awards',
            dateRange: '08/2023',
            role: 'Excellent Student',
            highlights: [
                'Achieved excellent student award in summer 2023 semester and participated in regular student honor ceremonies',
                'Recognized for outstanding academic performance and contribution to university activities'
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
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Honors & Awards
                </span>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-purple-500/50 to-transparent" />
            </h2>
            <div className="space-y-0">
                {awards.map((award, index) => (
                    <TimelineItem key={index} {...award} index={index} />
                ))}
            </div>
        </motion.section>
    );
};

export default HonorsAwards;
