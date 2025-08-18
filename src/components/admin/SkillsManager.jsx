// src/components/admin/SkillsManager.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// =================================================================
// SKILLS MANAGER
// =================================================================
const SkillsManager = ({ onUpdate }) => {
    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    const [newSkill, setNewSkill] = useState({
        name: '',
        category: 'Programming languages',
        proficiency: 3,
        description: '',
        is_featured: false
    })

    const categories = [
        'Programming languages',
        'Libraries and frameworks',
        'Tools',
        'Databases',
        'DevOps',
        'Languages'
    ]

    useEffect(() => {
        fetchSkills()
    }, [])

    const fetchSkills = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setSkills(data || [])
        } catch (error) {
            console.error('Error fetching skills:', error)
        } finally {
            setLoading(false)
        }
    }

    const saveSkill = async () => {
        if (!newSkill.name) {
            alert('Please enter a skill name')
            return
        }

        try {
            let error
            if (editingItem) {
                ({ error } = await supabase
                    .from('skills')
                    .update(newSkill)
                    .eq('id', editingItem.id))
            } else {
                ({ error } = await supabase
                    .from('skills')
                    .insert([{
                        ...newSkill,
                        display_order: skills.length + 1
                    }]))
            }

            if (error) throw error

            setNewSkill({
                name: '',
                category: 'Programming languages',
                proficiency: 3,
                description: '',
                is_featured: false
            })
            setShowAddForm(false)
            setEditingItem(null)
            fetchSkills()
            onUpdate?.()

            alert(editingItem ? '✅ Skill updated!' : '✅ Skill added!')
        } catch (error) {
            console.error('Error saving skill:', error)
            alert('❌ Error saving skill: ' + error.message)
        }
    }

    const deleteSkill = async (id) => {
        if (!confirm('Delete this skill?')) return

        try {
            const { error } = await supabase
                .from('skills')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchSkills()
            onUpdate?.()
            alert('✅ Skill deleted!')
        } catch (error) {
            console.error('Error deleting skill:', error)
            alert('❌ Error deleting skill')
        }
    }

    const startEdit = (skill) => {
        setEditingItem(skill)
        setNewSkill({
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
            description: skill.description || '',
            is_featured: skill.is_featured
        })
        setShowAddForm(true)
    }

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = []
        acc[skill.category].push(skill)
        return acc
    }, {})

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">🛠️ Skills Manager</h2>
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm)
                            if (showAddForm) {
                                setEditingItem(null)
                                setNewSkill({
                                    name: '',
                                    category: 'Programming languages',
                                    proficiency: 3,
                                    description: '',
                                    is_featured: false
                                })
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAddForm ? '❌ Cancel' : '+ Add New Skill'}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-4">
                            {editingItem ? '✏️ Edit Skill' : '➕ Add New Skill'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Skill Name:</label>
                                <input
                                    type="text"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="ReactJS"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category:</label>
                                <select
                                    value={newSkill.category}
                                    onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Proficiency (1-5): {newSkill.proficiency}
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    value={newSkill.proficiency}
                                    onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newSkill.is_featured}
                                        onChange={(e) => setNewSkill({ ...newSkill, is_featured: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium">⭐ Featured Skill</span>
                                </label>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description:</label>
                                <textarea
                                    value={newSkill.description}
                                    onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                                    className="w-full p-2 border rounded h-20 focus:ring-2 focus:ring-blue-500"
                                    placeholder="3+ years experience with React hooks, Redux..."
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={saveSkill}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                {editingItem ? '💾 Update' : '✅ Add Skill'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Skills by Category */}
                {loading ? (
                    <div className="text-center py-8">Loading skills...</div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="border rounded-lg p-4">
                                <h3 className="font-semibold text-lg mb-3">
                                    {category} ({categorySkills.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {categorySkills.map((skill) => (
                                        <div key={skill.id} className="border rounded p-3 hover:shadow-sm transition-shadow">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-blue-600">
                                                    {skill.name}
                                                    {skill.is_featured && <span className="ml-1">⭐</span>}
                                                </h4>
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => startEdit(skill)}
                                                        className="text-blue-500 hover:text-blue-700 text-sm"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => deleteSkill(skill.id)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex items-center mb-2">
                                                <span className="text-sm text-gray-600 mr-2">Proficiency:</span>
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <span
                                                            key={star}
                                                            className={star <= skill.proficiency ? 'text-yellow-400' : 'text-gray-300'}
                                                        >
                                                            ⭐
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            {skill.description && (
                                                <p className="text-xs text-gray-600">{skill.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {skills.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No skills found. Add some skills to get started!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SkillsManager