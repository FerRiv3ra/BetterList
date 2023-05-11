import {List} from '../types/contextTypes';

export type menuOption = {
  text: string;
  iconName: string;
};

export const useMenuOptions = (list: List) => {
  const ListAction: menuOption[] =
    list.type === 'shopping'
      ? [
          {text: 'addCategory', iconName: 'add-circle-outline'},
          {
            text: list.showCompleted ? 'hideCompleted' : 'showCompleted',
            iconName: list.showCompleted ? 'eye-outline' : 'eye-off-outline',
          },
          {text: 'orderByName', iconName: 'swap-vertical-outline'},
          {text: 'orderByPrice', iconName: 'swap-vertical-outline'},
        ]
      : [
          {
            text: list.showCompleted ? 'hideCompleted' : 'showCompleted',
            iconName: list.showCompleted ? 'eye-outline' : 'eye-off-outline',
          },
          {text: 'orderByName', iconName: 'swap-vertical-outline'},
        ];
  return {
    ListAction,
  };
};
