"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

interface AuthContextValue {
  user: User | null
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        const token = await firebaseUser.getIdTokenResult(true)
        setIsAdmin(!!token.claims.admin)
      } else {
        setIsAdmin(false)
      }
      setLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
