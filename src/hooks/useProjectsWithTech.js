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

                // Fetch projects với technologies using the view we created
                const { data, error } = await supabase
                    .from('projects_with_technologies')
                    .select('*')
                    .order('display_order')

                if (error) throw error

                setData(data)
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