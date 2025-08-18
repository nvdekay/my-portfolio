// src/components/admin/PersonalInfoManager.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const PersonalInfoManager = ({ onUpdate }) => {
    const [personalInfo, setPersonalInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchPersonalInfo()
    }, [])

    const fetchPersonalInfo = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('personal_info')
                .select('*')
                .limit(1)

            if (error && error.code !== 'PGRST116') throw error
            setPersonalInfo(data?.[0] || {})
        } catch (error) {
            console.error('Error fetching personal info:', error)
        } finally {
            setLoading(false)
        }
    }

    const savePersonalInfo = async () => {
        setSaving(true)
        try {
            let error
            if (personalInfo.id) {
                ({ error } = await supabase
                    .from('personal_info')
                    .update(personalInfo)
                    .eq('id', personalInfo.id))
            } else {
                const { data, error: insertError } = await supabase
                    .from('personal_info')
                    .insert([personalInfo])
                    .select()
                error = insertError
                if (data) setPersonalInfo(data[0])
            }

            if (error) throw error

            alert('✅ Personal info updated successfully!')
            onUpdate?.()
        } catch (error) {
            console.error('Error saving personal info:', error)
            alert('❌ Error saving personal info: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const updateField = (field, value) => {
        setPersonalInfo(prev => ({
            ...prev,
            [field]: value
        }))
    }

    if (loading) {
        return <div className="text-center py-8">Loading personal information...</div>
    }

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">👤 Personal Information</h2>
                <button
                    onClick={savePersonalInfo}
                    disabled={saving}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    {saving ? '⏳ Saving...' : '💾 Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Full Name:</label>
                    <input
                        type="text"
                        value={personalInfo.name || ''}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nguyen Vu Dang Khanh"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Display Name:</label>
                    <input
                        type="text"
                        value={personalInfo.display_name || ''}
                        onChange={(e) => updateField('display_name', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Nguyen Vu Dang Khanh"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Professional Title:</label>
                    <input
                        type="text"
                        value={personalInfo.title || ''}
                        onChange={(e) => updateField('title', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Stack Developer"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input
                        type="email"
                        value={personalInfo.email || ''}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="your-email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Location:</label>
                    <input
                        type="text"
                        value={personalInfo.location || ''}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Hanoi, Vietnam"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Avatar URL:</label>
                    <input
                        type="url"
                        value={personalInfo.avatar_url || ''}
                        onChange={(e) => updateField('avatar_url', e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="/assets/images/avatars/avthero.jpg"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Bio:</label>
                    <textarea
                        value={personalInfo.bio || ''}
                        onChange={(e) => updateField('bio', e.target.value)}
                        className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500"
                        placeholder="I am always open to discussing new projects..."
                    />
                </div>
            </div>
        </div>
    )
}

export default PersonalInfoManager