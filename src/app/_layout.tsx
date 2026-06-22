import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { initDB } from "../database/database";

export default function Layout() {
  const [dbPronto, setDbPronto] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      setDbPronto(true);
    };
    setup();
  }, []);

  if (!dbPronto) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 16 }}>Preparando Banco de Dados...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: "#f4f4f4" } }}>
      <Stack.Screen name="index" options={{ title: "Catálogo de Produtos" }} />
      <Stack.Screen
        name="produtos"
        options={{ title: "Novo Produto", presentation: "modal" }}
      />
    </Stack>
  );
}
