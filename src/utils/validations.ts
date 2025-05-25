export const validarEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
export const validarCPF = (cpf: string) => /^\d{11}$/.test(cpf);