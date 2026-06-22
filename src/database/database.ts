import * as SQLite from 'expo-sqlite';
import { Produto } from '../types/Produto';

const dbName = 'catalogo.db';

export const initDB = async () => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      descricao TEXT,
      imagem_url TEXT
    );
  `);
  return db;
};

export const getProdutosLocal = async (): Promise<Produto[]> => {
  const db = await SQLite.openDatabaseAsync(dbName);
  return await db.getAllAsync<Produto>('SELECT * FROM produtos');
};

export const salvarProdutosLocal = async (produtos: Produto[]) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  
  await db.execAsync('DELETE FROM produtos'); 
  
  const statement = await db.prepareAsync(
    'INSERT INTO produtos (id, nome, preco, descricao, imagem_url) VALUES ($id, $nome, $preco, $descricao, $imagem_url)'
  );
  
  try {
    for (const p of produtos) {
      await statement.executeAsync({
        $id: String(p.id),
        $nome: p.nome,
        $preco: p.preco,
        $descricao: p.descricao || '',
        $imagem_url: p.imagem_url || '',
      });
    }
  } finally {
    await statement.finalizeAsync();
  }
};

export const addProdutoLocal = async (p: Produto) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.runAsync(
    'INSERT INTO produtos (id, nome, preco, descricao, imagem_url) VALUES (?, ?, ?, ?, ?)',
    [String(p.id), p.nome, p.preco, p.descricao, p.imagem_url]
  );
};

export const deleteProdutoLocal = async (id: string) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.runAsync('DELETE FROM produtos WHERE id = ?', [id]);
};