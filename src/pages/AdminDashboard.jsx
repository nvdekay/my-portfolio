// src/pages/AdminDashboard.jsx - REFACTORING VERSION
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

import OverviewTab from '../components/admin/OverviewTab'
import KnowledgeBaseManager from '../components/admin/KnowledgeBaseManager'
import PersonalInfoManager from '../components/admin/PersonalInfoManager'
import SkillsManager from '../components/admin/SkillsManager'
import ProjectsManager from '../components/admin/ProjectsManager'
import CertificatesManager from '../components/admin/CertificatesManager'
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview')
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(true)

    const tabs = [
        { id: 'overview', name: 'Overview', icon: '📈' },
        { id: 'knowledge', name: 'Knowledge Base', icon: '💭' },
        { id: 'personal', name: 'Personal Info', icon: '📄' },
        { id: 'skills', name: 'Skills', icon: '⚡' },
        { id: 'projects', name: 'Projects', icon: '💼' },
        { id: 'certificates', name: 'Certificates', icon: '🎓' }
    ]

    useEffect(() => {
        testConnection()
        fetchStats()
    }, [])

    const testConnection = async () => {
        try {
            const { data, error } = await supabase.from('personal_info').select('count').limit(1)
            if (error) throw error
        } catch (error) {
            console.error('Supabase connection failed:', error)
            alert('Database connection failed: ' + error.message)
        }
    }

    const fetchStats = async () => {
        try {
            const [
                { count: knowledgeCount },
                { count: skillsCount },
                { count: projectsCount },
                { count: certificatesCount },
                { count: chatCount }
            ] = await Promise.all([
                supabase.from('chatbot_knowledge').select('*', { count: 'exact', head: true }),
                supabase.from('skills').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('certificates').select('*', { count: 'exact', head: true }),
                supabase.from('chat_history').select('*', { count: 'exact', head: true })
            ])

            setStats({
                knowledge: knowledgeCount || 0,
                skills: skillsCount || 0,
                projects: projectsCount || 0,
                certificates: certificatesCount || 0,
                chats: chatCount || 0
            })
        } catch (error) {
            console.error('Error fetching stats:', error)
        } finally {
            setLoading(false)
        }
    }

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab stats={stats} onRefresh={fetchStats} />
            case 'knowledge':
                return <KnowledgeBaseManager onUpdate={fetchStats} />
            case 'personal':
                return <PersonalInfoManager onUpdate={fetchStats} />
            case 'skills':
                return <SkillsManager onUpdate={fetchStats} />
            case 'projects':
                return <ProjectsManager onUpdate={fetchStats} />
            case 'certificates':
                return <CertificatesManager onUpdate={fetchStats} />
            default:
                return <OverviewTab stats={stats} onRefresh={fetchStats} />
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading Admin Dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">🤖 Portfolio Admin Dashboard</h1>
                            <p className="text-gray-600">Manage your portfolio data and chatbot knowledge</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={fetchStats}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                🔄 Refresh
                            </button>
                            <a
                                href="/"
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                ← Back to Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-64 flex-shrink-0">
                        <nav className="space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span className="text-lg mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderTabContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard