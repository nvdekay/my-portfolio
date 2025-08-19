import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChatbot } from '../hooks/useChatbot'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Message = ({ message }) => {
    const isBot = message.role === 'bot'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex items-end mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            {isBot && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white mr-2 shadow">
                    <img src="/assets/images/avatars/chatbot.png" alt="Bot Icon" className="w-10 h-10" />
                </div>
            )}

            <div className="max-w-[75%]">
                <div
                    className={`px-4 py-2 rounded-2xl text-sm sm:text-base leading-relaxed shadow-md ${isBot
                        ? 'bg-gray-100 text-gray-800 rounded-bl-none'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
                        }`}
                >
                    {message.content}
                </div>
                <p
                    className={`text-[10px] sm:text-[11px] mt-1 ${isBot ? 'text-left text-gray-400' : 'text-right text-gray-400'
                        }`}
                >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>

            {!isBot && (
                <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white ml-2 shadow">
                    <img src="/assets/images/avatars/conan.png" alt="User Icon" className="w-10 h-10" />
                </div>
            )}
        </motion.div>
    )
}

const TypingIndicator = () => (
    <div className="flex items-center mb-4">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-2 shadow">
            <img src="/assets/images/avatars/chatbot.png" alt="Bot Icon" className="w-6 h-6" />
        </div>
        <div className="bg-gray-100 rounded-2xl px-4 py-2 shadow-md flex space-x-1">
            {[0, 0.2, 0.4].map((delay, i) => (
                <motion.div
                    key={i}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay }}
                />
            ))}
        </div>
    </div>
)

const QuickActions = ({ onQuickAction }) => {
    const quickActions = [
        'Kỹ năng của bạn là gì?',
        'Bạn đã làm dự án gì?',
        'Kinh nghiệm làm việc',
        'Cách liên hệ với bạn?'
    ]
    return (
        <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Gợi ý câu hỏi</p>
            <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onQuickAction(action)}
                        className="text-xs sm:text-sm bg-white hover:bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-200 shadow-sm"
                    >
                        {action}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [inputMessage, setInputMessage] = useState('')
    const [showQuickActions, setShowQuickActions] = useState(true)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    const { messages, isLoading, error, sendMessage, clearChat, isReady } = useChatbot()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    useEffect(() => {
        if (isOpen && inputRef.current) inputRef.current.focus()
    }, [isOpen])

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return
        setShowQuickActions(false)
        await sendMessage(inputMessage)
        setInputMessage('')
    }

    const handleQuickAction = (action) => {
        setShowQuickActions(false)
        sendMessage(action)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r p-3 sm:p-4 z-[9999] flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 180, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            ✕
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 180, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -180, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Bubble chat */}
                            <div className="absolute -top-12 sm:-top-14 bg-white text-gray-800 px-2 sm:px-3 py-1.5 sm:py-2 rounded-2xl shadow-lg text-xs sm:text-sm max-w-[80vw] sm:max-w-none text-center">
                                Hỏi tui đi nha. Cái gì cũng biết hết á!
                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-sm"></div>
                            </div>

                            {/* Chatbot icon */}
                            <img
                                src="/assets/images/avatars/chatbot.png"
                                alt="Chat Icon"
                                className="w-20 sm:w-28 md:w-36 h-auto"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>


            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="
                            fixed bottom-24 right-4 sm:right-6 
                            w-[95vw] sm:w-[90vw] md:w-[420px] lg:w-[480px] 
                            h-[65vh] sm:h-[70vh] md:h-[75vh] 
                            bg-white rounded-2xl shadow-2xl z-[9998] 
                            flex flex-col overflow-hidden
                        "
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 sm:p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-lg sm:text-xl">
                                    <img src="/assets/images/avatars/chatbot.png" alt="Bot Icon" className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white">Deekay Assistant</h3>
                                    <p className="text-[10px] sm:text-xs md:text-sm text-white/80 flex items-center">
                                        <span className={`h-2 w-2 rounded-full mr-1 ${isReady ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
                                        {isReady ? 'Online' : 'Offline...'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
                                <button
                                    onClick={clearChat}
                                    className="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 transition"
                                >
                                    New Chat
                                </button>
                                <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-gray-50">
                            {messages.map((message) => (
                                <Message key={message.id} message={message} />
                            ))}

                            {isLoading && <TypingIndicator />}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg mb-4 text-sm">
                                    {error}
                                </div>
                            )}
                            {showQuickActions && messages.length === 1 && (
                                <QuickActions onQuickAction={handleQuickAction} />
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t bg-white p-2 sm:p-3">
                            <div className="flex items-center space-x-2">
                                <textarea
                                    ref={inputRef}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 border border-gray-300 rounded-xl px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    rows="1"
                                    disabled={isLoading || !isReady}
                                    style={{ maxHeight: '100px' }}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputMessage.trim() || !isReady}
                                    className="bg-red-500 text-white p-2 rounded-xl hover:shadow-md hover:cursor-pointer"
                                >
                                    {isLoading ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                        >
                                            ⟳
                                        </motion.div>
                                    ) : (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5"><FontAwesomeIcon icon={faPaperPlane} className='mb-[2px]' /></div>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Chatbot
