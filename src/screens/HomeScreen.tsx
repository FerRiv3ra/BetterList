import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';

const height = Dimensions.get('window').height;

interface Props extends DrawerScreenProps<any, any> {}

const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.header} />
      <TouchableOpacity
        style={{...styles.menu, top: top + 10}}
        onPress={() => navigation.toggleDrawer()}
        activeOpacity={0.6}>
        <Icon name="menu-outline" size={30} color={'#FFF'} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    height: height / 3,
    backgroundColor: '#6663F1',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  menu: {
    position: 'absolute',
    left: 15,
  },
});
