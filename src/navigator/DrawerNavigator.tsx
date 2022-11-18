import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackNavigator} from './StackNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Appearance,
} from 'react-native';
import {globalStyles} from '../theme/globalStyles';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';

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
  const {
    theme: {colors},
    actualTheme,
  } = useContext(ThemeContext);
  return (
    <DrawerContentScrollView
      style={{
        ...globalStyles.drawerContainer,
        backgroundColor: colors.primary,
      }}>
      <View style={globalStyles.drawerContainer}>
        <View style={globalStyles.drawerButtons}>
          <Image
            source={
              actualTheme === 'dark'
                ? require('../assets/dark_icon.png')
                : require('../assets/icon.png')
            }
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
            <Icon name="home-outline" size={20} color={colors.text} />
            <Text style={{...globalStyles.drawerText, color: colors.text}}>
              {' '}
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.6}
            style={globalStyles.drawerButton}>
            <Icon name="cog-outline" size={20} color={colors.text} />
            <Text style={{...globalStyles.drawerText, color: colors.text}}>
              {' '}
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};
