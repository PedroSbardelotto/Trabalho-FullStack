import axios from 'axios';

// instância base do axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// CRIAÇÃO DO INTERCEPTADOR
// Esta função será executada ANTES de TODA requisição feita pelo 'api'
api.interceptors.request.use(
  (config) => {
    // 1. Pega o token do localStorage
    const token = localStorage.getItem('authToken');

    console.log('%c[Interceptor] 2. TOKEN ENVIADO:', 'color: blue; font-weight: bold;', token);

    // 2. Se o token existir, adiciona o cabeçalho de autorização
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Retorna a configuração da requisição modificada
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export { api };