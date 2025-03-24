import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import PropTypes from "prop-types";
import { styles } from "../Themes/styles";

const screenWidth = Dimensions.get("window").width;

const SensorData = ({ navigation }) => {
  const [data, setData] = useState({ ph: null, tds: null, temperatura: null });
  const [history, setHistory] = useState({ ph: [], tds: [], temperatura: [] });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://hydroview.onrender.com/ultimos-datos");
      const result = await response.json();
      
      setData(result);

      // Guardamos los últimos 5 valores de cada componente
      setHistory((prev) => ({
        ph: [...prev.ph, result.ph].slice(-5),
        tds: [...prev.tds, result.tds].slice(-5),
        temperatura: [...prev.temperatura, result.temperatura].slice(-5),
      }));

    } catch (err) {
      setError("Error al cargar los datos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const getValueOrDefault = (value) => (value !== null ? value : "No disponible");

  return (
    <View style={styles.container}>
      {/* Título llamativo con recuadro */}
      <View style={styles.headerBox}>
        <View style={styles.headerInnerBox}>
          <Text style={styles.headerTitle} accessible={true}>
            📊 Datos del Sensor
          </Text>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView
          style={styles.detailsScroll}
          contentContainerStyle={styles.detailsContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Caja de pH */}
          <View style={[styles.detailBox, styles.boxPh]}>
            <Text style={styles.detailLabel} accessible={true}>⚗️ pH</Text>
            <Text style={styles.detailValue} accessible={true}>{getValueOrDefault(data.ph)}</Text>
          </View>

          {/* Caja de TDS */}
          <View style={[styles.detailBox, styles.boxTds]}>
            <Text style={styles.detailLabel} accessible={true}>💧 TDS</Text>
            <Text style={styles.detailValue} accessible={true}>{getValueOrDefault(data.tds)} ppm</Text>
          </View>

          {/* Caja de Temperatura */}
          <View style={[styles.detailBox, styles.boxTemp]}>
            <Text style={styles.detailLabel} accessible={true}>🌡 Temperatura</Text>
            <Text style={styles.detailValue} accessible={true}>{getValueOrDefault(data.temperatura)}°C</Text>
          </View>

          {/* Gráfica de Comportamiento */}
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>📈 Comportamiento del Sensor</Text>
            <LineChart
  data={{
    labels: ["T1", "T2", "T3", "T4", "T5"],
    datasets: [
      { data: history.ph, color: () => "#FFD700", strokeWidth: 2 }, // Amarillo
      { data: history.tds, color: () => "#1E90FF", strokeWidth: 2 }, // Azul
      { data: history.temperatura, color: () => "#FF4500", strokeWidth: 2 }, // Rojo
    ],
    legend: ["pH", "TDS", "Temperatura"],
  }}
  width={screenWidth - 60} // Reducimos el ancho para que no se salga
  height={180} // Hacemos la gráfica un poco más pequeña
  chartConfig={{
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 10 },
  }}
  bezier
  style={styles.chart}
/>

          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.detailsButton}
        accessible={true}
      >
        <Text style={styles.detailsButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

SensorData.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SensorData;
