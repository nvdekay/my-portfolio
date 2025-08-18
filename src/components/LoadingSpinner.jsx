// src/components/LoadingSpinner.jsx
import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[200px] text-white">
            <motion.div
                className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-gray-400">{message}</p>
        </div>
    )
}

export default LoadingSpinner