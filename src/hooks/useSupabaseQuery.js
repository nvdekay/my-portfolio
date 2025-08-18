// src/hooks/useSupabaseQuery.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useSupabaseQuery = (table, query = {}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                let supabaseQuery = supabase.from(table).select(query.select || '*')

                // Add filters if provided
                if (query.filter) {
                    Object.entries(query.filter).forEach(([key, value]) => {
                        supabaseQuery = supabaseQuery.eq(key, value)
                    })
                }

                // Add ordering if provided
                if (query.orderBy) {
                    supabaseQuery = supabaseQuery.order(query.orderBy.column, {
                        ascending: query.orderBy.ascending ?? true
                    })
                }

                // Add limit if provided
                if (query.limit) {
                    supabaseQuery = supabaseQuery.limit(query.limit)
                }

                const { data, error } = await supabaseQuery

                if (error) throw error

                setData(data)
            } catch (err) {
                console.error('Supabase query error:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [table, JSON.stringify(query)])

    return { data, loading, error, refetch: () => fetchData() }
}