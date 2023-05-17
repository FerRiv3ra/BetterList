import {Alert} from 'react-native';
import {useContext, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {v4 as uuidv4} from 'uuid';

import AppContext from '../context/AppContext';
import {item, List, ListType} from '../types/contextTypes';

export const useList = (listId: string) => {
  const [selectedList, setSelectedList] = useState<List>({
    title: '',
    type: 'shopping',
    id: '',
    orderByNameAsc: true,
    orderByPriceAsc: true,
    showCompleted: true,
    total: 0,
  });
  const [allTasks, setAllTasks] = useState<item[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [sortByName, setSortByName] = useState<boolean>(false);

  const {lists, updateList} = useContext(AppContext);
  const {t} = useTranslation();

  useEffect(() => {
    const currentList = lists.filter(li => li.id === listId)[0];

    if (currentList.type === 'shopping') {
      const tot = updateTotal(currentList.items || []);

      currentList.total = tot;
    }

    setSelectedList(currentList);
    setShowCompleted(currentList.showCompleted);
    setAllTasks(currentList.items || []);
  }, [lists]);

  const updateTotal = (li: item[]): number => {
    const totalList = li.reduce((tot, task) => {
      if (!task.completed) {
        tot += task.price! || 0;
      }

      return tot;
    }, 0);

    setTotal(totalList);

    return totalList || 0;
  };

  const handleCompleted = (completed: boolean) => {
    const currentList: List = {...selectedList, showCompleted: !completed};

    updateList(currentList);
  };

  const handleTask = (task: item, category: string = '', addNew = false) => {
    const currentTask = allTasks.filter(t => t.id === task.id)[0];

    if (addNew && !!task.title.length) {
      addTask(category, selectedList.type);
      return;
    }

    if (!task.title.length) {
      removeTask(task.id);
      return;
    }

    if (!!currentTask) {
      if (
        currentTask.title === task.title &&
        currentTask.price === task.price &&
        currentTask.completed === task.completed
      )
        return;
    }

    if (!!task.title.length) {
      const updatedTaskList = allTasks.map(t => {
        if (t.index === task.index) {
          if (task.price) {
            task.price = Number(task.price.toFixed(2));
          }

          return task;
        } else {
          return t;
        }
      });

      updateList({...selectedList, items: updatedTaskList});
      setAllTasks(updatedTaskList);

      updateTotal(updatedTaskList);
    }
  };

  const removeTask = (id: string) => {
    const updatedTaskList = allTasks.filter(t => t.id !== id);

    updateList({...selectedList, items: updatedTaskList});
    setAllTasks(updatedTaskList);
  };

  const addTask = (category: string, listType: ListType) => {
    if (listType === 'shopping' && category.length < 2) {
      Alert.alert(t('modal.error'), t('modal.errorCategoryMsg') || '');
      return;
    }

    const newTask: item = {
      index: allTasks.length + 1,
      title: '',
      category,
      listId,
      completed: false,
      price: 0.0,
      id: uuidv4(),
    };

    setAllTasks([...allTasks, newTask]);

    updateList({...selectedList, items: [...allTasks, newTask]});
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
  };

  return {
    addTask,
    handleCompleted,
    handleSortByName,
    handleTask,
    removeTask,
    selectedList,
    showCompleted,
    total,
    totalTasks: allTasks.length,
  };
};
