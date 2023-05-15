import React, {createContext, useEffect, useReducer, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../translations/config/i18NextConfig';
import Realm from 'realm';

import {listReducer} from './listReducer';
import {List} from '../types/contextTypes';
import {quickStart} from '../config/realmConfig';

type AppContextProps = {
  lists: List[];
  setLanguage: (lang: string) => void;
  addList: (list: List) => void;
  updateList: (list: List) => void;
  removeList: (id: string) => void;
  currency: string;
  setNewCurrency: (curr: string) => void;
};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [lists, dispatch] = useReducer(listReducer, []);
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    checkLanguage();
  }, []);

  useEffect(() => {
    checkCurrency();
  }, []);

  const init = async () => {
    await quickStart();

    try {
      const realm = await Realm.open({path: 'betterLists'});

      const listsDB: any = realm.objects<List[]>('lists').toJSON();

      dispatch({type: 'load-data', payload: listsDB});

      // const orderLists = listsDB.sorted([
      //   ['pts', true],
      //   ['gd', true],
      //   ['gf', true],
      // ]);

      // SplashScreen.hide();
      realm.close();
    } catch (error: any) {
      console.error('Failed to open the realm Context init', error.message);
    }
  };

  console.log(lists);

  const addList = async (list: List) => {
    dispatch({
      type: 'add-list',
      payload: list,
    });

    try {
      const realm = await Realm.open({path: 'betterLists'});

      realm.write(() => {
        realm.create('lists', {...list});
      });

      realm.close();
    } catch (error: any) {
      console.error('Failed to open the realm create', error.message);
    }
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

  const checkCurrency = async () => {
    const currentCurrency = await AsyncStorage.getItem('currency');

    if (!!currentCurrency) {
      setCurrency(currentCurrency);
    } else {
      setCurrency('$');

      await AsyncStorage.setItem('currency', '$');
    }
  };

  const setNewCurrency = async (curr: string) => {
    setCurrency(curr);

    await AsyncStorage.setItem('currency', curr);
  };

  return (
    <AppContext.Provider
      value={{
        lists,
        setLanguage,
        addList,
        updateList,
        removeList,
        currency,
        setNewCurrency,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
