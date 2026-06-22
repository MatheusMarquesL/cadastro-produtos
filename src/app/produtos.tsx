import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';
import { addProdutoLocal } from '../database/database';
import { Produto } from '../types/Produto';

export default function Produtos() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nome || !preco) {
      return Alert.alert('Atenção', 'Nome e Preço são obrigatórios!');
    }

    setLoading(true);

    const novoProduto = {
      nome,
      preco: parseFloat(preco.replace(',', '.')),
      descricao,
      imagem_url: imagem,
    };

    try {
      const response = await api.post<Produto>('/produtos', novoProduto);
      
      await addProdutoLocal(response.data);
      
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Falha ao salvar produto. Verifique sua conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Produto *</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Teclado Mecânico"
      />

      <Text style={styles.label}>Preço (R$) *</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        placeholder="Ex: 250.00"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes do produto..."
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput
        style={styles.input}
        value={imagem}
        onChangeText={setImagem}
        placeholder="https://site.com/imagem.jpg"
        autoCapitalize="none"
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleSave} 
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Salvando...' : 'Salvar Produto'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});