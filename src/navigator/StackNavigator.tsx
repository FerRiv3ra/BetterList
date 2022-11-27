import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddList from '../screens/AddList';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Lists from '../screens/Lists';

export type RootStackParams = {
  HomeScreen: undefined;
  AddList: undefined;
  Lists: {type: 'shopping' | 'todo'};
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
    </Stack.Navigator>
  );
};
