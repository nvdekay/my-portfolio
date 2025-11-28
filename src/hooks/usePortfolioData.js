// src/hooks/usePortfolioData.js
import { useSupabaseQuery } from './useSupabaseQuery'

// Profile Hook (thay thế Personal Info)
export const usePersonalInfo = () => {
    return useSupabaseQuery('profile', {
        limit: 1
    })
}

// Content Blocks Hook - Generic hook for all content types
export const useContentBlocks = (type) => {
    return useSupabaseQuery('content_blocks', {
        select: '*',
        filter: { type: type },
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Roles Hook (từ content_blocks với type='role')
export const useRoles = () => {
    const { data, loading, error } = useContentBlocks('role')
    return {
        data: data?.map(item => ({
            id: item.id,
            title: item.title,
            display_order: item.display_order
        })),
        loading,
        error
    }
}

// Skills Hook (từ content_blocks với type='skill')
export const useSkills = () => {
    const { data, loading, error } = useContentBlocks('skill')
    return {
        data: data?.map(item => ({
            id: item.id,
            name: item.title,
            category: item.metadata?.category || item.subtitle || 'General',
            level: item.metadata?.level || '',
            display_order: item.display_order,
            is_featured: item.is_featured
        })),
        loading,
        error
    }
}

// Projects Hook (từ content_blocks với type='project')
export const useProjects = () => {
    const { data, loading, error } = useContentBlocks('project')
    return {
        data: data?.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image_url: item.url,
            demo_url: item.metadata?.demo_url || '',
            github_url: item.metadata?.github_url || '',
            type: item.metadata?.type || 'WEB',
            display_order: item.display_order,
            created_at: item.created_at
        })),
        loading,
        error
    }
}

// Certificates Hook (từ content_blocks với type='certificate')
export const useCertificates = () => {
    const { data, loading, error } = useContentBlocks('certificate')
    return {
        data: data?.map(item => ({
            id: item.id,
            title: item.title,
            issuer: item.subtitle || '',
            description: item.description,
            image_url: item.url,
            link: item.metadata?.link || '',
            display_order: item.display_order
        })),
        loading,
        error
    }
}

// Site Settings Hook
export const useSiteSettings = () => {
    const { data, loading, error } = useSupabaseQuery('site_settings')

    // Convert array to object for easier access
    const settings = data ? data.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value
        return acc
    }, {}) : {}

    return { data: settings, loading, error }
}

// Projects with Technologies Hook
export const useProjectsWithTech = () => {
    const { data, loading, error } = useContentBlocks('project')
    
    return {
        data: data?.map(item => {
            // Parse metadata nếu là string
            const metadata = typeof item.metadata === 'string' 
                ? JSON.parse(item.metadata) 
                : (item.metadata || {});
            
            // Parse url field - nó là JSONB object chứa img_url, web_url, github_url
            let urlData = item.url;
            if (typeof urlData === 'string') {
                try {
                    urlData = JSON.parse(urlData);
                } catch (e) {
                    urlData = {};
                }
            } else if (!urlData) {
                urlData = {};
            }
            
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                long_description: item.long_description,
                // Lấy từ url JSONB object
                image_url: urlData.img_url || '',
                url: urlData.web_url || '',
                github_url: urlData.github_url || '',
                // Lấy category và tech_stack từ metadata JSONB
                category: metadata.category || 'website',
                tech_stack: metadata.tech_stack || [],
                // Lấy dates từ metadata
                start_date: metadata.start_date || '',
                end_date: metadata.end_date || '',
                duration_months: metadata.duration_months || 0,
                // Các fields khác
                display_order: item.display_order,
                is_featured: item.is_featured,
                created_at: item.created_at,
                updated_at: item.updated_at
            };
        }),
        loading,
        error
    }
}