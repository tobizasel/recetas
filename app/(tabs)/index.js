import { Image, StyleSheet, Platform, FlatList, View, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {Plato, Popup} from '@/components/Plato';
import { MenuContext } from '@/contexts/MenuContext';

export default function HomeScreen() {

  const apikey = "ff61cf01f89f4dd287187194e40b99d9"
  const [platos, setPlatos] = useState([]);
  const [mostrarPlato, setMostrarPlato] = useState(null)
  const [mostrarPopup, setMostrarPopup] = useState(false)
  const [busqueda, setBusqueda] = useState("")
  const [healthScore, setHealthScore] = useState(0)
  const [vegan, setVegan] = useState(false)


  const handleDelete = (id) => {
    setPlatos((platos) => platos.filter(plato => plato.id !== id));
  }

  const handleMostrarPopup = async (plato) => {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${plato.id}/information?apiKey=${apikey}`)
    console.log(response.data.healthScore);
    setHealthScore(response.data.healthScore)
    setVegan(response.data.vegan)
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
        vegan={vegan}
        healthScore={healthScore}
      />
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8', // Fondo suave
    marginTop: 50, // Espacio superior para alejar de la parte superior de la pantalla
  },
  input: {
    borderWidth: 1,
    borderColor: '#c2c2c2', // Gris claro
    borderRadius: 8, // Bordes redondeados
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff', // Fondo blanco para la caja de texto
  },
  flatList: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "#fff" // Espacio entre los elementos y el borde inferior
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Color oscuro para el texto
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#777', // Gris suave para indicar que no hay resultados
  }
});
