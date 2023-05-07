import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {item} from '../types/contextTypes';
import {ThemeContext} from '../context/ThemeContext';
import {useTask} from '../hooks/useTask';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import RightAction from './RightAction';

interface Props {
  item: item;
  handleTask: (task: item, addNew?: boolean) => void;
  removeTask: (id: string) => void;
  total: number;
}

const Task = ({item, handleTask, total, removeTask}: Props) => {
  const {title, setTitle, lastItem, price, handlePrice} = useTask(item, total);

  const {
    theme: {dividerColor, listText, colors},
  } = useContext(ThemeContext);

  return (
    <Swipeable
      renderRightActions={(p, dragX) => (
        <RightAction id={item.id} dragX={dragX} task />
      )}
      onSwipeableOpen={() => removeTask(item.id)}>
      <GestureHandlerRootView>
        <View
          style={{
            ...styles.itemContainer,
            borderBottomColor: dividerColor,
            backgroundColor: colors.background,
          }}>
          <Pressable
            onPress={() => handleTask({...item, completed: !item.completed})}
            style={{flexDirection: 'row'}}>
            <Icon
              name={item.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={22}
              style={{marginRight: 5}}
              color={listText}
            />
            <TextInput
              value={title}
              ref={lastItem}
              onChangeText={setTitle}
              onEndEditing={() => handleTask({...item, title})}
              onSubmitEditing={() => handleTask({...item, title}, true)}
              style={{
                flex: 1,
                fontSize: 18,
                color: item.completed ? '#666' : listText,
                textDecorationLine: item.completed ? 'line-through' : 'none',
              }}
            />
          </Pressable>
          {typeof price === 'string' && (
            <View style={{...styles.bottomTextContainer}}>
              <Text style={{...styles.bottomText}}>$ </Text>
              <TextInput
                value={price}
                keyboardType="decimal-pad"
                onChangeText={handlePrice}
                onEndEditing={() => handleTask({...item, price: Number(price)})}
                onSubmitEditing={() =>
                  handleTask({...item, price: Number(price)}, true)
                }
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: item.completed ? '#666' : listText,
                }}
              />
            </View>
          )}
        </View>
      </GestureHandlerRootView>
    </Swipeable>
  );
};

export default Task;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    paddingLeft: 25,
    paddingRight: 10,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
