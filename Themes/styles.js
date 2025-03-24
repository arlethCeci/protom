import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2C3E50", // O el color dinámico que prefieras
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20, // Agregar margen si es necesario
      },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#0A192F',
    },
    refreshButton: {
        position: 'absolute',
        top: 35,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 10,
        borderRadius: 50,
    },
    cityName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 5,
        textAlign: 'center',
    },
    temperature: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(255, 255, 255, 0.3)',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 12,
    },
    description: {
        fontSize: 20,
        color: '#FFFFFF',
        marginBottom: 15,
        opacity: 0.9,
        textAlign: 'center',
    },
    forecastContainer: {
        marginTop: 20,
        width: '95%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 18,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    forecastDay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    dayText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    tempText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    toggleForecastButton: {
        marginTop: 15,
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#1E3A8A',
    },
    toggleForecastText: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    detailsButton: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    detailsButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginTop: 15,
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 18,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
        textAlign: 'center',
    },
    detailBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    },
    detailText: {
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#0A192F',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
        // Estilos para las cajas de datos
        detailBox1: {
          borderRadius: 12,
          padding: 20,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5, // Sombra para Android
        },
      
        boxPh: {
          backgroundColor: "#FFD700", // Amarillo para pH
          marginBottom: 15,
        },
      
        boxTds: {
          backgroundColor: "#1E90FF", // Azul para TDS
          marginBottom: 15,
        },
      
        boxTemp: {
          backgroundColor: "#FF4500", // Rojo/Naranja para Temperatura
          marginBottom: 15,
        },
      
        detailLabel: {
          fontSize: 20,
          fontWeight: "bold",
          color: "#fff",
          marginBottom: 5,
        },
      
        detailValue: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#fff",
        },
      
        // Estilos del encabezado
        headerBox: {
          alignItems: "center",
          marginBottom: 20,
        },
      
        headerInnerBox: {
          backgroundColor: "#007AFF",
          borderWidth: 2,
          borderColor: "#005BBB",
          borderRadius: 12,
          paddingVertical: 15,
          paddingHorizontal: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5, // Para Android
        },
      
        headerTitle: {
          fontSize: 28,
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
        },
      
        // Botón de volver
        detailsButton1: {
          backgroundColor: "#333",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        },
      
        detailsButtonText1: {
          color: "#fff",
          fontSize: 18,
          fontWeight: "bold",
        },
      
        errorText: {
          color: "red",
          fontSize: 18,
          textAlign: "center",
          marginTop: 20,
        },
        chartContainer: {
            marginTop: 20,
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 10, // Reducimos un poco el padding
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 }, // Ajustamos la sombra
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 2,
          },
        
          chartTitle: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
          },
        
          chart: {
            borderRadius: -10,
            alignSelf: "center", // Centramos la gráfica
            padding: -10,
          },
      
      
      
          
});