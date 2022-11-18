import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import SegmentedControl from '../components/SegmentedControls';
import {globalStyles} from '../theme/globalStyles';

interface Props extends StackScreenProps<RootStackParams, 'AddList'> {}

const AddList = ({navigation}: Props) => {
  const [type, setType] = useState('shopping');
  const {top} = useSafeAreaInsets();

  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View style={{backgroundColor: colors.card, flex: 1, paddingTop: top}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color={colors.text} size={18} />
        </TouchableOpacity>
        <View style={{marginTop: 80, marginHorizontal: 20}}>
          <Text
            style={{
              ...globalStyles.title,
              color: colors.primary,
              marginTop: 20,
            }}>
            Type
          </Text>
          <SegmentedControl
            values={[
              {key: '🛒 Shopping', value: 'shopping'},
              {key: '☑️ To do', value: 'shopping'},
            ]}
            onChange={setType}
            backgroundColor={colors.primary}
            tintColor={colors.card}
            textColor={colors.text}
            selectedTextColor={colors.primary}
          />
          <Text
            style={{
              ...globalStyles.title,
              color: colors.primary,
              marginTop: 20,
            }}>
            Title
          </Text>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#a5b4fc"
            style={{
              ...styles.input,
              backgroundColor: colors.card,
            }}
          />
        </View>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={{...styles.saveBtn, backgroundColor: colors.primary}}
          activeOpacity={0.7}>
          <Icon name="save-outline" color={colors.text} size={18} />
          <Text style={{...styles.textSave, color: colors.text}}> Save</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 15,
    borderRadius: 50,
    left: 15,
    top: 15,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#6663F1',
  },
  saveBtn: {
    marginBottom: 50,
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontSize: 18,
    fontWeight: '500',
  },
});
