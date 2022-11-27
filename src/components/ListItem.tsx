import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../types/contextTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/ThemeContext';

const ListItem = (list: List) => {
  const {
    theme: {listText, dividerColor},
  } = useContext(ThemeContext);
  // TODO: Convertir a presable
  return (
    <View style={{...styles.itemContainer, borderBottomColor: dividerColor}}>
      <Icon name="cart-outline" size={20} color={listText} />
      <Text style={{...styles.textItem, color: listText}}> {list.title}</Text>
      <View style={{flex: 1}} />
      <Text style={{...styles.textItem, color: listText}}>
        {list.items?.length}{' '}
      </Text>
      <Icon name="chevron-forward-outline" size={22} color={listText} />
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  textItem: {
    fontWeight: '600',
  },
});
