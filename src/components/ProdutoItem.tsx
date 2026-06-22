import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Produto } from '../types/Produto';

interface Props {
  produto: Produto;
  onDelete: (id: string) => void;
}

export function ProdutoItem({ produto, onDelete }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: produto.imagem_url || 'https://via.placeholder.com/100' }}
        style={styles.image}
        contentFit="cover"
        transition={500}
      />
      <View style={styles.info}>
        <Text style={styles.title}>{produto.nome}</Text>
        <Text style={styles.price}>R$ {produto.preco.toFixed(2)}</Text>
        <Text style={styles.desc} numberOfLines={2}>{produto.descricao}</Text>
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(produto.id)}>
        <Ionicons name="trash" size={24} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 12,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#2e8b57',
    fontWeight: '600',
    marginTop: 4,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deleteBtn: {
    justifyContent: 'center',
    paddingLeft: 10,
  }
});