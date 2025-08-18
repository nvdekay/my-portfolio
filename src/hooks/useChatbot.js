// src/hooks/useChatbot.js - FIXED VERSION
import { useState, useEffect, useCallback } from 'react'
import { ChatbotService } from '../services/chatbotService'

// Generate simple UUID for session
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const useChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: 'Xin chào! 👋 Tôi là AI assistant của Nguyễn Vũ Đăng Khánh. Tôi có thể giúp bạn tìm hiểu về kỹ năng, dự án, kinh nghiệm và nhiều thông tin khác về anh ấy. Bạn muốn biết gì?',
      timestamp: new Date()
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sessionId] = useState(() => generateSessionId())
  const [context, setContext] = useState(null)
  const [isReady, setIsReady] = useState(false)

  // Load portfolio context when hook initializes
  useEffect(() => {
    const loadContext = async () => {
      try {
        const portfolioContext = await ChatbotService.getPortfolioContext()
        setContext(portfolioContext)
        setIsReady(true)
      } catch (error) {
        console.error('Error loading context:', error)
        // Set fallback context
        setContext({
          personalInfo: { name: 'Nguyễn Vũ Đăng Khánh', title: 'Full Stack Developer' },
          skills: [],
          projects: [],
          certificates: [],
          socialLinks: [],
          knowledgeBase: []
        })
        setIsReady(true)
      }
    }
    loadContext()
  }, [])

  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim() || isLoading) {
      return
    }

    const trimmedMessage = userMessage.trim()

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: trimmedMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    try {
      const botResponse = await ChatbotService.generateResponse(trimmedMessage, context || {})
      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: botResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMsg])
      
      // Save to chat history (optional, don't fail if this errors)
      try {
        await ChatbotService.saveChatHistory(trimmedMessage, botResponse, sessionId)
      } catch (historyError) {
        console.warn('Failed to save chat history:', historyError)
      }
      
    } catch (err) {
      console.error('❌ Chat error:', err)
      
      // Create fallback error response
      const errorMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: 'Xin lỗi, tôi gặp chút vấn đề kỹ thuật. Bạn có thể thử hỏi lại hoặc liên hệ trực tiếp qua email được không? 😅',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
      setError('Có lỗi xảy ra khi xử lý tin nhắn')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, context, sessionId])

  const clearChat = useCallback(() => {
    setMessages([{
      id: 1,
      role: 'bot',
      content: 'Xin chào! 👋 Tôi là AI assistant của Nguyễn Vũ Đăng Khánh. Bạn muốn biết gì cậu chủ của tôi?',
      timestamp: new Date()
    }])
    setError(null)
  }, [])

  const retryLastMessage = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages.find(m => m.role === 'user' && m.content)?.content
      if (lastUserMessage) {
        sendMessage(lastUserMessage)
      }
    }
  }, [messages, sendMessage])

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
    isReady,
    sessionId
  }
}