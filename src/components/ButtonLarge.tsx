import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  title: string;
  icon: string;
  fontSize?: number;
  color: string;
  cant: number;
}

const ButtonLarge = ({
  title,
  icon,
  fontSize = 18,
  color = '#FFF',
  cant,
}: Props) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Icon name={icon} size={fontSize} color={color} />
      <Text style={{...styles.textBtn, color, fontSize}}> {title}</Text>
      <View style={{flex: 1}} />
      <View style={styles.cant}>
        <Text style={{color: '#6663F1', fontWeight: '700'}}>{cant}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonLarge;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#6663F1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontWeight: '600',
  },
  cant: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 50,
  },
});
