// src/services/contactService.js
import { supabase } from '../lib/supabase'

export class ContactService {
    // Save contact message to Supabase
    static async saveContactMessage(name, email, message) {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .insert([{
                    name: name,
                    email: email,
                    message: message,
                    is_read: false
                }])
                .select()

            if (error) throw error

            return { success: true, data }
        } catch (error) {
            console.error('Error saving contact message:', error)
            return { success: false, error: error.message }
        }
    }

    // Get all contact messages (for admin)
    static async getAllMessages() {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            return { success: true, data }
        } catch (error) {
            console.error('Error fetching contact messages:', error)
            return { success: false, error: error.message }
        }
    }

    // Mark message as read
    static async markAsRead(messageId) {
        try {
            const { data, error } = await supabase
                .from('contact_messages')
                .update({ is_read: true, replied_at: new Date().toISOString() })
                .eq('id', messageId)
                .select()

            if (error) throw error

            return { success: true, data }
        } catch (error) {
            console.error('Error marking message as read:', error)
            return { success: false, error: error.message }
        }
    }
}

export default ContactService
