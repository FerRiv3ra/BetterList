import {useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {ThemeContext} from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import AddList from '../screens/AddList';
import Lists from '../screens/Lists';
import List from '../screens/List';

export type RootStackParams = {
  HomeScreen: undefined;
  AddList: undefined;
  Lists: {type: 'shopping' | 'todo'};
  List: {listId: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        cardStyle: {backgroundColor: colors.card},
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddList" component={AddList} />
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="List" component={List} />
    </Stack.Navigator>
  );
};
