import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { Toaster } from 'sonner'

import '../lib/global.css'
import { routes } from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors position="top-right" />
    <RouterProvider router={routes}></RouterProvider>

  </StrictMode>
)
