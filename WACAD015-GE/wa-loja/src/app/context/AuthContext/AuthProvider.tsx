'use client'

import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthproviderProps{
    children: React.ReactNode
}

type AuthContextType = {
    email: string | null
    login: (email: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    email: '',
    login: () => {},
    logout: () => {}
})

function AuthProvider({children}: AuthproviderProps) {
    const [email, setEmail] = useState<string | null>(null)
    const router = useRouter()

    const login = (email: string ) => {
        setEmail(email)
        localStorage.setItem('user', email ?? '')
        router.push('/')
    }

    const logout = () => {
        setEmail(null)
        localStorage.removeItem('user')
        router.push('/')
    }

    const value = {
        email,
        login,
        logout,
    }


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
