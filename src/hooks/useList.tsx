import {useContext, useEffect, useState} from 'react';

import AppContext from '../context/AppContext';
import {item, List} from '../types/contextTypes';

export const useList = (listId: string) => {
  const [selectedList, setSelectedList] = useState<List>({
    title: '',
    type: 'shopping',
    id: '',
    showCompleted: true,
    total: undefined,
  });
  const [allTasks, setAllTasks] = useState<item[]>([]);
  const [total, setTotal] = useState<number | undefined>(0);
  const [showCompleted, setShowCompleted] = useState<boolean>(true);
  const [sortByName, setSortByName] = useState<boolean>(false);

  const {lists} = useContext(AppContext);

  useEffect(() => {
    const currentList = lists.filter(li => li.id === listId)[0];

    if (currentList.type === 'shopping') {
      const tot = updateTotal(currentList.items || []);

      currentList.total = tot;
    }

    setSelectedList(currentList);
    setShowCompleted(currentList.showCompleted);
    setAllTasks(currentList.items || []);
  }, []);

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
          if (task.price) {
            task.price = Number(task.price.toFixed(2));
          }

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

      updateTotal(updatedTaskList);
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
      price: 0.0,
    };

    setAllTasks([...allTasks, newTask]);

    setSelectedList({...selectedList, items: [...allTasks, newTask]});
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
  };

  return {
    showCompleted,
    handleCompleted,
    handleSortByName,
    selectedList,
    handleTask,
    totalTasks: allTasks.length,
    addTask,
    total,
  };
};
