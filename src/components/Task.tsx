import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {item} from '../types/contextTypes';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  item: item;
  handleTask: (task: item, addNew?: boolean) => void;
  total: number;
}

const Task = ({item, handleTask, total}: Props) => {
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);

  // TODO: Arreglar precio

  const lastItem = useRef<any>(null);

  const {
    theme: {dividerColor, listText},
  } = useContext(ThemeContext);

  useEffect(() => {
    if (item.index === total) {
      lastItem.current!.focus();
    }
  }, [total]);

  return (
    <View style={{...styles.itemContainer, borderBottomColor: dividerColor}}>
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
      {!!price ||
        (price === 0 && (
          <TextInput
            value={`${price}`}
            onChangeText={value => setPrice(Number(value))}
            onEndEditing={() => handleTask({...item, price})}
            onSubmitEditing={() => handleTask({...item, price}, true)}
            style={{
              flex: 1,
              fontSize: 18,
              color: item.completed ? '#666' : listText,
              textDecorationLine: item.completed ? 'line-through' : 'none',
            }}
          />
        ))}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});
