export type List = {
  id: string;
  categories?: string[];
  icon?: string;
  items?: item[];
  showCompleted: boolean;
  title: string;
  total?: number;
  type: ListType;
};

export type ListType = 'shopping' | 'todo';

export type item = {
  id: string;
  index: number;
  category: string;
  completed: boolean;
  price?: number;
  title: string;
};
