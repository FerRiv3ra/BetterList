import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import ButtonLarge from '../components/ButtonLarge';
import {globalStyles} from '../theme/globalStyles';
import FloatingButton from '../components/FloatingButton';

const height = Dimensions.get('window').height;

interface Props extends DrawerScreenProps<any, any> {}

const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Image source={require('../assets/icon.png')} style={styles.icon} />
        <TouchableOpacity
          style={{...styles.menu, top: top + 10}}
          onPress={() => navigation.toggleDrawer()}
          activeOpacity={0.6}>
          <Icon name="menu-outline" size={30} color={'#FFF'} />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.globalMargin}>
        <View style={styles.button}>
          <ButtonLarge
            title={'Shopping Lists'}
            icon={'cart-outline'}
            fontSize={18}
            color={'#FFF'}
            cant={5}
          />
        </View>
        <ButtonLarge
          title={'To Do Lists'}
          icon={'list-circle-outline'}
          fontSize={18}
          color={'#FFF'}
          cant={3}
        />
      </View>
      <FloatingButton />
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
  icon: {
    position: 'absolute',
    height: 158,
    width: 150,
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    marginVertical: 20,
  },
});
