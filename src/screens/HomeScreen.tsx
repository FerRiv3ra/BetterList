import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DrawerScreenProps} from '@react-navigation/drawer';
import ButtonLarge from '../components/ButtonLarge';
import {globalStyles} from '../theme/globalStyles';
import FloatingButton from '../components/FloatingButton';
import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import {useTranslation} from 'react-i18next';

const height = Dimensions.get('window').height;

interface Props extends DrawerScreenProps<any, any> {}

const HomeScreen = ({navigation}: Props) => {
  const {top} = useSafeAreaInsets();
  const {
    theme: {colors},
    actualTheme,
  } = useContext(ThemeContext);

  const {t} = useTranslation();

  const {lists} = useContext(AppContext);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.header, backgroundColor: colors.primary}}>
        <Image
          source={
            actualTheme === 'dark'
              ? require('../assets/dark_icon.png')
              : require('../assets/icon.png')
          }
          style={styles.icon}
        />
        <TouchableOpacity
          style={{...styles.menu, top: top + 10}}
          onPress={() => navigation.toggleDrawer()}
          activeOpacity={0.6}>
          <Icon name="menu-outline" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={globalStyles.globalMargin}>
        <View style={styles.button}>
          <ButtonLarge
            title={`${t('ui.shoppingList')}`}
            icon={'cart-outline'}
            fontSize={20}
            color={colors.text}
            cant={lists.filter(list => list.type === 'shopping').length}
            route={'shopping'}
          />
        </View>
        <ButtonLarge
          title={`${t('ui.todoList')}`}
          icon={'list-circle-outline'}
          fontSize={20}
          color={colors.text}
          cant={lists.filter(list => list.type === 'todo').length}
          route={'todo'}
        />
      </View>
      <FloatingButton route={'AddList'} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    height: height / 3,
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
