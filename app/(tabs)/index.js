import { Image, StyleSheet, Platform, FlatList, View, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Plato, Popup} from '@/components/Plato';
import { MenuContext } from '@/contexts/MenuContext';

export default function HomeScreen() {

  const apikey = "e1b5e0ea5723487da4f7b97c6f03f3ac"
  const [platos, setPlatos] = useState([]);
  const [mostrarPlato, setMostrarPlato] = useState(null)
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [busqueda, setBusqueda] = useState("")


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
          setPlatos(response.data.results)
        } catch (err) {
          console.log(err);
        }
  }

  const handleInput = async (e) => {
    console.log(e);
    setBusqueda(e);

    if (busqueda.length > 1) {
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&query=${busqueda}`);
        setPlatos(response.data.results);
        
      } catch (error) {
        console.log(error);
      }
    }else {
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Buscar platos..."
        value={busqueda}
        onChangeText={handleInput}
        style={styles.input}
      />

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
  container: {
    marginTop: 100
  },
  input: {
    borderWidth: 2,
    borderColor: "#c2c2c2",
    width: 600
  }
});
