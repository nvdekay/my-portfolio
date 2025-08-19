// src/services/chatbotService.js
import { supabase } from '../lib/supabase'

let genAI = null

export class ChatbotService {
    // Get portfolio context từ Supabase
    static async getPortfolioContext() {
        try {
            const [
                { data: personalInfo },
                { data: skills },
                { data: projects },
                { data: certificates },
                { data: socialLinks },
                { data: knowledgeBase }
            ] = await Promise.all([
                supabase.from('personal_info').select('*').limit(1),
                supabase.from('skills').select('*'),
                supabase.from('projects').select('*'),
                supabase.from('certificates').select('*'),
                supabase.from('social_links').select('*'),
                supabase.from('chatbot_knowledge').select('*').eq('is_active', true)
            ])

            return {
                personalInfo: personalInfo?.[0],
                skills,
                projects,
                certificates,
                socialLinks,
                knowledgeBase
            }
        } catch (error) {
            console.error('Error fetching portfolio context:', error)
            return {
                personalInfo: { name: 'Nguyễn Vũ Đăng Khánh', title: 'Full Stack Developer' },
                skills: [],
                projects: [],
                certificates: [],
                socialLinks: [],
                knowledgeBase: []
            }
        }
    }

    // Search relevant knowledge from database
    static searchKnowledge(query, knowledgeBase) {
        if (!knowledgeBase || knowledgeBase.length === 0) return []

        const lowercaseQuery = query.toLowerCase()

        return knowledgeBase.filter(item => {
            const questionMatch = item.question.toLowerCase().includes(lowercaseQuery)
            const answerMatch = item.answer.toLowerCase().includes(lowercaseQuery)
            const keywordMatch = item.keywords?.some(keyword =>
                lowercaseQuery.includes(keyword.toLowerCase()) ||
                keyword.toLowerCase().includes(lowercaseQuery)
            )

            return questionMatch || answerMatch || keywordMatch
        })
    }

    // RULE-BASED RESPONSES (FALLBACK)
    static generateRuleBasedResponse(userMessage, context) {
        const { personalInfo, skills, projects, certificates } = context
        const lowercaseMessage = userMessage.toLowerCase()

        // Check knowledge base first
        const relevantKnowledge = this.searchKnowledge(userMessage, context.knowledgeBase || [])
        if (relevantKnowledge.length > 0) {
            return relevantKnowledge[0].answer + ' 😊'
        }

        // Personal info questions
        if (lowercaseMessage.includes('tên') || lowercaseMessage.includes('name') || lowercaseMessage.includes('bạn là ai')) {
            return `Xin chào! Tôi là ${personalInfo?.display_name || 'Nguyễn Vũ Đăng Khánh'}, một ${personalInfo?.title || 'Full Stack Developer'}. Rất vui được gặp bạn! 👋\n\nBạn muốn biết gì về kỹ năng, dự án hay kinh nghiệm của tôi?`
        }

        // Skills questions
        if (lowercaseMessage.includes('kỹ năng') || lowercaseMessage.includes('skill') || lowercaseMessage.includes('công nghệ')) {
            const featuredSkills = skills?.filter(s => s.is_featured)?.map(s => s.name) || ['ReactJS', 'Spring Boot', 'JavaScript', 'TailwindCSS']
            return `Tôi có kinh nghiệm với các công nghệ chính sau: 🛠️\n\n${featuredSkills.map(skill => `• ${skill}`).join('\n')}\n\nBạn muốn biết chi tiết về công nghệ nào cụ thể?`
        }

        // Projects questions
        if (lowercaseMessage.includes('dự án') || lowercaseMessage.includes('project') || lowercaseMessage.includes('làm gì')) {
            const featuredProjects = projects?.filter(p => p.is_featured)?.map(p => p.title) || ['Portfolio Website', 'Event Management System', 'E-commerce Platform']
            return `Tôi đã thực hiện nhiều dự án thú vị: 🚀\n\n${featuredProjects.map(project => `• ${project}`).join('\n')}\n\nBạn muốn xem demo hay tìm hiểu chi tiết về dự án nào?`
        }

        // Contact questions
        if (lowercaseMessage.includes('liên hệ') || lowercaseMessage.includes('contact') || lowercaseMessage.includes('email')) {
            return `Bạn có thể liên hệ với tôi qua: 📧\n\n• Email: ${personalInfo?.email || 'your-email@example.com'}\n• GitHub, LinkedIn, Facebook\n• Hoặc form contact trên website này\n\nTôi luôn sẵn sàng trả lời và thảo luận về cơ hội hợp tác!`
        }

        // Certificates questions
        if (lowercaseMessage.includes('chứng chỉ') || lowercaseMessage.includes('certificate') || lowercaseMessage.includes('học')) {
            const certTitles = certificates?.map(c => c.title) || ['Web Development', 'Software Development Lifecycle', 'UX Design']
            return `Tôi có các chứng chỉ từ những khóa học chất lượng: 🏆\n\n${certTitles.map(cert => `• ${cert}`).join('\n')}\n\nTất cả đều giúp tôi nâng cao kỹ năng chuyên môn!`
        }

        // Greeting responses
        if (lowercaseMessage.includes('xin chào') || lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('chào') || lowercaseMessage.includes('greet') || lowercaseMessage.includes('greet me')) {
            return `Xin chào bạn! 👋 Rất vui được gặp!\n\nTôi là AI assistant của ${personalInfo?.display_name || 'Khanh'}. Tôi có thể giúp bạn tìm hiểu về:\n\n• Kỹ năng và công nghệ\n• Dự án đã thực hiện\n• Kinh nghiệm làm việc\n• Cách liên hệ\n\nBạn muốn biết gì đầu tiên? 😊`
        }

        // Thank you responses
        if (lowercaseMessage.includes('cảm ơn') || lowercaseMessage.includes('thank')) {
            return `Không có gì đâu! 😊 Rất vui được hỗ trợ bạn.\n\nNếu có thêm câu hỏi gì khác về portfolio, đừng ngại hỏi nhé! Tôi luôn sẵn sàng giúp đỡ. ✨`
        }

        // Default helpful response
        return `Cảm ơn bạn đã hỏi! 😊 Tôi là AI assistant của ${personalInfo?.display_name || 'Nguyễn Vũ Đăng Khánh'}. Tôi có thể giúp bạn tìm hiểu về kỹ năng, dự án, kinh nghiệm và nhiều thông tin khác của cậu chủ tôi. Bạn muốn biết gì?`
    }

    // GEMINI AI RESPONSE (if available)
    static async generateGeminiResponse(userMessage, context) {
        if (!genAI) {
            throw new Error('Gemini not initialized')
        }

        const { personalInfo, skills, projects, certificates, knowledgeBase } = context
        const relevantKnowledge = this.searchKnowledge(userMessage, knowledgeBase)

        const systemPrompt = `Bạn là AI assistant thân thiện cho portfolio của ${personalInfo?.name || 'Nguyễn Vũ Đăng Khánh'}. 

THÔNG TIN CÁ NHÂN:
- Tên: ${personalInfo?.display_name || 'Nguyễn Vũ Đăng Khánh'}
- Chức danh: ${personalInfo?.title || 'Full Stack Developer'}
- Bio: ${personalInfo?.bio || 'Passionate developer với kinh nghiệm web development'}
- Location: ${personalInfo?.location || 'Vietnam'}

KỸ NĂNG CHÍNH:
${skills?.slice(0, 8).map(skill => `- ${skill.name} (${skill.category})`).join('\n') || '- ReactJS, Spring Boot, JavaScript, TailwindCSS'}

DỰ ÁN NỔI BẬT:
${projects?.slice(0, 3).map(project => `- ${project.title}: ${project.description}`).join('\n') || '- Portfolio Website, Event Management System, E-commerce Platform'}

CHỨNG CHỈ:
${certificates?.slice(0, 3).map(cert => `- ${cert.title} (${cert.issuer})`).join('\n') || '- Web Development, Software Lifecycle, UX Design'}

KNOWLEDGE BASE:
${relevantKnowledge.slice(0, 2).map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

HƯỚNG DẪN:
1. Trả lời bằng tiếng Việt thân thiện, chuyên nghiệp
2. Sử dụng emoji phù hợp 
3. Trả lời ngắn gọn (tối đa 150 từ)
4. Nếu không biết, gợi ý cách liên hệ thông qua email hoặc form contact
5. Luôn nhiệt tình và hỗ trợ tích cực

Câu hỏi: ${userMessage}`

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })
        const result = await model.generateContent(systemPrompt)
        const response = await result.response
        return response.text()
    }

    // MAIN GENERATE RESPONSE METHOD
    static async generateResponse(userMessage, context) {
        try {
            // Try Gemini AI first if available
            if (genAI && import.meta.env.VITE_GEMINI_API_KEY) {
                const response = await this.generateGeminiResponse(userMessage, context)
                return response
            } else {
                return this.generateRuleBasedResponse(userMessage, context)
            }
        } catch (error) {
            console.error('❌ AI Error, falling back to rules:', error)
            // Always fallback to rule-based if AI fails
            return this.generateRuleBasedResponse(userMessage, context)
        }
    }

    // Save chat history to Supabase
    static async saveChatHistory(userMessage, botResponse, sessionId) {
        try {
            await supabase.from('chat_history').insert([{
                session_id: sessionId,
                user_message: userMessage,
                bot_response: botResponse,
                response_time_ms: Date.now()
            }])
        } catch (error) {
            console.error('Error saving chat history:', error)
        }
    }

    // Test API connectivity
    static async testAPI() {
        try {
            if (genAI) {
                const model = genAI.getGenerativeModel({ model: "gemini-pro" })
                await model.generateContent("Test")
                return { success: true, service: 'Gemini AI' }
            } else {
                return { success: true, service: 'Rule-based (Fallback)' }
            }
        } catch (error) {
            return { success: false, error: error.message, service: 'Rule-based (Fallback)' }
        }
    }
}

export default ChatbotService