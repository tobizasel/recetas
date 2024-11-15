import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, FlatList, Button } from 'react-native';
import { useContext } from 'react';
import { MenuContext } from '@/contexts/MenuContext';
import { Popup } from '@/components/Plato';

export default function TabTwoScreen() {

  const { menu, eliminarDelMenu } = useContext(MenuContext);
  const [mostrarPlato, setMostrarPlato] = React.useState(null);
  const [mostrarPopup, setMostrarPopup] = React.useState(false);

  const handleMostrarPopup = (plato) => {
    setMostrarPlato(plato);
    setMostrarPopup(true);
  };

  const handleCerrarPopup = () => {
    setMostrarPlato(null);
    setMostrarPopup(false);
  };

  const renderItem = ({ item }) => {

    const imageUrl = item.plato.image
    console.log(imageUrl)
    

  return (
    <View style={[styles.platoContainer, item.ingredientes.vegan && styles.vegan]}>
      <Text style={styles.title}>{item.plato.title}</Text>
      <Image
        source={{ uri: imageUrl }}
      />
      <Button title="Ver Detalle" onPress={() => handleMostrarPopup(item, imageUrl)} />
      <Button title="Eliminar" onPress={() => eliminarDelMenu(item.plato.id, item.ingredientes.vegan)} color="red" />
    </View>
  )};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú</Text>
      <FlatList
        data={menu}
        key={(item) => item.id}
        renderItem={renderItem}
      />
      {mostrarPlato && (
        <Popup
          visibilidad={mostrarPopup}
          onClose={handleCerrarPopup}
          plato={mostrarPlato}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  vegan: {
    borderColor: "f00",
    borderWidth:2,
    borderRadius: 10,
    backgroundColor: "f00"
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  platoContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
