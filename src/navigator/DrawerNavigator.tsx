import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackNavigator} from './StackNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {globalStyles} from '../theme/globalStyles';

export type RootDrawerParams = {
  Home: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParams>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={StackNavigator} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

const DrawerContent = ({navigation}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView style={{...globalStyles.drawerContainer}}>
      <View style={globalStyles.drawerContainer}>
        <View style={globalStyles.drawerButtons}>
          <Image
            source={require('../assets/icon.png')}
            style={{
              height: 60,
              width: 58,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.6}
            style={globalStyles.drawerButton}>
            <Icon name="home-outline" size={20} color={'#FFF'} />
            <Text style={globalStyles.drawerText}> Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.6}
            style={globalStyles.drawerButton}>
            <Icon name="cog-outline" size={20} color={'#FFF'} />
            <Text style={globalStyles.drawerText}> Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
