export type List = {
  id: string;
  type: ListType;
  title: string;
  items?: item[];
  icon?: string;
  total?: number;
  showCompleted: boolean;
};

export type ListType = 'shopping' | 'todo';
export type item = {
  index: number;
  id: string;
  title: string;
  completed: boolean;
  price?: number;
};
