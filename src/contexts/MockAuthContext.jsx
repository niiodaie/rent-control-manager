import React, { createContext, useContext, useState } from 'react'

const MockAuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(MockAuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock user data for testing
  const mockUsers = {
    'test.landlord@visnec.ai': {
      id: '1',
      email: 'test.landlord@visnec.ai',
      user_metadata: { role: 'admin' },
      app_metadata: { role: 'admin' },
      role: 'admin',
      plan: 'professional'
    },
    'test.tenant@visnec.ai': {
      id: '2', 
      email: 'test.tenant@visnec.ai',
      user_metadata: { role: 'tenant' },
      app_metadata: { role: 'tenant' },
      role: 'tenant'
    }
  }

  const signIn = async (email, password) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser = mockUsers[email]
    if (mockUser && password === 'Test1234!') {
      setUser(mockUser)
      setLoading(false)
      return { data: { user: mockUser }, error: null }
    } else {
      setLoading(false)
      return { data: null, error: { message: 'Invalid credentials' } }
    }
  }

  const signUp = async (email, password, metadata = {}) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser = {
      id: Date.now().toString(),
      email,
      user_metadata: metadata,
      app_metadata: metadata,
      role: metadata.role || 'tenant'
    }
    
    setUser(newUser)
    setLoading(false)
    return { data: { user: newUser }, error: null }
  }

  const signOut = async () => {
    setUser(null)
    return { error: null }
  }

  const signInWithOAuth = async (provider) => {
    setLoading(true)
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockUser = {
      id: Date.now().toString(),
      email: `user@${provider}.com`,
      user_metadata: { role: 'tenant' },
      app_metadata: { role: 'tenant' },
      role: 'tenant'
    }
    
    setUser(mockUser)
    setLoading(false)
    return { data: { user: mockUser }, error: null }
  }

  const resetPassword = async (email) => {
    // Simulate password reset
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { data: {}, error: null }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithOAuth,
    resetPassword
  }

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  )
}

export default MockAuthContext

