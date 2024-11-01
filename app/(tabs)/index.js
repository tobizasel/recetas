import { Image, StyleSheet, Platform, FlatList, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Plato, Popup} from '@/components/Plato';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {

  const apikey = "ff61cf01f89f4dd287187194e40b99d9"
  const [platos, setPlatos] = useState([]);
  const [mostrarPlato, setMostrarPlato] = useState(null)
  const [mostrarPopup, setMostrarPopup] = useState(false)


  const handleDelete = (id) => {
    console.log("eliminar", id);
      setPlatos((platos) => platos.filter(plato => plato.id !== id));
  }

  const handleMostrarPopup = (plato) => {
    setMostrarPlato(plato);
    setMostrarPopup(true);
  };

  const handleCerrarPopup = () => {
    setMostrarPlato(null);
    setMostrarPopup(false);
  };

  const getData = async () => {
        try {
          const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}`)
          setPlatos(response.data.results);
          console.log(response.data.results);
        } catch (err) {
          console.log(err);
        }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
    <FlatList
      data={platos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Plato
          plato={item}
          onDelete={handleDelete}
          mostrarPopup={handleMostrarPopup}
        />
      )}
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
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
