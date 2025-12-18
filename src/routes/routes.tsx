import { Outlet, createBrowserRouter } from 'react-router-dom'

import NotFound from '../pages/404'
import CadastroPage from '../pages/cadastro'
import { Config } from '../pages/config'
import { HomeAdmin } from '../pages/home-adm'
import { HomeCidadao } from '../pages/home-cidadao'
import { HomeFuncionario } from '../pages/home-funcionario'
import { HomePage } from '../pages/lading-page'
import LoginPage from '../pages/login'
import { Projeto } from '../pages/projeto'
import { ProtectedRouter } from './protectedRouter'

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
      {
        path: '/cadastro',
        element: <CadastroPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/sepad-massape/projeto/:id',
        element: <Projeto />,
      },
    ],
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        path: '/dashboard/funcionario',
        element: <HomeFuncionario />,
      },
      {
        path: '/dashboard/cidadao/:id',
        element: <HomeCidadao />,
      },
      {
        path: '/dashboard/administrador',
        element: <HomeAdmin />,
      },
    ],
  },
])
