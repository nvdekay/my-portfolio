// src/hooks/useProjectsWithTech.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useProjectsWithTech = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProjectsWithTech = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch projects from content_blocks with type='project'
                const { data: projectsData, error: projectsError } = await supabase
                    .from('content_blocks')
                    .select('*')
                    .eq('type', 'project')
                    .order('display_order')

                if (projectsError) throw projectsError

                // Transform data to match expected format
                const transformedData = projectsData?.map(item => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    long_description: item.long_description,
                    image_url: item.url,
                    demo_url: item.metadata?.demo_url || '',
                    github_url: item.metadata?.github_url || '',
                    type: item.metadata?.type || 'WEB',
                    technologies: item.metadata?.technologies || [],
                    display_order: item.display_order,
                    is_featured: item.is_featured,
                    created_at: item.created_at,
                    updated_at: item.updated_at
                })) || []

                setData(transformedData)
            } catch (err) {
                console.error('Error fetching projects with technologies:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchProjectsWithTech()
    }, [])

    return { data, loading, error }
}