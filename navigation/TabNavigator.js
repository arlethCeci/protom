import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen";
import DetailsScreen from "../Screens/DetailsScreen";
import Ciudades from "../Screens/SensorData";
import Clima from "../Screens/clima";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🚀 Stack Navigator para la pantalla de Inicio
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inicio" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

// 🚀 Tab Navigator
export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ciudades") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Clima") {
            iconName = focused ? "cloud" : "cloud-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF5733",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#222",
          height: 60,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeStack} />
      <Tab.Screen name="Ciudades" component={Ciudades} />
      <Tab.Screen name="Clima" component={Clima} />
    </Tab.Navigator>
  );
}
