// src/components/admin/CertificatesManager.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

// =================================================================
// CERTIFICATES MANAGER
// =================================================================
const CertificatesManager = ({ onUpdate }) => {
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)

    const [newCert, setNewCert] = useState({
        title: '',
        issuer: '',
        description: '',
        image_url: '',
        certificate_url: '',
        is_featured: false
    })

    useEffect(() => {
        fetchCertificates()
    }, [])

    const fetchCertificates = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('certificates')
                .select('*')
                .order('display_order', { ascending: true })

            if (error) throw error
            setCertificates(data || [])
        } catch (error) {
            console.error('Error fetching certificates:', error)
        } finally {
            setLoading(false)
        }
    }

    const saveCertificate = async () => {
        if (!newCert.title || !newCert.issuer) {
            alert('Please fill in title and issuer')
            return
        }

        try {
            let error
            if (editingItem) {
                ({ error } = await supabase
                    .from('certificates')
                    .update(newCert)
                    .eq('id', editingItem.id))
            } else {
                ({ error } = await supabase
                    .from('certificates')
                    .insert([{
                        ...newCert,
                        display_order: certificates.length + 1
                    }]))
            }

            if (error) throw error

            setNewCert({
                title: '',
                issuer: '',
                description: '',
                image_url: '',
                certificate_url: '',
                is_featured: false
            })
            setShowAddForm(false)
            setEditingItem(null)
            fetchCertificates()
            onUpdate?.()

            alert(editingItem ? '✅ Certificate updated!' : '✅ Certificate added!')
        } catch (error) {
            console.error('Error saving certificate:', error)
            alert('❌ Error saving certificate: ' + error.message)
        }
    }

    const deleteCertificate = async (id) => {
        if (!confirm('Delete this certificate?')) return

        try {
            const { error } = await supabase
                .from('certificates')
                .delete()
                .eq('id', id)

            if (error) throw error
            fetchCertificates()
            onUpdate?.()
            alert('✅ Certificate deleted!')
        } catch (error) {
            console.error('Error deleting certificate:', error)
            alert('❌ Error deleting certificate')
        }
    }

    const startEdit = (cert) => {
        setEditingItem(cert)
        setNewCert({
            title: cert.title,
            issuer: cert.issuer,
            description: cert.description || '',
            image_url: cert.image_url || '',
            certificate_url: cert.certificate_url || '',
            is_featured: cert.is_featured
        })
        setShowAddForm(true)
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">🏆 Certificates Manager</h2>
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm)
                            if (showAddForm) {
                                setEditingItem(null)
                                setNewCert({
                                    title: '',
                                    issuer: '',
                                    description: '',
                                    image_url: '',
                                    certificate_url: '',
                                    is_featured: false
                                })
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAddForm ? '❌ Cancel' : '+ Add New Certificate'}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-4">
                            {editingItem ? '✏️ Edit Certificate' : '➕ Add New Certificate'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Certificate Title:</label>
                                <input
                                    type="text"
                                    value={newCert.title}
                                    onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Web Development Certificate"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Issuer:</label>
                                <input
                                    type="text"
                                    value={newCert.issuer}
                                    onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="Coursera"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description:</label>
                                <textarea
                                    value={newCert.description}
                                    onChange={(e) => setNewCert({ ...newCert, description: e.target.value })}
                                    className="w-full p-2 border rounded h-20 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Certificate description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL:</label>
                                <input
                                    type="url"
                                    value={newCert.image_url}
                                    onChange={(e) => setNewCert({ ...newCert, image_url: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="/assets/images/certificates/cert.png"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Certificate URL:</label>
                                <input
                                    type="url"
                                    value={newCert.certificate_url}
                                    onChange={(e) => setNewCert({ ...newCert, certificate_url: e.target.value })}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://coursera.org/verify/..."
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newCert.is_featured}
                                        onChange={(e) => setNewCert({ ...newCert, is_featured: e.target.checked })}
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium">⭐ Featured Certificate</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={saveCertificate}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                {editingItem ? '💾 Update' : '✅ Add Certificate'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Certificates List */}
                {loading ? (
                    <div className="text-center py-8">Loading certificates...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {certificates.map((cert) => (
                            <div key={cert.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                                {cert.image_url && (
                                    <img
                                        src={cert.image_url}
                                        alt={cert.title}
                                        className="w-full h-32 object-cover rounded mb-3"
                                    />
                                )}
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-blue-600">
                                        {cert.title}
                                        {cert.is_featured && <span className="ml-1">⭐</span>}
                                    </h3>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => startEdit(cert)}
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteCertificate(cert.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 font-medium mb-1">{cert.issuer}</p>
                                <p className="text-sm text-gray-600 mb-2">{cert.description}</p>
                                {cert.certificate_url && (
                                    <div className="mt-2">
                                        <a
                                            href={cert.certificate_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline text-sm"
                                        >
                                            🔗 View Certificate
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                        {certificates.length === 0 && (
                            <div className="col-span-full text-center py-8 text-gray-500">
                                No certificates found. Add some certificates to showcase your achievements!
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CertificatesManager