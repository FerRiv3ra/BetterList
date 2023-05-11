import {Swipeable} from 'react-native-gesture-handler';

export interface swipeableProps {
  index: number;
  closeRow: (index: number) => void;
  row: Swipeable[];
  closeSwipeable: () => void;
}
