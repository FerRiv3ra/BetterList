import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {List, item} from '../types/contextTypes';
import {ThemeContext} from '../context/ThemeContext';
import Task from './Task';

interface Props {
  category: string;
  selectedList: List;
  isOpen: boolean;
  setCategory: (cat: string) => void;
  handleTask: (task: item, category?: string, addNew?: boolean) => void;
  removeTask: (id: string) => void;
  totalTasks: number;
}

const Category = ({
  category,
  isOpen,
  setCategory,
  selectedList,
  handleTask,
  removeTask,
  totalTasks,
}: Props) => {
  const [currentList, setCurrentList] = useState<item[]>([]);

  const {
    theme: {colors, dividerColor, listText},
  } = useContext(ThemeContext);

  useEffect(() => {
    setCurrentList(
      selectedList.items?.filter(cat => cat.category === category) as [],
    );
  }, [selectedList]);

  const handleCategory = () => {
    if (isOpen) {
      setCategory('');
    } else {
      setCategory(category);
    }
  };

  return (
    <Pressable onPress={handleCategory}>
      <View
        style={{
          ...styles.container,
          borderBottomColor: dividerColor,
          backgroundColor: colors.background,
        }}>
        <Text style={{...styles.text, color: listText}}>{category}</Text>
        <Icon
          name={isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'}
          size={20}
          color={colors.primary}
        />
      </View>
      {isOpen &&
        currentList.map(item => {
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
        })}
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    padding: 10,
  },
  text: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
