import {Modal, Pressable, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeContext} from '../context/ThemeContext';
import MenuOption from './MenuOption';
import {List} from '../types/contextTypes';

interface Props {
  visible: boolean;
  list: List;
  handleVisible: (visible: boolean) => void;
  openModalAddCategory: () => void;
}

export type menuOption = {
  text: string;
  iconName: string;
};

const MenuOptionsList = ({
  visible,
  list,
  handleVisible,
  openModalAddCategory,
}: Props) => {
  const {top} = useSafeAreaInsets();
  const {
    theme: {colors, currentTheme},
  } = useContext(ThemeContext);

  const ListAction: menuOption[] = [
    {text: 'addCategory', iconName: 'add-circle-outline'},
    {
      text: list.showCompleted ? 'showCompleted' : 'hideCompleted',
      iconName: list.showCompleted ? 'eye-outline' : 'eye-off-outline',
    },
    {text: 'orderByName', iconName: 'swap-vertical-outline'},
    {text: 'orderByPrice', iconName: 'swap-vertical-outline'},
  ];

  return (
    <Modal visible={visible} transparent>
      <Pressable
        onPress={() => handleVisible(false)}
        style={{
          ...styles.background,
          backgroundColor:
            currentTheme === 'light'
              ? 'rgba(0,0,0,0.1)'
              : 'rgba(255,255,255,0.1)',
        }}>
        <View
          style={{
            ...styles.container,
            backgroundColor: colors.card,
            shadowColor: currentTheme === 'light' ? '#000' : '#FFF',
            marginTop: top + 60,
          }}>
          {ListAction.map(opt => (
            <MenuOption
              key={opt.text}
              item={opt}
              list={list}
              openModalAddCategory={openModalAddCategory}
            />
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

export default MenuOptionsList;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: 10,
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  background: {
    flex: 1,
  },
});
