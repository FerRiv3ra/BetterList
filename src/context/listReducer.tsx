import {List} from '../types/contextTypes';

export type ListAction =
  | {type: 'add-list'; payload: List}
  | {type: 'update-list'; payload: List}
  | {type: 'remove-list'; payload: string};

export const listReducer = (state: List[], action: ListAction): List[] => {
  switch (action.type) {
    case 'add-list':
      return [...state, action.payload];

    case 'update-list':
      return state.map(list => {
        if (list.id === action.payload.id) return action.payload;

        return list;
      });

    case 'remove-list':
      return state.filter(list => list.id !== action.payload);

    default:
      return state;
  }
};
