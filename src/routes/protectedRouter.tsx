import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRouter() {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate replace to={'/login'} />
  }

  return <Outlet />
}
