import { createContext, useState, useEffect, type ReactNode } from 'react'; 
import { jwtDecode } from 'jwt-decode';
import { api } from '../services/api';

interface UserPayload {
  id: string;
  cpf: string;
}


interface AuthContextData {
  isAuthenticated: boolean;
  user: UserPayload | null; // Adicione o usuário aqui
  login: (cpf: string, senha: string) => Promise<{ success: boolean; message?: string; }>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decodedUser: UserPayload = jwtDecode(storedToken);
      setUser(decodedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      setToken(storedToken);
    }
  }, []);

  async function login(cpf: string, senha: string): Promise<{ success: boolean; message?: string; }> {
    try {
      const response = await api.post('/login', { cpf, senha });
      const { token: newToken } = response.data;

      localStorage.setItem('authToken', newToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

      const decodedUser: UserPayload = jwtDecode(newToken);
      setUser(decodedUser); // 2. Salve os dados do usuário no estado
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
    setUser(null); // 3. Limpe o usuário no logout
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}