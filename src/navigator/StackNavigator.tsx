import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import TodoLists from '../screens/TodoLists';
import AddList from '../screens/AddList';
import ShoppingLists from '../screens/ShoppingLists';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

export type RootStackParams = {
  HomeScreen: undefined;
  AddList: undefined;
  ShoppingLists: undefined;
  TodoLists: undefined;
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
      <Stack.Screen name="ShoppingLists" component={ShoppingLists} />
      <Stack.Screen name="TodoLists" component={TodoLists} />
    </Stack.Navigator>
  );
};
