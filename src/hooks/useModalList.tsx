import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import AppContext from '../context/AppContext';
import {List} from '../types/contextTypes';

export const useModalList = () => {
  const {t} = useTranslation();
  const {updateList, removeList} = useContext(AppContext);

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

  return {
    handleSave,
    handleDelete,
  };
};
