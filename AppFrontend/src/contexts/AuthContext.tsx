import { createContext, useState, useEffect, type ReactNode, type SetStateAction,  type Dispatch } from 'react';
import { api } from '../services/api';

// 1. Definir os tipos para o valor do contexto
interface AuthContextData {
  isAuthenticated: boolean;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  login: (cpf: string, senha: string) => Promise<{ success: boolean; message?: string; }>;
  logout: () => void;
}

// 2. Criar o contexto com um valor padrão (pode ser 'undefined' e checado no 'useContext')
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setToken(storedToken);
    }
  }, []);

  // 3. Tipar os parâmetros da função login
  async function login(cpf: string, senha: string): Promise<{ success: boolean; message?: string; }> {
    try {
      const response = await api.post('/login', { cpf, senha });
      const { token: newToken } = response.data;
      
      localStorage.setItem('authToken', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setToken(newToken);
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro no login:", error);
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
    <AuthContext.Provider value={{ isAuthenticated, token, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}