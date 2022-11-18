import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  cant: number;
  color: string;
  fontSize?: number;
  icon: string;
  title: string;
  route: string;
}

const ButtonLarge = ({
  title,
  icon,
  fontSize = 18,
  color = '#FFF',
  cant,
  route,
}: Props) => {
  const navigator = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{...styles.button, backgroundColor: colors.primary}}
      onPress={() => navigator.navigate(route as never)}>
      <Icon name={icon} size={fontSize} color={color} />
      <Text style={{...styles.textBtn, color, fontSize}}> {title}</Text>
      <View style={{flex: 1}} />
      <View style={{...styles.cant, backgroundColor: colors.card}}>
        <Text style={{color: colors.primary, fontWeight: '800'}}>{cant}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonLarge;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontWeight: '700',
  },
  cant: {
    padding: 10,
    borderRadius: 50,
  },
});
