export type List = {
  id: string;
  categories?: string[];
  expandAll: boolean;
  icon?: string;
  items?: item[];
  showCompleted: boolean;
  title: string;
  total: number;
  orderByNameAsc: boolean;
  orderByPriceAsc: boolean;
  type: ListType;
};

export type ListType = 'shopping' | 'todo';

export type item = {
  id: string;
  index: number;
  category: string;
  completed: boolean;
  listId: string;
  price?: number;
  title: string;
};
