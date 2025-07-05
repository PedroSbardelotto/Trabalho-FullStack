import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
// Futuramente, importe as outras páginas aqui
// import EventosPage from './pages/EventosPage.tsx'; 
// import CadastroPage from './pages/CadastroPage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App é o layout principal
    children: [ // As páginas são "filhas" do layout
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      // {
      //   path: "/eventos",
      //   element: <EventosPage />,
      // },
      // {
      //   path: "/cadastro",
      //   element: <CadastroPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);