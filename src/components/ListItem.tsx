import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import {ThemeContext} from '../context/ThemeContext';
import ListChangeNameModal from './ListChangeNameModal';
import RightAction from './RightAction';
import LeftAction from './LeftAction';
import {List} from '../types/contextTypes';
import {swipeableProps} from '../types/swipeableTypes';

interface Props extends swipeableProps {
  list: List;
}

const ListItem = ({list, index, closeRow, row, closeSwipeable}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    theme: {listText, dividerColor, colors},
  } = useContext(ThemeContext);

  const navigator = useNavigation();

  const handleNavigate = () => {
    closeSwipeable();

    navigator.navigate('List' as never, {listId: list.id} as never);
  };

  return (
    <Swipeable
      ref={ref => (row[index] = ref as any)}
      onSwipeableOpen={() => closeRow(index)}
      renderRightActions={(p, dragX) => (
        <RightAction
          id={list.id}
          closeSwipeable={closeSwipeable}
          dragX={dragX}
        />
      )}
      renderLeftActions={(p, dragX) => (
        <LeftAction
          setModalVisible={setModalVisible}
          closeSwipeable={closeSwipeable}
          dragX={dragX}
        />
      )}>
      <GestureHandlerRootView>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNavigate}
          onLongPress={() => setModalVisible(true)}
          style={{
            ...styles.itemContainer,
            borderBottomColor: dividerColor,
            backgroundColor: colors.background,
          }}>
          <Icon name={list.icon || 'cart-outline'} size={22} color={listText} />
          <Text style={{...styles.textItem, color: listText}}>
            {' '}
            {list.title}
          </Text>
          <View style={{flex: 1}} />
          <Text style={{...styles.textItem, color: listText}}>
            {list.items?.length}{' '}
          </Text>
          <Icon name="chevron-forward-outline" size={22} color={listText} />

          <ListChangeNameModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
            list={list}
          />
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  textItem: {
    fontWeight: '500',
    fontSize: 16,
  },
});
