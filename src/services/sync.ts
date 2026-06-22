import { api } from './api';
import { salvarProdutosLocal, getProdutosLocal } from '../database/database';
import { Produto } from '../types/Produto';

export const syncDados = async (): Promise<Produto[]> => {
  try {
    const response = await api.get<Produto[]>('/produtos');
    const produtosApi = response.data;

    await salvarProdutosLocal(produtosApi);

    return produtosApi;
  } catch (error) {
    console.log("Modo Offline: Não foi possível acessar a API, carregando dados locais.");
    
    return await getProdutosLocal();
  }
};