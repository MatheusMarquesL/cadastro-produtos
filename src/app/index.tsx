import React, { useState, useCallback } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter, useFocusEffect, Href } from "expo-router";
import { ProdutoItem } from "../components/ProdutoItem";
import { Produto } from "../types/Produto";
import { syncDados } from "../services/sync";
import { deleteProdutoLocal } from "../database/database";
import { api } from "../services/api";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarDados = async () => {
    setLoading(true);
    const dados = await syncDados();
    setProdutos(dados);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, []),
  );

  const handleDelete = async (id: string) => {
    Alert.alert("Apagar", "Deseja remover este produto?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/produtos/${id}`);
            await deleteProdutoLocal(id);
            setProdutos((prev) => prev.filter((p) => p.id !== id));
          } catch (e) {
            Alert.alert(
              "Erro",
              "Não foi possível apagar o produto. Verifique sua conexão.",
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Sincronizando produtos...</Text>
      ) : (
        <FlashList
          data={produtos}
          keyExtractor={(item: Produto) => item.id}
          renderItem={({ item }: { item: Produto }) => (
            <ProdutoItem produto={item} onDelete={handleDelete} />
          )}
          {...({ estimatedItemSize: 100 } as any)}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhum produto cadastrado.</Text>
          }
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/produtos" as Href)}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});
