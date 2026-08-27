import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const telas = [
    {
      nome: "Camera",
      descricao: "Use a Camera do seu celular",
      route: "CameraScreen",
    },
    {
      nome: "GPS",
      descricao: "Use a localização do seu celular",
      route: "PosicaoGPSScreen",
    },
  ];

  return (
    <SafeAreaView>
      <View>
        <View>
          <Text> Recusos do dispositivo</Text>
        </View>
        <View>
          {telas.map(tela => (
            <TouchableOpacity
              key={tela.route}
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => navigation.navigate(tela.route)}
            >
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}> {tela.title}</Text>
                <Text style={styles.cardDescription}>{tela.discription}</Text>
              </View>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
