import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigationState } from "@react-navigation/native";
import PropTypes from "prop-types";
import HomeScreen from "../Screens/HomeScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import Ciudades from "../Screens/Ciudades";
import Clima from "../Screens/clima";

// Obtener el ancho de la pantalla
const { width } = Dimensions.get("window");

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para Home (por si hay navegación interna)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// Componente personalizado del Drawer
function CustomDrawerContent({ navigation }) {
  const navigationState = useNavigationState((state) => state);
  const activeRoute = navigationState?.routes[navigationState.index]?.name;

  return (
    <View style={styles.drawerContainer}>

      {/* Avatar */}
      <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.avatar} />

      {/* Botón Inicio */}
      <TouchableOpacity
        style={[styles.drawerItem, activeRoute === "Inicio" && styles.activeItem]}
        onPress={() => navigation.navigate("Inicio")}
      >
        <Ionicons name="home" size={40} color={activeRoute === "Inicio" ? "#FFD700" : "#FF5733"} />
        <Text style={[styles.drawerText, activeRoute === "Inicio" && styles.activeText]}>Inicio</Text>
      </TouchableOpacity>

      {/* Botón Ciudades */}
      <TouchableOpacity
        style={[styles.drawerItem, activeRoute === "Ciudades" && styles.activeItem]}
        onPress={() => navigation.navigate("Ciudades")}
      >
        <Ionicons name="location" size={40} color={activeRoute === "Ciudades" ? "#FFD700" : "#FFD700"} />
        <Text style={[styles.drawerText, activeRoute === "Ciudades" && styles.activeText]}>Ciudades</Text>
      </TouchableOpacity>

      {/* Botón Clima */}
      <TouchableOpacity
        style={[styles.drawerItem, activeRoute === "Clima" && styles.activeItem]}
        onPress={() => navigation.navigate("Clima")}
      >
        <Ionicons name="cloud" size={40} color={activeRoute === "Clima" ? "#FFD700" : "#00BFFF"} />
        <Text style={[styles.drawerText, activeRoute === "Clima" && styles.activeText]}>Clima</Text>
      </TouchableOpacity>
    </View>
  );
}

// ✅ Validación de props con PropTypes
CustomDrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        gestureEnabled: true, // Habilita el gesto de deslizamiento
        swipeEdgeWidth: 250, // Ajusta la detección del gesto
        drawerType: "slide",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        drawerStyle: {
          backgroundColor: "rgba(11, 36, 72, 0.9)", // Color de fondo del Drawer
          width: width * 0.5, // 🔥 Drawer ocupa el 50% de la pantalla
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        },
        sceneContainerStyle: { backgroundColor: "transparent" },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Inicio" component={HomeStack} />
      <Drawer.Screen name="Ciudades" component={Ciudades} />
      <Drawer.Screen name="Clima" component={Clima} />
    </Drawer.Navigator>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  drawerItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  drawerText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  activeItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Fondo sutil al seleccionar
    borderRadius: 10,
    padding: 10,
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFD700",
  },
});
