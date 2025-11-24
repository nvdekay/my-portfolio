import { useState, useEffect } from 'react'

export const useTypedText = (roles, typingSpeed = 10000, delayBetween = 2000 ) => {
    const [text, setText] = useState('')
    const [roleIndex, setRoleIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)

    useEffect(() => {
        // Guard clause: nếu roles chưa load hoặc empty thì không làm gì
        if (!roles || roles.length === 0) {
            return
        }

        const currentRole = roles[roleIndex]

        if (charIndex < currentRole.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + currentRole.charAt(charIndex))
                setCharIndex((prev) => prev + 1)
            }, typingSpeed)
            return () => clearTimeout(timeout)
        } else {
            const delay = setTimeout(() => {
                setText('')
                setCharIndex(0)
                setRoleIndex((prev) => (prev + 1) % roles.length)
            }, delayBetween)
            return () => clearTimeout(delay)
        }
    }, [charIndex, roleIndex, roles, typingSpeed, delayBetween])

    return text
}
