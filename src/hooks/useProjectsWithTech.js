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
                // Parse metadata JSON if it's a stringƯE
                const transformedData = projectsData?.map(item => {
                    // Parse metadata nếu cần
                    const metadata = typeof item.metadata === 'string' 
                        ? JSON.parse(item.metadata) 
                        : (item.metadata || {});
                    
                    // Parse url nếu là JSON (một số database có thể lưu url dạng JSONB)
                    let urlData = item.url;
                    if (typeof urlData === 'string' && urlData.startsWith('{')) {
                        try {
                            urlData = JSON.parse(urlData);
                        } catch (e) {
                            // Nếu parse failed, giữ nguyên string
                        }
                    }

                    return {
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        long_description: item.long_description,
                        // Nếu url là object, lấy các fields từ đó, nếu không dùng làm image_url
                        image_url: typeof urlData === 'object' ? (urlData.image_url || '') : (urlData || ''),
                        url: typeof urlData === 'object' ? (urlData.website_url || urlData.url || '') : '',
                        github_url: typeof urlData === 'object' ? (urlData.github_url || '') : (metadata.github_url || ''),
                        demo_url: metadata.demo_url || '',
                        // Lấy thông tin từ metadata
                        category: metadata.category || 'website',
                        tech_stack: metadata.tech_stack || [],
                        start_date: metadata.start_date || '',
                        end_date: metadata.end_date || '',
                        duration_months: metadata.duration_months || 0,
                        // Các fields khác
                        display_order: item.display_order,
                        is_featured: item.is_featured,
                        created_at: item.created_at,
                        updated_at: item.updated_at
                    };
                }) || []

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