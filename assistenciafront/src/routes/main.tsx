import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "../lib/global.css"

import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>,
)
