import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  route: string;
}

const FloatingButton = ({route}: Props) => {
  const navigator = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <View style={{...styles.button, backgroundColor: colors.primary}}>
      <TouchableOpacity onPress={() => navigator.navigate(route as never)}>
        <Icon name="add-outline" size={25} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
