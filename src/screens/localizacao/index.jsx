import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
export default function PosicaoGPSScreen() {
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão negada a localização!");
          return;
        }
        const tempLocation = await Location.getCurrentPositionAsync();
        setlocation(tempLocation);
      } catch (e) {
        setErrorMsg("Não foi possível obter a localização.");
      }
    }
    getCurrentLocation();
  }, []);

  let text = "Aguardando...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleScreen}>Posição atual</Text>
          <Text style={styles.paragraph}>{text}</Text>
          <Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Container principal que centraliza todo o conteúdo na tela
  safeArea: {
    flex: 1, // Expande para preencher toda a área segura da tela
    backgroundColor: "#F6F7F8", // Cinza-claro: cor de fundo padrão do app
  },
  container: {
    flex: 1, // Ocupa toda a área disponível da tela
    backgroundColor: "#f6f6f6", // Cinza muito claro como fundo
    justifyContent: "center", // Centraliza os filhos verticalmente (eixo principal)
    alignItems: "center", // Centraliza os filhos horizontalmente (eixo cruzado)
  },

  // Exibe o texto do GPS ou mensagem de status
  paragraph: {
    fontSize: 18, // Tamanho médio para boa legibilidade
    textAlign: "center", // Centraliza o texto dentro do componente
    color: "#b12727", // Vermelho — chama atenção para os dados exibidos
  },

  // Espaçamento superior (reservado para um possível cabeçalho futuro)
  header: {
    paddingHorizontal: 16, // Espaço interno lateral
    paddingTop: 20, // Espaço interno superior
  },

  // Título exibido acima dos dados de localização
  titleScreen: {
    fontSize: 18, // Mesmo tamanho dos dados — ambos no centro da tela
    fontWeight: "bold", // Negrito para diferenciar do parágrafo de dados
    color: "#1E293B", // Azul-escuro quase preto — cor de texto primária
  },
});
