import {
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

interface Props {
  setModalVisible: (visible: boolean) => void;
  modalVisible: boolean;
  title: string;
}

const ListChangeNameModal = ({setModalVisible, modalVisible, title}: Props) => {
  // TODO: Enviar cambios al context
  const [currentTitle, setCurrentTitle] = useState(title);

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            value={currentTitle}
            onChangeText={setCurrentTitle}
            style={{...styles.input, borderBottomColor: colors.border}}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            style={{...styles.button, backgroundColor: colors.primary}}
            onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="save-outline" size={15} color={colors.text} />
            <Text style={styles.textStyle}> Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ListChangeNameModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    marginHorizontal: 20,
    marginBottom: 150,
    backgroundColor: 'white',
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
});
