import {Keyboard, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import IconButton from './IconButton';

interface Props {
  selectedIcon: string;
  setSelectedIcon: React.Dispatch<React.SetStateAction<string>>;
}

const ListIcons = ({selectedIcon, setSelectedIcon}: Props) => {
  const listIcons = [
    'list',
    'gift',
    'airplane',
    'bandage',
    'bulb',
    'calendar',
    'car-sport',
    'desktop',
    'document-text',
    'fast-food',
    'fitness',
    'football',
    'game-controller',
    'globe-outline',
    'hammer',
    'home',
    'man',
    'woman',
    'medkit',
    'mic',
    'musical-notes',
    'paw',
    'pint',
    'print',
    'receipt',
    'school',
    'shirt',
    'wallet',
  ];

  const onPress = (iconName: string) => {
    setSelectedIcon(iconName);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {listIcons.map((icon, index) => (
        <IconButton
          iconName={icon}
          key={index}
          selected={selectedIcon === icon}
          onPress={onPress}
        />
      ))}
    </View>
  );
};

export default ListIcons;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
