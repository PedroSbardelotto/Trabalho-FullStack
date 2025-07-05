import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

// ... (definição de tipos)

export const AuthContext = createContext({} as any);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setToken(storedToken);
    }
  }, []);

  async function login(cpf, senha) {
    try {
      const response = await api.post('/login', { cpf, senha });
      const { token: newToken } = response.data;
      
      localStorage.setItem('authToken', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      
      // Retornar sucesso
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      // Retornar falha com a mensagem de erro da API
      return { success: false, message: error.response?.data?.message || "Erro ao fazer login." };
    }
  }

  function logout() {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setToken(null);
  }

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}