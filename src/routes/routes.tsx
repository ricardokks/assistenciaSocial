import { Outlet, createBrowserRouter } from 'react-router-dom'

import CadastroPage from '../pages/cadastro'
import { HomeFuncionario } from '../pages/home-funcionario'
import { HomePage } from '../pages/lading-page'
import LoginPage from '../pages/login'
import { Projeto } from '../pages/projeto'
import { HomeCidadao } from '../pages/home-cidadao'
import { HomeAdmin } from '../pages/home-adm'

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
        path: '/sepad-massape/projeto/:id',
        element: <Projeto />,
      },
      {
        path: '/cadastro',
        element: <CadastroPage />,
      },
      {
        path: '/dashboard/funcionario',
        element: <HomeFuncionario />,
      },
      {
        path: '/dashboard/cidadao',
        element: <HomeCidadao />
      },
            {
        path: '/dashboard/administrador',
        element: <HomeAdmin />
      }
    ],
  },
])
