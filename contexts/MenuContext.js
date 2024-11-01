import axios from 'axios';
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [menuVegano, setMenuVegano] = useState([])
  const [menuNoVegano, setMenuNoVegano] = useState([])

  const agregarAlMenu = async (plato) => {

    const response = await axios.get(`https://api.spoonacular.com/recipes/${plato.id}/information?apiKey=${apikey}`)
        
        if (response.data.vegan && menuVegano.length <= 2) {
            setMenuVegano([...menuVegano, {plato: plato, ingredientes: response.data}])
        } else if ((!response.data.vegan) && menuNoVegano.length <= 2) {
            setMenuNoVegano([...menuNoVegano, {plato: plato, ingredientes: response.data}])
        } else if (menuNoVegano.length > 2 || menuVegano.length > 2) {
            Alert("Demasiadas cosas en el menu")
        }

    console.log(plato);
    setMenu((menu) => [...menu, {plato: plato, ingredientes: response.data}]);
  };

  const eliminarDelMenu = (id) => {
    setMenu((menu) => menu.filter(plato => plato.id !== id));
  };

  return (
    <MenuContext.Provider value={{ menu, agregarAlMenu, eliminarDelMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
