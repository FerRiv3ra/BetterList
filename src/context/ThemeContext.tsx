import React, {createContext, useEffect, useReducer, useState} from 'react';
import {Appearance, useColorScheme} from 'react-native';
import {ThemeState, themeReducer, lightTheme, darkTheme} from './themeReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
  theme: ThemeState;
  devTheme: string;
  autoTheme: boolean;
  actualTheme: string;
  setAutoTheme: (value: boolean) => void;
  setDevTheme: (value: string) => void;
  setTheme: (value: string) => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);

export const ThemeProvider = ({children}: any) => {
  const [devTheme, setDevTheme] = useState('');
  const [autoTheme, setAutoTheme] = useState(false);
  const [actualTheme, setActualtheme] = useState('');

  const colorScheme = useColorScheme();

  const [theme, dispatch] = useReducer(
    themeReducer,
    Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme,
  );

  useEffect(() => {
    checkCurrentTheme();
  }, []);

  useEffect(() => {
    if (autoTheme) {
      colorScheme === 'light' ? setLightTheme() : setDarkTheme();
      setActualtheme(colorScheme || 'light');
    } else {
      devTheme === 'dark' ? setDarkTheme() : setLightTheme();
      setActualtheme(devTheme || 'light');
    }
  }, [colorScheme, autoTheme, devTheme]);

  const checkCurrentTheme = async () => {
    const currentTheme = await AsyncStorage.getItem('theme');

    if (!!currentTheme) {
      setDevTheme(currentTheme);
    }
  };

  const setTheme = async (theme: string) => {
    setDevTheme(theme);

    await AsyncStorage.setItem('theme', theme);
  };

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
        setTheme,
        setAutoTheme,
        autoTheme,
        actualTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};
