import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://6a39812a64a2d826922410f8.mockapi.io/cadastroprodutos/', 
  timeout: 10000,
});