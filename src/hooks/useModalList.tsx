import {useContext} from 'react';
import {Alert} from 'react-native';

import {useTranslation} from 'react-i18next';

import AppContext from '../context/AppContext';
import {List} from '../types/contextTypes';

export const useModalList = () => {
  const {t} = useTranslation();
  const {updateList, removeList, lists} = useContext(AppContext);

  const handleSave = (
    title: string,
    list: List,
    setModalVisible: (visible: boolean) => void,
  ) => {
    if (!title.length) {
      Alert.alert(t('modal.error'), t('modal.errorMsg') || '');
      return;
    }

    updateList({...list, title});

    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(t('modal.warning'), `${t('modal.deleteMsg')}`, [
      {text: `${t('modal.cancel')}`},
      {text: `${t('modal.confirmDelete')}`, onPress: () => removeList(id)},
    ]);
  };

  const removeCategory = (id: string, category: string) => {
    Alert.alert(t('modal.warning'), `${t('modal.deleteMsgCategory')}`, [
      {text: `${t('modal.cancel')}`},
      {
        text: `${t('modal.confirmDelete')}`,
        onPress: () => handleDeleteCategory(id, category),
      },
    ]);
  };

  const handleDeleteCategory = (id: string, category: string) => {
    const updatedList = lists.filter(list => list.id === id)[0];

    updatedList.categories = updatedList.categories?.filter(
      cat => cat !== category,
    );

    updatedList.items = updatedList.items?.filter(
      item => item.category !== category,
    );

    updateList(updatedList);
  };

  return {
    handleSave,
    handleDelete,
    removeCategory,
  };
};
