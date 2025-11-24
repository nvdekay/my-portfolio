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

// Social Links Hook (từ content_blocks với type='social')
export const useSocialLinks = () => {
    const { data, loading, error } = useContentBlocks('social')
    return { 
        data: data?.map(item => ({
            id: item.id,
            platform: item.title,
            url: item.url,
            icon_url: item.metadata?.icon_url || '',
            display_order: item.display_order
        })),
        loading,
        error
    }
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
        data: data?.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            image_url: item.url,
            demo_url: item.metadata?.demo_url || '',
            github_url: item.metadata?.github_url || '',
            type: item.metadata?.type || 'WEB',
            technologies: item.metadata?.technologies || [],
            display_order: item.display_order,
            created_at: item.created_at
        })),
        loading,
        error
    }
}