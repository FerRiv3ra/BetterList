import {Swipeable} from 'react-native-gesture-handler';
export const useControlSwipeable = () => {
  let row: Swipeable[] = [];
  let prevOpenedRow: Swipeable;

  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const closeSwipeable = () => {
    prevOpenedRow.close();
  };

  return {
    row,
    closeRow,
    closeSwipeable,
  };
};
