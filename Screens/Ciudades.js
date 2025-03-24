import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { styles } from "../Themes/fondos";

const Ciudades = ({ navigation }) => {
  const ciudades = [
    {
      nombre: "México",
      clima: "Templado con lluvias en verano",
      temperatura: "22°C",
      poblacion: "9.2 millones",
    },
    {
      nombre: "Tula de Allende",
      clima: "Templado húmedo con inviernos frescos",
      temperatura: "18°C",
      poblacion: "3.1 millones",
    },
    {
      nombre: "Estado de México",
      clima: "Mediterráneo continental",
      temperatura: "25°C",
      poblacion: "3.3 millones",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessible={true}>
        Clima en Ciudades
      </Text>

      <ScrollView
        style={styles.detailsScroll}
        contentContainerStyle={styles.detailsContainer}
      >
        {ciudades.map((ciudad, index) => (
          <View key={index} style={styles.detailBox}>
            <Text style={styles.detailLabel} accessible={true}>
              {ciudad.nombre}
            </Text>
            <Text style={styles.detailValue} accessible={true}>
              🌡 {ciudad.temperatura}
            </Text>
            <Text style={styles.detailValue} accessible={true}>
              🌤 {ciudad.clima}
            </Text>
            <Text style={styles.detailValue} accessible={true}>
              👥 Población: {ciudad.poblacion}
            </Text>
          </View>
        ))}
      </ScrollView>

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

Ciudades.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Ciudades;
