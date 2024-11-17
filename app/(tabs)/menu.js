import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, FlatList, Button } from 'react-native';
import { useContext } from 'react';
import { MenuContext } from '@/contexts/MenuContext';
import { Popup } from '@/components/Plato';

export default function TabTwoScreen() {

  const { menu, eliminarDelMenu } = useContext(MenuContext);
  const [precioTotal, setPrecioTotal] = useState(0)
  const [promedioHealth, setPromedioHealth] = useState(0)



  useEffect(() => {
    setPrecioTotal(0)
    setPromedioHealth(0)
    menu.forEach(platoMenu => {
      console.log(platoMenu.ingredientes.pricePerServing);
      setPrecioTotal(precioTotal => precioTotal + platoMenu.ingredientes.pricePerServing)
      setPromedioHealth(promedioHealth => promedioHealth + platoMenu.ingredientes.healthScore)
    });
    setPromedioHealth(promedioHealth => promedioHealth / menu.length)

    if (menu.length === 0) {
      setPromedioHealth(0)
    }
  }, [menu])


  const renderItem = ({ item }) => {
    
  return (
    <View style={[styles.platoContainer, item.ingredientes.vegan && styles.vegan]}>
      <Text style={styles.title}>{item.plato.title}</Text>
      <Image
        source={{ uri: item.plato.image }}
      />
      <Button title="Eliminar" onPress={() => eliminarDelMenu(item.plato.id, item.ingredientes.vegan)} color="red" />
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú</Text>
      <Text style={styles.header}>Precio Total: ${Math.round(precioTotal)}</Text>
      <Text style={styles.header}>Promedio de Health Score: {Math.round(promedioHealth)}</Text>
      <FlatList
        data={menu}
        key={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9', // Fondo suave para mejorar la vista
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subHeaderContainer: {
    flexDirection: 'row', // Esto coloca los subtítulos en fila (horizontalmente)
    justifyContent: 'space-between', // Distribuye el espacio entre los elementos
    marginBottom: 10, // Espacio entre subtítulos y contenido
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    flex: 1, // Hace que cada subtítulo ocupe el 50% del espacio
    textAlign: 'center', // Alinea el texto al centro
  },
  platoContainer: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  vegan: {
    borderColor: "#A8C686", // Color verde para los platos veganos
    borderWidth: 2,
    backgroundColor: "#A8C686", // Fondo verde para los platos veganos
  },
});
