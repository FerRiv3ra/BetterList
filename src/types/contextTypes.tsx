export type List = {
  id: string;
  type: ListType;
  title: string;
  items?: item[];
  icon?: string;
  showCompleted: boolean;
};

export type ListType = 'shopping' | 'todo';
export type item = {
  index: number;
  title: string;
  completed: boolean;
};
