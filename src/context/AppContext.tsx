import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {List} from '../types/contextTypes';
import i18n from '../translations/config/i18NextConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AppContextProps = {
  lists: List[];
  setLists: Dispatch<SetStateAction<List[]>>;
  setLanguage: (lang: string) => void;
};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    checkLanguage();
  }, []);

  const checkLanguage = async () => {
    const lang = await AsyncStorage.getItem('lang');

    if (!!lang) {
      i18n.changeLanguage(lang);
    } else {
      i18n.changeLanguage('es');

      await AsyncStorage.setItem('lang', 'es');
    }
  };

  const setLanguage = async (lang: string) => {
    i18n.changeLanguage(lang);

    await AsyncStorage.setItem('lang', lang);
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        setLists,
        setLanguage,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
