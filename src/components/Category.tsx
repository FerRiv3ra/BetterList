import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {item} from '../types/contextTypes';
import {ThemeContext} from '../context/ThemeContext';

interface Props {
  category: string;
  tasks: item[] | undefined;
  isOpen: boolean;
}

const Category = ({category, isOpen}: Props) => {
  const {
    theme: {colors, dividerColor},
  } = useContext(ThemeContext);

  // TODO: Trabajar las listas internas por categoria

  return (
    <View
      style={{
        ...styles.card,
        borderBottomColor: dividerColor,
        backgroundColor: colors.background,
      }}>
      <Text style={{...styles.text}}>{category}</Text>
      <Icon
        name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
        size={16}
      />

      {/* {selectedList.items?.map(item => {
          if (selectedList.showCompleted) {
            return (
              <Task
                item={item}
                key={item.index}
                category={category}
                handleTask={handleTask}
                removeTask={removeTask}
                total={totalTasks}
              />
            );
          } else {
            if (!item.completed) {
              return (
                <Task
                  item={item}
                  key={item.index}
                  category={category}
                  handleTask={handleTask}
                  removeTask={removeTask}
                  total={totalTasks}
                />
              );
            }
          }
        })} */}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: '600',
  },
});
