// src/components/admin/KnowledgeBaseManager.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const KnowledgeBaseManager = ({ onUpdate }) => {
    const [knowledge, setKnowledge] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    const [newEntry, setNewEntry] = useState({
        question: '',
        answer: '',
        category: 'general',
        keywords: ''
    })

    useEffect(() => {
        fetchKnowledge()
    }, [])

    const fetchKnowledge = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('chatbot_knowledge')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setKnowledge(data || [])
        } catch (error) {
            console.error('Error fetching knowledge:', error)
            alert('❌ Error loading knowledge base')
        } finally {
            setLoading(false)
        }
    }

    const saveEntry = async () => {
        if (!newEntry.question || !newEntry.answer) {
            alert('Please fill in both question and answer')
            return
        }

        try {
            const keywordsArray = newEntry.keywords
                ? newEntry.keywords.split(',').map(k => k.trim()).filter(k => k)
                : []

            const entryData = {
                question: newEntry.question,
                answer: newEntry.answer,
                category: newEntry.category,
                keywords: keywordsArray,
                is_active: true
            }

            let error
            if (editingItem) {
                ({ error } = await supabase
                    .from('chatbot_knowledge')
                    .update(entryData)
                    .eq('id', editingItem.id))
            } else {
                ({ error } = await supabase
                    .from('chatbot_knowledge')
                    .insert([entryData]))
            }

            if (error) throw error

            // Reset form
            setNewEntry({ question: '', answer: '', category: 'general', keywords: '' })
            setShowAddForm(false)
            setEditingItem(null)
            fetchKnowledge()
            onUpdate?.()

            alert(editingItem ? '✅ Knowledge updated!' : '✅ Knowledge added!')
        } catch (error) {
            console.error('Error saving entry:', error)
            alert('❌ Error saving entry: ' + error.message)
        }
    }

    const deleteEntry = async (id) => {
        if (!confirm('Are you sure you want to delete this entry?')) return

        try {
            const { error } = await supabase
                .from('chatbot_knowledge')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchKnowledge()
            onUpdate?.()
            alert('✅ Knowledge deleted!')
        } catch (error) {
            console.error('Error deleting entry:', error)
            alert('❌ Error deleting entry')
        }
    }

    const startEdit = (item) => {
        setEditingItem(item)
        setNewEntry({
            question: item.question,
            answer: item.answer,
            category: item.category,
            keywords: item.keywords?.join(', ') || ''
        })
        setShowAddForm(true)
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">🧠 Knowledge Base Manager</h2>
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm)
                            if (showAddForm) {
                                setEditingItem(null)
                                setNewEntry({ question: '', answer: '', category: 'general', keywords: '' })
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAddForm ? '❌ Cancel' : '+ Add New Q&A'}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-4">
                            {editingItem ? '✏️ Edit Q&A' : '➕ Add New Q&A'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Question:</label>
                                <input
                                    type="text"
                                    value={newEntry.question}
                                    onChange={(e) => setNewEntry({ ...newEntry, question: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Bạn có kỹ năng gì?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category:</label>
                                <select
                                    value={newEntry.category}
                                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="general">General</option>
                                    <option value="personal">Personal</option>
                                    <option value="skills">Skills</option>
                                    <option value="projects">Projects</option>
                                    <option value="certificates">Certificates</option>
                                    <option value="career">Career</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Answer:</label>
                                <textarea
                                    value={newEntry.answer}
                                    onChange={(e) => setNewEntry({ ...newEntry, answer: e.target.value })}
                                    className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tôi có kinh nghiệm với ReactJS, Spring Boot..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Keywords (comma separated):</label>
                                <input
                                    type="text"
                                    value={newEntry.keywords}
                                    onChange={(e) => setNewEntry({ ...newEntry, keywords: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="kỹ năng, skills, react, java"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={saveEntry}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                            >
                                {editingItem ? '💾 Update' : '✅ Add Entry'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Knowledge List */}
                {loading ? (
                    <div className="text-center py-8">Loading knowledge base...</div>
                ) : (
                    <div className="space-y-4">
                        {knowledge.map((item) => (
                            <div key={item.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                {item.category}
                                            </span>
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                                {item.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-blue-600 mb-1">
                                            Q: {item.question}
                                        </h3>
                                        <p className="text-gray-700 mb-2">
                                            A: {item.answer}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Keywords: {item.keywords?.join(', ') || 'None'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => startEdit(item)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEntry(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {knowledge.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No knowledge entries found. Add some Q&A to get started!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default KnowledgeBaseManager