// src/components/ErrorMessage.jsx
import React from 'react'

const ErrorMessage = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-white p-6">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2">Oops!</h3>
      <p className="text-gray-400 text-center mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage