import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './contexts/AuthContext'; // 1. Importe o AuthProvider

import App from './App.tsx';
import HomePage from './pages/HomePage.tsx';
import CadastroPage from './pages/CadastroPage';
import LoginPage from './pages/LoginPage.tsx';
import EventosPage from './pages/EventosPage.tsx';
import PedidoPage from './pages/PedidoPage';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import CreateEventPage from './pages/CreateEventPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/cadastro", element: <CadastroPage /> },
      { path: "/eventos", element: <EventosPage /> },
      { path: "/pedido", element: <PedidoPage /> },
      {
        path: "/admin",
        element: <AdminProtectedRoute />,
        children: [
          { path: "eventos/novo", element: <CreateEventPage /> }
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider> {/* 2. Envolva o roteador com o Provider */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);