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

  const renderItem = ({ item }) => (
    <View style={styles.platoContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Button title="Ver Detalle" onPress={() => handleMostrarPopup(item)} />
      <Button title="Eliminar" onPress={() => eliminarDelMenu(item.id)} color="red" />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menú</Text>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
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
