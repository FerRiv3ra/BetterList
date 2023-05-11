import {View} from 'react-native';
import React from 'react';

import Task from './Task';
import {List, item} from '../types/contextTypes';

interface Props {
  selectedList: List;
  category: string;
  currentList: item[];
  handleTask: (task: item, category?: string, addNew?: boolean) => void;
  removeTask: (id: string) => void;
  totalTasks: number;
}

const ListItems = ({
  selectedList,
  currentList,
  category,
  handleTask,
  removeTask,
  totalTasks,
}: Props) => {
  return (
    <View>
      {currentList.map(item => {
        if (selectedList.showCompleted) {
          return (
            <Task
              item={item}
              key={item.index}
              category={category}
              listType={selectedList.type}
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
                listType={selectedList.type}
                handleTask={handleTask}
                removeTask={removeTask}
                total={totalTasks}
              />
            );
          }
        }
      })}
    </View>
  );
};

export default ListItems;
