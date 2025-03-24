import React, { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const App = () => {
  const [ciudad, setCiudad] = useState("");
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY_OPENCAGE = "e0ac19c65a6d417ba1cffd7ffa46329a";

  const obtenerCoordenadas = async (ciudad) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=${API_KEY_OPENCAGE}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
      } else {
        throw new Error("Ciudad no encontrada");
      }
    } catch (err) {
      throw new Error("Error al obtener coordenadas: " + err.message);
    }
  };

  const obtenerClima = async (lat, lng) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=temperature_2m`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.reason || "Error al obtener el clima");
      }

      return data;
    } catch (err) {
      throw new Error("Error al obtener el clima: " + err.message);
    }
  };

  const consultarClima = async () => {
    if (!ciudad) {
      setError("Por favor, ingresa una ciudad.");
      return;
    }

    setCargando(true);
    setError(null);
    setClima(null);

    try {
      const coordenadas = await obtenerCoordenadas(ciudad);
      const datosClima = await obtenerClima(coordenadas.lat, coordenadas.lng);
      setClima(datosClima);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <LinearGradient colors={["#1B1B2F", "#1F4068"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>Consulta el Clima</Text>

        <View style={styles.inputContainer}>
        <TextInput
  style={styles.busqueda}
  placeholder="Ingresa una ciudad..."
  placeholderTextColor="#A9A9A9"
  value={ciudad}
  onChangeText={(texto) => {
    setCiudad(texto);
    if (texto.trim() === "") {
      setClima(null); 
      setError(null); 
    }
  }}
/>

          <TouchableOpacity style={styles.botonBuscar} onPress={consultarClima}>
            <MaterialCommunityIcons name="magnify" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {cargando && <ActivityIndicator size="large" color="#FFFFFF" />}
        {error && <Text style={styles.error}>{error}</Text>}

        {clima && (
          <View style={styles.datosClima}>
            <View style={styles.caja}>
              <MaterialCommunityIcons name="thermometer" size={22} color="#FFA726" />
              <Text style={styles.textoCaja}>
                {clima.current_weather.temperature}°C
              </Text>
            </View>

            <View style={styles.caja}>
              <MaterialCommunityIcons name="weather-windy" size={22} color="#4CAF50" />
              <Text style={styles.textoCaja}>
                {clima.current_weather.windspeed} km/h
              </Text>
            </View>

            <View style={styles.caja}>
              <MaterialCommunityIcons name="compass" size={22} color="#2196F3" />
              <Text style={styles.textoCaja}>
                {clima.current_weather.winddirection}°
              </Text>
            </View>

            <Text style={styles.graficaTitulo}>Temperatura a lo largo del día</Text>
            <LineChart
              data={{
                labels: clima.hourly.time
                  .slice(0, 24)
                  .map((time, index) => (index % 3 === 0 ? new Date(time).getHours() + ":00" : "")),
                datasets: [{ data: clima.hourly.temperature_2m.slice(0, 24) }],
              }}
              width={Dimensions.get("window").width - 50}
              height={200}
              yAxisSuffix="°C"
              chartConfig={{
                backgroundColor: "#222831",
                backgroundGradientFrom: "#393E46",
                backgroundGradientTo: "#222831",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 10 },
                propsForDots: { r: "4", strokeWidth: "2", stroke: "#FFA726" },
              }}
              bezier
              style={styles.grafica}
            />
          </View>
          
        )}
        
      </ScrollView>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#FFFFFF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#393E46",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: 45,
    marginBottom: 15,
  },
  busqueda: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  botonBuscar: {
    padding: 5,
  },
  datosClima: { width: "100%", marginTop: 15 },
  caja: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222831",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoCaja: {
    marginLeft: 10,
    fontSize: 16,
    color: "#FFFFFF",
  },
  graficaTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
    color: "#FFFFFF",
  },
  grafica: {
    borderRadius: 10,
    marginVertical: 10,
  },
  error: {
    color: "#FF5252",
    fontSize: 14,
    marginTop: 15,
  },
});

export default App;
