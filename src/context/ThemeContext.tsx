import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {ThemeState, themeReducer, lightTheme, darkTheme} from './themeReducer';

interface ThemeContextProps {
  theme: ThemeState;
  devTheme: string;
  autoTheme: boolean;
  actualTheme: string;
  setAutoTheme: (value: boolean) => void;
  setDevTheme: (value: string) => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {
  // TODO: Agregar al storage el estado del tema
  const [devTheme, setDevTheme] = useState('');
  const [autoTheme, setAutoTheme] = useState(false);
  const [actualTheme, setActualtheme] = useState('');

  const colorScheme = useColorScheme();

  const [theme, dispatch] = useReducer(
    themeReducer,
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    if (autoTheme) {
      colorScheme === 'light' ? setLightTheme() : setDarkTheme();
      setActualtheme(colorScheme || 'light');
    } else {
      devTheme === 'dark' ? setDarkTheme() : setLightTheme();
      setActualtheme(devTheme);
    }
  }, [colorScheme, autoTheme, devTheme]);

  const setDarkTheme = () => {
    dispatch({type: 'set_dark_theme'});
    console.log('setDarkTheme');
  };

  const setLightTheme = () => {
    dispatch({type: 'set_light_theme'});
    console.log('setLightTheme');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setDarkTheme,
        setLightTheme,
        devTheme,
        setDevTheme,
        setAutoTheme,
        autoTheme,
        actualTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
