import React, {createContext, useEffect, useReducer, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../translations/config/i18NextConfig';
import Realm from 'realm';
import {
  AdsConsent,
  AdsConsentStatus,
  MobileAds,
} from 'react-native-google-mobile-ads';

import {listReducer} from './listReducer';
import {List, item} from '../types/contextTypes';
import {quickStart} from '../config/realmConfig';

type AppContextProps = {
  lists: List[];
  setLanguage: (lang: string) => void;
  addList: (list: List) => void;
  updateList: (list: List) => void;
  removeList: (id: string) => void;
  currency: string;
  sortList: (
    listId: string,
    asc: boolean,
    type: 'byName' | 'byPrice',
  ) => Promise<void>;
  showAds: boolean;
  setNewCurrency: (curr: string) => void;
};

const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [lists, dispatch] = useReducer(listReducer, []);
  const [currency, setCurrency] = useState('');
  const [showAds, setShowAds] = useState(true);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    loadAdsEngine();
  }, []);

  useEffect(() => {
    checkLanguage();
  }, []);

  useEffect(() => {
    checkCurrency();
  }, []);

  // RealmDB init
  const init = async () => {
    await quickStart();

    try {
      const realm = await Realm.open({path: 'betterLists'});

      const listsDB = realm.objects<List[]>('lists').toJSON();

      dispatch({type: 'load-data', payload: listsDB as List[]});

      // SplashScreen.hide();
      realm.close();
    } catch (error: any) {
      console.error('Failed to open the realm Context init', error.message);
    }
  };

  // Init add engine
  const loadAdsEngine = async () => {
    const consentInfo = await AdsConsent.requestInfoUpdate();
    if (
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdsConsentStatus.REQUIRED
    ) {
      const {status} = await AdsConsent.showForm();

      await AsyncStorage.setItem('adsStatus', status);
    }

    MobileAds().initialize().then(console.log);
  };

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

  const updateList = async (list: List) => {
    dispatch({
      type: 'update-list',
      payload: list,
    });

    try {
      const realm = await Realm.open({path: 'betterLists'});

      realm.write(() => {
        const tempList = realm.objectForPrimaryKey<List>('lists', list.id);

        tempList!.categories = list.categories;
        tempList!.items = list.items;
        tempList!.expandAll = list.expandAll;
        tempList!.orderByNameAsc = list.orderByNameAsc;
        tempList!.showCompleted = list.showCompleted;
        tempList!.title = list.title;
        tempList!.total = list.total;
      });

      realm.close();
    } catch (error: any) {
      console.error('Failed to open the realm update', error.message);
    }
  };

  const removeList = async (id: string) => {
    dispatch({
      type: 'remove-list',
      payload: id,
    });

    try {
      const realm = await Realm.open({path: 'betterLists'});

      const currentList = realm.objectForPrimaryKey<List>('lists', id);

      realm.write(() => {
        realm.delete(currentList);
      });

      realm.close();
    } catch (error: any) {
      console.error('Failed to open the realm delete', error.message);
    }
  };

  const sortList = async (
    listId: string,
    asc: boolean,
    type: 'byName' | 'byPrice',
  ) => {
    const currentList = lists.filter(list => list.id === listId)[0];

    try {
      const realm = await Realm.open({path: 'betterLists'});

      const items = realm
        .objects<item[]>('item')
        .filtered(`listId = "${listId}" AND title != ""`)
        .sorted(type === 'byName' ? 'title' : 'price', !asc)
        .toJSON();

      realm.close();

      updateList({
        ...currentList,
        orderByNameAsc: type === 'byName' ? !asc : asc,
        orderByPriceAsc: type === 'byPrice' ? !asc : asc,
        items: items as item[],
      });
    } catch (error: any) {
      console.error('Failed to open the realm sortByName', error.message);
    }
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
        sortList,
        currency,
        setNewCurrency,
        showAds,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
