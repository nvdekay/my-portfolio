import { motion } from "framer-motion";
import TimelineItem from "./TimelineItem";

const HonorsAwards = () => {
  const awards = [
    {
      title: "F-Talent Code 2025 - FPT University",
      dateRange: "10/2025",
      role: "Champion",
      links: [
        {
          text: "Competition Results",
          url: "https://svvn.tienphong.vn/quan-quan-fpt-talent-code-va-cu-but-toc-nam-2-dai-hoc-post1794998.tpo?fbclid=IwY2xjawOWvYBleHRuA2FlbQIxMABicmlkETFoR2xvejF3STNvcEV1ZDlQc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHlJn_7rRNkOHeiYZM5J3LrFdkY6KdkSdyuXupi5MMLPqwWppPvRTefLJg9JM_aem_Q2FJj40odGq0CRNHaYSs7A",
        },
      ],
      highlights: [
        "An algorithm contest organized by FPT University across the entire campus",
        "Demonstrated strong problem-solving and coding skills",
      ],
    },
    {
      title: "VPBank Technology Hackathon 2025",
      dateRange: "05/2025 - 08/2025",
      role: "Finalist - Impressive Product Award",
      highlights: [
        "Agent chatbot supports responding to customer comments on VPBank pages automatically",
        "Utilized advanced NLP techniques to enhance chatbot understanding and response accuracy",
        "Integrated the chatbot with VPBank's existing customer service systems to streamline operations",
        "Organizer: VPBank, AWS",
      ],
    },
    {
      title: "FPTU Student Achievement Awards",
      dateRange: "08/2024",
      role: "Excellent Student",
      highlights: [
        "Achieved excellent student award in summer 2024 semester and participated in regular student honor ceremonies",
        "Recognized for outstanding academic performance and contribution to university activities",
      ],
    },
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
