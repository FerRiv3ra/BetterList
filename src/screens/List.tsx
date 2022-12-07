import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import AppContext from '../context/AppContext';
import {item, List as ListType} from '../types/contextTypes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import Task from '../components/Task';

interface Props extends StackScreenProps<RootStackParams, 'List'> {}

const List = ({
  navigation,
  route: {
    params: {listId},
  },
}: Props) => {
  const [selectedList, setSelectedList] = useState<ListType>({
    title: '',
    type: 'shopping',
    id: '',
    showCompleted: true,
  });
  const [allTasks, setAllTasks] = useState<item[]>([]);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [sortByName, setSortByName] = useState(false);

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {lists} = useContext(AppContext);
  const {top} = useSafeAreaInsets();

  useEffect(() => {
    const currentList = lists.filter(li => li.id === listId)[0];
    setSelectedList(currentList);
    setShowCompleted(currentList.showCompleted);
    setAllTasks(currentList.items || []);
  }, []);

  const handleCompleted = (completed: boolean) => {
    console.log(completed);
    setShowCompleted(!completed);

    if (!completed) {
      setSelectedList({...selectedList, items: allTasks});
    } else {
      setSelectedList({
        ...selectedList,
        items: selectedList.items?.filter(item => !item.completed),
      });
    }
  };

  const handleTask = (task: item, addNew = false) => {
    // TODO: mover a context
    if (!!task.title.length) {
      const updatedTaskList = allTasks.map(t => {
        if (t.index === task.index) {
          return task;
        } else {
          return t;
        }
      });

      setAllTasks(updatedTaskList);

      setSelectedList({...selectedList, items: updatedTaskList});

      if (addNew) {
        addTask();
      }
    } else {
      removeTask(task.index);
    }
  };

  const removeTask = (index: number) => {
    const updatedTaskList = allTasks.filter(t => t.index !== index);

    setAllTasks(updatedTaskList);

    setSelectedList({...selectedList, items: updatedTaskList});
  };

  const addTask = () => {
    const newTask: item = {
      index: allTasks.length + 1,
      title: '',
      completed: false,
    };

    setAllTasks([...allTasks, newTask]);

    setSelectedList({...selectedList, items: [...allTasks, newTask]});
  };

  return (
    <Pressable
      style={{backgroundColor: colors.card, flex: 1}}
      onPress={addTask}>
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
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSortByName(!sortByName)}>
          <Icon name="swap-vertical" size={25} color={colors.card} />
        </TouchableOpacity>
      </Pressable>
      <ScrollView>
        {selectedList.items?.map(item => (
          <Task
            item={item}
            key={item.index}
            handleTask={handleTask}
            total={allTasks.length}
          />
        ))}
      </ScrollView>
    </Pressable>
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
