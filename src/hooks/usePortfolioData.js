// src/hooks/usePortfolioData.js
import { useSupabaseQuery } from './useSupabaseQuery'

// Personal Info Hook
export const usePersonalInfo = () => {
    return useSupabaseQuery('personal_info', {
        limit: 1
    })
}

// Social Links Hook
export const useSocialLinks = () => {
    return useSupabaseQuery('social_links', {
        filter: { is_active: true },
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Roles Hook (cho typing animation)
export const useRoles = () => {
    return useSupabaseQuery('roles', {
        filter: { is_active: true },
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Skills Hook
export const useSkills = () => {
    return useSupabaseQuery('skills', {
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Projects Hook
export const useProjects = () => {
    return useSupabaseQuery('projects', {
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Certificates Hook
export const useCertificates = () => {
    return useSupabaseQuery('certificates', {
        orderBy: { column: 'display_order', ascending: true }
    })
}

// Navigation Items Hook
export const useNavigationItems = () => {
    return useSupabaseQuery('navigation_items', {
        filter: { is_active: true },
        orderBy: { column: 'display_order', ascending: true }
    })
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
    return useSupabaseQuery('projects_with_technologies', {
        orderBy: { column: 'display_order', ascending: true }
    })
}