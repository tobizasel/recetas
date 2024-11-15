import axios from 'axios';
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

export const MenuContext = createContext();

var menuVegano = 0;
var menuNoVegano = 0

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);

  const apiKey = "14a1dd4ac511492c96e50f1df6d6dc7e"

  const agregarAlMenu = async (plato) => {

    const response = await axios.get(`https://api.spoonacular.com/recipes/${plato.id}/information?apiKey=${apiKey}`)
        
        if (response.data.vegan && menuVegano < 2) {
          menuVegano+=1
          console.log("ES VVEGANO", menuVegano);
          setMenu((menu) => [...menu, {plato: plato, ingredientes: response.data}]);
        } else if ((!response.data.vegan) && menuNoVegano < 2) {
          menuNoVegano+=1
          console.log("NO ES VVEGANO", menuNoVegano);
          setMenu((menu) => [...menu, {plato: plato, ingredientes: response.data}]);
        } else if (menuNoVegano >= 2 || menuVegano >= 2) {
            Alert.alert("Demasiadas cosas en el menu")
        }

  };

  const eliminarDelMenu = (id, vegano) => {
    setMenu((menu) => menu.filter(platoMenu => platoMenu.plato.id !== id));
    vegano ? menuVegano-=1 : menuNoVegano-=1;

  };

  return (
    <MenuContext.Provider value={{ menu, agregarAlMenu, eliminarDelMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
