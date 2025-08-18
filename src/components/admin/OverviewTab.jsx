// src/components/admin/OverviewTab.jsx
import React from 'react'
import { motion } from 'framer-motion'

const OverviewTab = ({ stats, onRefresh }) => {
    const statCards = [
        { title: 'Knowledge Base', count: stats.knowledge, icon: '🧠', color: 'blue' },
        { title: 'Skills', count: stats.skills, icon: '🛠️', color: 'green' },
        { title: 'Projects', count: stats.projects, icon: '🚀', color: 'purple' },
        { title: 'Certificates', count: stats.certificates, icon: '🏆', color: 'yellow' },
        { title: 'Chat Messages', count: stats.chats, icon: '💬', color: 'pink' }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {statCards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg p-6 shadow-sm border"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{card.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{card.count || 0}</p>
                                </div>
                                <div className="text-3xl">{card.icon}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">🚀 Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickActionButton
                        title="Add Knowledge"
                        description="Add Q&A for chatbot"
                        icon="💭"
                        onClick={() => window.location.hash = '#knowledge'}
                    />
                    <QuickActionButton
                        title="Update Personal Info"
                        description="Edit your details"
                        icon="👤"
                        onClick={() => window.location.hash = '#personal'}
                    />
                    <QuickActionButton
                        title="Add New Project"
                        description="Showcase your work"
                        icon="🚀"
                        onClick={() => window.location.hash = '#projects'}
                    />
                </div>
            </div>
        </div>
    )
}

const QuickActionButton = ({ title, description, icon, onClick }) => (
    <button
        onClick={onClick}
        className="text-left p-4 border rounded-lg hover:bg-gray-50 transition-colors"
    >
        <div className="text-2xl mb-2">{icon}</div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
    </button>
)

export default OverviewTab