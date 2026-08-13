'use client'

import { useContext } from 'react'
import { AuthContext } from '@/app/context/AuthContext/AuthProvider'

export function useLogoutContext() {
  const { logout } = useContext(AuthContext)

  return { logout }
}
