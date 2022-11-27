export type List = {
  id: string;
  type: ListType;
  title: string;
  items?: string[];
  icon?: string;
};

export type ListType = 'shopping' | 'todo';
