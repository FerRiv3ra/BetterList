import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {List} from '../types/contextTypes';
import {useTranslation} from 'react-i18next';
import {useModalList} from '../hooks/useModalList';

interface Props {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  list: List;
}

const ListChangeNameModal = ({setModalVisible, modalVisible, list}: Props) => {
  const [currentTitle, setCurrentTitle] = useState(list.title);
  const {t} = useTranslation();

  const {
    theme: {colors, listText, dark},
  } = useContext(ThemeContext);

  const {handleDelete, handleSave} = useModalList();

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
            value={currentTitle}
            onChangeText={setCurrentTitle}
            onSubmitEditing={() => Keyboard.dismiss()}
            style={{...styles.input, borderBottomColor: listText}}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{...styles.button, backgroundColor: colors.primary}}
            onPress={() => handleSave(currentTitle, list, setModalVisible)}>
            <Icon name="save-outline" size={15} color={colors.text} />
            <Text style={{...styles.textStyle, color: colors.text}}>
              {' '}
              {t('modal.save')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{...styles.button, ...styles.buttonDelete}}
            onPress={() => handleDelete(list.id)}>
            <Icon name="trash-outline" size={15} color={colors.text} />
            <Text style={{...styles.textStyle, color: colors.text}}>
              {' '}
              {t('modal.delete')}
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

export default ListChangeNameModal;

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
  buttonDelete: {
    backgroundColor: '#EF4444',
    marginTop: 15,
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
