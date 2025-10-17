import { Outlet, createBrowserRouter } from 'react-router-dom'

import { HomePage } from '../pages/lading-page'
import { LoginPage } from '../pages/login'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])
