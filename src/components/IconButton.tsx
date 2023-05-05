import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  selected?: boolean;
  onPress: (iconName: string) => void;
}

const IconButton = ({iconName, selected = false, onPress}: Props) => {
  return (
    <Pressable
      style={{
        ...styles.wrapIcon,
        backgroundColor: selected ? '#6663F1' : '#EEE',
      }}
      onPress={() => onPress(iconName)}>
      <Icon name={iconName} size={20} color={selected ? 'white' : '#333'} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  wrapIcon: {
    padding: 10,
    borderRadius: 50,
    margin: 4,
  },
});
