import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import {ThemeContext} from '../context/ThemeContext';
import RightAction from './RightAction';
import ListItems from './ListItems';
import {List, item} from '../types/contextTypes';
import {swipeableProps} from '../types/swipeableTypes';

interface Props extends swipeableProps {
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
  index,
  closeRow,
  row,
  closeSwipeable,
}: Props) => {
  const [currentList, setCurrentList] = useState<item[]>([]);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  const {
    theme: {colors, dividerColor, listText},
  } = useContext(ThemeContext);

  useEffect(() => {
    setCurrentList(
      selectedList.items?.filter(cat => cat.category === category) as [],
    );
  }, [selectedList]);

  useEffect(() => {
    setTotal(
      selectedList.items?.filter(cat => cat.category === category).length || 0,
    );

    setCompleted(
      selectedList.items?.filter(
        cat => cat.category === category && cat.completed,
      ).length || 0,
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
    <Swipeable
      ref={ref => (row[index] = ref as any)}
      onSwipeableOpen={() => closeRow(index)}
      renderRightActions={(p, dragX) => (
        <RightAction
          id={selectedList.id}
          dragX={dragX}
          closeSwipeable={closeSwipeable}
          category
          categoryName={category}
        />
      )}>
      <GestureHandlerRootView>
        <Pressable onPress={handleCategory}>
          <View
            style={{
              ...styles.container,
              borderBottomColor: dividerColor,
              backgroundColor: colors.background,
            }}>
            <Text style={{...styles.text, color: listText}}>{category}</Text>
            <View style={{...styles.counterContainer}}>
              <Text
                style={{
                  ...styles.counter,
                  color: listText,
                }}>{`${completed}/${total}`}</Text>
              <Icon
                name={
                  isOpen ? 'chevron-down-outline' : 'chevron-forward-outline'
                }
                size={20}
                color={colors.primary}
              />
            </View>
          </View>
          {isOpen && (
            <ListItems
              currentList={currentList}
              selectedList={selectedList}
              category={category}
              handleTask={handleTask}
              removeTask={removeTask}
              totalTasks={totalTasks}
            />
          )}
        </Pressable>
      </GestureHandlerRootView>
    </Swipeable>
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
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counter: {
    fontSize: 12,
    fontWeight: '600',
  },
});
