import React, { useState, useEffect, useRef } from "react";
import { 
  View, Text, StatusBar, TouchableOpacity, ActivityIndicator, ScrollView, Animated 
} from "react-native";
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../Themes/styles";

export default function HomeScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFullForecast, setShowFullForecast] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    setLoading(true);
    setError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permiso de ubicación denegado");
      }

      const location = await Location.getCurrentPositionAsync({});
      await fetchWeatherData(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const weatherData = await weatherResponse.json();
      if (!weatherResponse.ok || weatherData.error) {
        throw new Error(weatherData.reason || "Error al obtener datos del clima");
      }

      const cityResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const cityData = await cityResponse.json();
      const cityName = cityData.address?.city || cityData.address?.town || cityData.address?.village || "Ubicación desconocida";

      setWeatherData({ ...weatherData, city: cityName });
    } catch (err) {
      setError(err.message);
    }
  };

  const opacityAnim = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={requestLocationPermission} style={styles.refreshButton}>
          <Text style={styles.errorButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <StatusBar barStyle="light-content" />
        
        <TouchableOpacity onPress={requestLocationPermission} style={styles.refreshButton}>
          <Icon name="refresh" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        {weatherData && <Text style={styles.cityName}>{weatherData.city}</Text>}

        <Animated.View style={{ opacity: opacityAnim, alignItems: "center" }}>
          {weatherData && (
            <>
              <Icon name="weather-sunny" size={80} color="#FFF" />
              <Text style={styles.temperature}>{weatherData.current_weather?.temperature ?? "N/A"}°</Text>
              <Text style={styles.description}>Clima actual</Text>
            </>
          )}
        </Animated.View>

        {weatherData && (
          <View style={styles.forecastContainer}>
            {weatherData.daily?.temperature_2m_max?.slice(0, showFullForecast ? 5 : 3).map((maxTemp, index) => (
              <View key={index} style={styles.forecastDay}>
                <Icon name="weather-partly-cloudy" size={30} color="#FFF" />
                <Text style={styles.dayText}>{index === 0 ? "Hoy" : index === 1 ? "Mañana" : `Día ${index + 1}`}</Text>
                <Text style={styles.tempText}>
                  {weatherData.daily?.temperature_2m_min?.[index] ?? "N/A"}° / {maxTemp ?? "N/A"}°
                </Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={() => setShowFullForecast(!showFullForecast)} style={styles.toggleForecastButton}>
          <Text style={styles.toggleForecastText}>{showFullForecast ? "Mostrar menos días" : "Pronóstico de 5 días"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDetails(!showDetails)} style={styles.detailsButton}>
          <Icon name="information-outline" size={20} color="#FFFFFF" style={{ marginRight: 5 }} />
          <Text style={styles.detailsButtonText}>{showDetails ? "Ocultar Detalles" : "Ver Más Detalles"}</Text>
        </TouchableOpacity>

        {showDetails && weatherData && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Detalles del Clima</Text>
            <View style={styles.detailBox}>
              <Icon name="water-percent" size={24} color="#FFFFFF" />
              <Text style={styles.detailText}>Humedad: {weatherData.hourly?.relativehumidity_2m?.[0] ?? "N/A"}%</Text>
            </View>
            <View style={styles.detailBox}>
              <Icon name="weather-windy" size={24} color="#FFFFFF" />
              <Text style={styles.detailText}>Viento: {weatherData.hourly?.windspeed_10m?.[0] ?? "N/A"} km/h</Text>
            </View>
            <View style={styles.detailBox}>
              <Icon name="thermometer" size={24} color="#FFFFFF" />
              <Text style={styles.detailText}>
                Sensación Térmica: {weatherData.hourly?.apparent_temperature?.[0] ?? "N/A"}°C
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
