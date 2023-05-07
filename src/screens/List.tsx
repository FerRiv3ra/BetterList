import {
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../context/ThemeContext';
import Task from '../components/Task';
import ListFooter from '../components/ListFooter';
import {useList} from '../hooks/useList';

interface Props extends StackScreenProps<RootStackParams, 'List'> {}

const List = ({
  navigation,
  route: {
    params: {listId},
  },
}: Props) => {
  const {
    addTask,
    handleCompleted,
    handleSortByName,
    handleTask,
    removeTask,
    selectedList,
    showCompleted,
    total,
    totalTasks,
  } = useList(listId);

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();

  return (
    <View style={{backgroundColor: colors.card, flex: 1}}>
      <Pressable
        style={{
          backgroundColor: colors.primary,
          paddingTop: top + 5,
          ...styles.header,
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={25} color={colors.card} />
        </TouchableOpacity>
        <Icon.Button
          name={!showCompleted ? 'eye' : 'eye-off'}
          size={25}
          color={colors.card}
          onPress={() => handleCompleted(showCompleted)}
          backgroundColor="transparent">
          Completed
        </Icon.Button>
        <TouchableOpacity activeOpacity={0.7} onPress={handleSortByName}>
          <Icon name="swap-vertical" size={25} color={colors.card} />
        </TouchableOpacity>
      </Pressable>
      <ScrollView keyboardDismissMode="on-drag">
        {selectedList.items?.map(item => {
          if (selectedList.showCompleted) {
            return (
              <Task
                item={item}
                key={item.index}
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
                  handleTask={handleTask}
                  removeTask={removeTask}
                  total={totalTasks}
                />
              );
            }
          }
        })}
      </ScrollView>
      <ListFooter onPress={addTask} total={total} type={selectedList.type} />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
});
