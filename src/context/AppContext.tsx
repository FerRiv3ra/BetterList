import React, {createContext, useEffect, useReducer} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../translations/config/i18NextConfig';
import {listReducer} from './listReducer';
import {List} from '../types/contextTypes';

type AppContextProps = {
  lists: List[];
  setLanguage: (lang: string) => void;
  addList: (list: List) => void;
  updateList: (list: List) => void;
  removeList: (id: string) => void;
};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [lists, dispatch] = useReducer(listReducer, []);

  useEffect(() => {
    checkLanguage();
  }, []);

  const addList = (list: List) => {
    dispatch({
      type: 'add-list',
      payload: list,
    });
  };

  const updateList = (list: List) => {
    dispatch({
      type: 'update-list',
      payload: list,
    });
  };

  const removeList = (id: string) => {
    dispatch({
      type: 'remove-list',
      payload: id,
    });
  };

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
        setLanguage,
        addList,
        updateList,
        removeList,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
