import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';

import {List} from '../types/contextTypes';
import {menuOption} from '../hooks/useMenuOptions';

interface Props {
  item: menuOption;
  list: List;
  openModalAddCategory: () => void;
  handleVisible: (visible: boolean) => void;
}

const MenuOption = ({
  item,
  list,
  handleVisible,
  openModalAddCategory,
}: Props) => {
  const {t} = useTranslation();
  const {
    theme: {dividerColor, listText},
  } = useContext(ThemeContext);
  const {updateList, sortList} = useContext(AppContext);

  const handlePress = () => {
    if (item.text === 'addCategory') {
      openModalAddCategory();
    }

    if (item.text === 'showCompleted' || item.text === 'hideCompleted') {
      updateList({...list, showCompleted: !list.showCompleted});
      handleVisible(false);
    }

    if (
      item.text === 'collapseCategories' ||
      item.text === 'expandCategories'
    ) {
      updateList({...list, expandAll: !list.expandAll});
      handleVisible(false);
    }

    if (item.text === 'orderByName') {
      sortList(list.id, list.orderByNameAsc, 'byName');
    }

    if (item.text === 'orderByPrice') {
      sortList(list.id, list.orderByPriceAsc, 'byPrice');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        ...styles.button,
        borderBottomWidth: item.text !== 'orderByPrice' ? 1 : 0,
        borderBottomColor: dividerColor,
      }}
      onPress={handlePress}>
      <Text style={{...styles.textBtn, color: listText}}>
        {t(`menu.${item.text}`)}
      </Text>
      <Icon name={item.iconName} size={19} color={listText} />
    </TouchableOpacity>
  );
};

export default MenuOption;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    width: 290,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBtn: {
    fontWeight: '500',
  },
});
