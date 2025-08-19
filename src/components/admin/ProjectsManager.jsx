// src/components/admin/ProjectsManager.jsx
import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faTimes,
    faEdit,
    faTrash,
    faSave,
    faSpinner,
    faStar,
    faChevronLeft,
    faChevronRight,
    faCheckCircle,
    faExclamationCircle,
    faRocket
} from '@fortawesome/free-solid-svg-icons'

const ProjectsManager = ({ onUpdate }) => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [saving, setSaving] = useState(false)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image_url: '',
        demo_url: '',
        github_url: '',
        status: 'completed',
        is_featured: false,
        technologies: ''
    })

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('projects_with_technologies')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) throw error
            setProjects(data || [])
        } catch (error) {
            console.error('Error fetching projects:', error)
        } finally {
            setLoading(false)
        }
    }

    const saveProject = async () => {
        if (!newProject.title || !newProject.description) {
            alert('Please fill in title and description')
            return
        }

        setSaving(true)
        let projectId
        try {
            const techNames = newProject.technologies
                .split(',')
                .map((name) => name.trim())
                .filter((name) => name.length > 0)

            const techIds = []
            for (const techName of techNames) {
                const { data: existingTech, error: techError } = await supabase
                    .from('technologies')
                    .select('id')
                    .eq('name', techName)
                    .limit(1)

                if (techError) throw techError

                let techId
                if (existingTech && existingTech.length > 0) {
                    techId = existingTech[0].id
                } else {
                    const { data: newTech, error: newTechError } = await supabase
                        .from('technologies')
                        .insert([{ name: techName }])
                        .select('id')
                        .single()
                    if (newTechError) throw newTechError
                    techId = newTech.id
                }
                techIds.push(techId)
            }

            const { technologies, ...projectData } = newProject

            if (editingItem) {
                const { error } = await supabase
                    .from('projects')
                    .update(projectData)
                    .eq('id', editingItem.id)
                if (error) throw error
                projectId = editingItem.id
            } else {
                const { data, error: insertError } = await supabase
                    .from('projects')
                    .insert([{ ...projectData }])
                    .select()
                if (insertError) throw insertError
                projectId = data[0].id
            }

            if (projectId) {
                const { error: deleteError } = await supabase
                    .from('project_technologies')
                    .delete()
                    .eq('project_id', projectId)
                if (deleteError) throw deleteError

                if (techIds.length > 0) {
                    const newTechLinks = techIds.map((techId) => ({
                        project_id: projectId,
                        technology_id: techId,
                    }))
                    const { error: insertTechError } = await supabase
                        .from('project_technologies')
                        .insert(newTechLinks)
                    if (insertTechError) throw insertTechError
                }
            }

            alert(editingItem ? '✅ Project updated!' : '✅ Project added!')
            resetForm()
            fetchProjects()
            onUpdate?.()
        } catch (error) {
            console.error('Error saving project:', error)
            alert('❌ Error saving project: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const deleteProject = async (id) => {
        if (!confirm('Delete this project?')) return
        try {
            const { error } = await supabase.from('projects').delete().eq('id', id)
            if (error) throw error
            fetchProjects()
            onUpdate?.()
            alert('✅ Project deleted!')
        } catch (error) {
            console.error('Error deleting project:', error)
            alert('❌ Error deleting project')
        }
    }

    const startEdit = (project) => {
        setEditingItem(project)
        const techString = project.technologies
            .map((tech) => tech.name)
            .join(', ')
        setNewProject({
            title: project.title,
            description: project.description,
            image_url: project.image_url || '',
            demo_url: project.demo_url || '',
            github_url: project.github_url || '',
            status: project.status,
            is_featured: project.is_featured,
            technologies: techString,
        })
        setShowAddForm(true)
    }

    const resetForm = () => {
        setNewProject({
            title: '',
            description: '',
            image_url: '',
            demo_url: '',
            github_url: '',
            status: 'completed',
            is_featured: false,
            technologies: '',
        })
        setEditingItem(null)
        setShowAddForm(false)
    }

    // Pagination helpers
    const totalPages = Math.ceil(projects.length / pageSize)
    const paginatedProjects = projects.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        <FontAwesomeIcon icon={faRocket} className="mr-2" />Projects Manager
                    </h2>
                    <button
                        onClick={() => {
                            if (showAddForm) {
                                resetForm()
                            } else {
                                setShowAddForm(true)
                            }
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showAddForm ? (
                            <>
                                <FontAwesomeIcon icon={faTimes} /> Cancel
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faPlus} /> Add New Project
                            </>
                        )}
                    </button>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-semibold mb-4">
                            {editingItem ? (
                                <>
                                    <FontAwesomeIcon icon={faEdit} /> Edit Project
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faPlus} /> Add New Project
                                </>
                            )}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Project Title:</label>
                                <input
                                    type="text"
                                    value={newProject.title}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, title: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="My Awesome Project"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status:</label>
                                <select
                                    value={newProject.status}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, status: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="planned">Planned</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Description:</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, description: e.target.value })
                                    }
                                    className="w-full p-2 border rounded h-20 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Project description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL:</label>
                                <input
                                    type="url"
                                    value={newProject.image_url}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, image_url: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="/assets/images/projects/project.png"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Demo URL:</label>
                                <input
                                    type="url"
                                    value={newProject.demo_url}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, demo_url: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://project-demo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub URL:</label>
                                <input
                                    type="url"
                                    value={newProject.github_url}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, github_url: e.target.value })
                                    }
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://github.com/user/repo"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">
                                    Technologies (comma-separated):
                                </label>
                                <textarea
                                    value={newProject.technologies}
                                    onChange={(e) =>
                                        setNewProject({ ...newProject, technologies: e.target.value })
                                    }
                                    className="w-full p-2 border rounded h-20 focus:ring-2 focus:ring-blue-500"
                                    placeholder="React, Tailwind CSS, Supabase"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newProject.is_featured}
                                        onChange={(e) =>
                                            setNewProject({ ...newProject, is_featured: e.target.checked })
                                        }
                                        className="mr-2"
                                    />
                                    <span className="text-sm font-medium">
                                        <FontAwesomeIcon icon={faStar} /> Featured Project
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={saveProject}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin /> Saving...
                                    </>
                                ) : editingItem ? (
                                    <>
                                        <FontAwesomeIcon icon={faSave} /> Update
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faSave} /> Add Project
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Projects List */}
                {loading ? (
                    <div className="text-center py-8">Loading projects...</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {paginatedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                                >
                                    {project.image_url && (
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-32 object-cover rounded mb-3"
                                        />
                                    )}
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-blue-600">
                                            {project.title}
                                            {project.is_featured && (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className="ml-1 text-yellow-500"
                                                />
                                            )}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => startEdit(project)}
                                                className="text-blue-500 hover:text-blue-700 text-sm"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button
                                                onClick={() => deleteProject(project.id)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {project.description}
                                    </p>
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {project.technologies.map((tech) => (
                                                <span
                                                    key={tech.id}
                                                    className="px-2 py-1 rounded-full text-xs font-medium"
                                                    style={{
                                                        backgroundColor: tech.color || '#e5e7eb',
                                                        color: tech.color ? '#333' : '#6b7280',
                                                    }}
                                                >
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-full text-center py-8 text-gray-500">
                                    No projects found. Add some projects to showcase your work!
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.max(1, p - 1))
                                    }
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    <FontAwesomeIcon icon={faChevronLeft} /> Prev
                                </button>
                                <span>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded disabled:opacity-50"
                                >
                                    Next <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectsManager