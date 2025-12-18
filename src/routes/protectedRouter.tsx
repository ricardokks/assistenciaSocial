import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { getUser } from '../api/user/getUser'

export function ProtectedRouter() {
  const [idUser, setIdUser] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIdUser() {
      try {
        const response = await getUser()
        setIdUser(response.id)
      } catch (err) {
        setIdUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchIdUser()
  }, [])

  if (loading) return null

  if (!idUser) {
    return <Navigate replace to="/login" />
  }

  return <Outlet />
}
