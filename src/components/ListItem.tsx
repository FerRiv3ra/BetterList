import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {List} from '../types/contextTypes';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import ListChangeNameModal from './ListChangeNameModal';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import RightAction from './RightAction';
import LeftAction from './LeftAction';

const ListItem = (list: List) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    theme: {listText, dividerColor, colors},
  } = useContext(ThemeContext);

  const swipeableRef = useRef<any>(null);

  const closeSwipeable = () => {
    swipeableRef.current.close();
  };

  const navigator = useNavigation();

  return (
    <Swipeable
      ref={swipeableRef}
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
          onPress={() =>
            navigator.navigate('List' as never, {listId: list.id} as never)
          }
          onLongPress={() => setModalVisible(true)}
          style={{
            ...styles.itemContainer,
            borderBottomColor: dividerColor,
            backgroundColor: colors.background,
          }}>
          <Icon name={list.icon || 'cart-outline'} size={20} color={listText} />
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
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  textItem: {
    fontWeight: '600',
  },
});
