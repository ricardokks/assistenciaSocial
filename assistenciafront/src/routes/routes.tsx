import { Outlet, createBrowserRouter } from "react-router-dom";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
     
    ],
  },
]);
