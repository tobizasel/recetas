import { Image, StyleSheet, View, Button, Text, Modal } from 'react-native';
import { MenuContext } from '@/contexts/MenuContext';
import { useContext } from 'react';

export function Plato({plato, onDelete, mostrarPopup}){

    const { agregarAlMenu } = useContext(MenuContext)

    const agregar = (plato) => {
        agregarAlMenu(plato)
        onDelete(plato.id)
    }

    return (
    <View style={styles.container}>
      <Text style={styles.title}>{plato.title}</Text>
      <Image
        source={{ uri: plato.image }}
        style={styles.image}
      />
      <View style={styles.buttonsContainer}>
        <Button title="Ver Detalle"  onPress={() => mostrarPopup(plato)}/>
        <Button title="Agregar al menu"  onPress={() => agregar(plato)} color="green"/>
      </View>
    </View>
    )
}

export function Popup({ visibilidad, onClose, plato }){
    return (
      <Modal
        visible={visibilidad}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        <View style={stylesPopup.overlay}>
          <View style={stylesPopup.modalContainer}>
            <Text style={stylesPopup.title}>{plato.title}</Text>
            <Image
              source={{ uri: plato.image }}
              style={stylesPopup.image}
            />
            <Button title="Cerrar" onPress={onClose} />
          </View>
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
    container: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginVertical: 10,
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

  const stylesPopup = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
  });