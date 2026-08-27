import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";

export default function HomeScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const cameraRef = useRef(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão negada para localização!");
          return;
        }
        const tempLocation = await Location.getCurrentPositionAsync();
        setLocation(tempLocation);
      } catch (e) {
        setErrorMsg("Não foi possível obter a localização.");
      }
    }
    getCurrentLocation();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedPhoto(photo.uri);
    }
  };

  let locationText = "Aguardando...";
  if (errorMsg) {
    locationText = errorMsg;
  } else if (location) {
    locationText = `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerTitle}>Recursos do Dispositivo</Text>

        {/* CÂMERA */}
        <Text style={styles.sectionTitle}>Câmera</Text>
        <View style={styles.cameraContainer}>
          {!permission ? (
            <View />
          ) : !permission.granted ? (
            <View style={styles.permissionContainer}>
              <Text style={styles.permissionText}>
                Precisamos da sua permissão para usar a câmera
              </Text>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={requestPermission}
              >
                <Text style={styles.buttonText}>Conceder Permissão</Text>
              </TouchableOpacity>
            </View>
          ) : capturedPhoto ? (
            <View style={styles.previewContainer}>
              <Image
                source={{ uri: capturedPhoto }}
                style={styles.previewImage}
              />
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => setCapturedPhoto(null)}
              >
                <Text style={styles.buttonText}>Tirar Outra Foto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CameraView style={styles.camera} ref={cameraRef} facing="back">
              <View style={styles.actionContainer}>
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={takePicture}
                >
                  <View style={styles.captureInnerCircle} />
                </TouchableOpacity>
              </View>
            </CameraView>
          )}
        </View>

        {/* LOCALIZAÇÃO */}
        <Text style={styles.sectionTitle}>Localização GPS</Text>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>{locationText}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F7F8",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 8,
    marginTop: 8,
  },
  /* Câmera */
  cameraContainer: {
    height: 350,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#000",
    marginBottom: 16,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  actionContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  captureInnerCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFF",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  previewImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  retryButton: {
    backgroundColor: "#DC2626",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FFF",
  },
  permissionText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    color: "#1F2937",
  },
  permissionButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  /* Localização */
  locationContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  locationText: {
    fontSize: 14,
    color: "#1E293B",
    textAlign: "center",
  },
});
