import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import {List} from '../types/contextTypes';

interface Props {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  list: List;
}

const ModalNewCategory = ({modalVisible, setModalVisible, list}: Props) => {
  const [currentCategory, setCurrentCategory] = useState<string>();

  const {
    theme: {colors, dark, listText},
  } = useContext(ThemeContext);
  const {updateList} = useContext(AppContext);
  const {t} = useTranslation();

  const handleSave = () => {
    if (!currentCategory || currentCategory.length < 2) {
      Alert.alert(t('modal.error'), `${t('modal.errorCategory')}`);
      return;
    }

    updateList({
      ...list,
      categories: [...(list.categories as []), currentCategory.trim()],
    });
    setCurrentCategory('');
    setModalVisible(false);
  };

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View
        style={{
          ...styles.centeredView,
          backgroundColor: dark
            ? 'rgba(255, 255, 255, 0.4)'
            : 'rgba(0, 0, 0, 0.4)',
        }}>
        <View style={{...styles.modalView, backgroundColor: colors.background}}>
          <TextInput
            placeholder={t('modal.placeholder') || ''}
            value={currentCategory}
            onChangeText={setCurrentCategory}
            onSubmitEditing={() => Keyboard.dismiss()}
            style={{...styles.input, borderBottomColor: listText}}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{...styles.button, backgroundColor: colors.primary}}
            onPress={handleSave}>
            <Icon name="add-outline" size={15} color={colors.text} />
            <Text style={{...styles.textStyle, color: colors.text}}>
              {' '}
              {t('modal.add')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{...styles.buttonClose, backgroundColor: colors.background}}
          activeOpacity={0.6}
          onPress={() => setModalVisible(false)}>
          <Icon name="close-outline" color={colors.border} size={26} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalNewCategory;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    alignSelf: 'center',
    marginTop: 30,
    padding: 10,
    borderRadius: 50,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
