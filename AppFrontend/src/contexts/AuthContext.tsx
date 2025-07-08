import { createContext, useState, useEffect, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';

// As interfaces não mudam
interface UserPayload {
  id: string;
  nome: string;
  cpf: string;
  tipo: 'user' | 'admin';
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: UserPayload | null;
  loading: boolean;
  login: (cpf: string, senha: string) => Promise<{ success: boolean; message?: string; }>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // O useEffect agora apenas lê o token e atualiza o estado interno
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      try {
        const decodedUser: UserPayload = jwtDecode(storedToken);
        setUser(decodedUser);
        setToken(storedToken);
        // REMOVIDO: a linha 'api.defaults.headers.common...' foi retirada daqui
      } catch (error) {
        console.error("Token inválido encontrado, limpando...", error);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  // A função login agora apenas salva o token no localStorage e atualiza o estado
  async function login(cpf: string, senha: string): Promise<{ success: boolean; message?: string; }> {
    try {
      const response = await api.post('/login', { cpf, senha });
      const { token: newToken } = response.data;

      console.log('%c[AuthContext] 1. TOKEN SALVO:', 'color: green; font-weight: bold;', newToken);


      localStorage.setItem('authToken', newToken);
      // REMOVIDO: a linha 'api.defaults.headers.common...' foi retirada daqui

      const decodedUser: UserPayload = jwtDecode(newToken);
      setUser(decodedUser);
      setToken(newToken);

      return { success: true };
    } catch (error: any) {
      console.error("Erro no login:", error);
      return { success: false, message: error.response?.data?.message || "Erro ao fazer login." };
    }
  }

  // A função logout agora apenas limpa o localStorage e o estado
  function logout() {
    localStorage.removeItem('authToken');
    // REMOVIDO: a linha 'delete api.defaults.headers.common...' foi retirada daqui
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}