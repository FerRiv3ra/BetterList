import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import SegmentedControl from '../components/SegmentedControls';
import {CustomSwitch} from '../components/CustomSwitch';
import {globalStyles} from '../theme/globalStyles';
import AppContext from '../context/AppContext';

interface Props extends DrawerScreenProps<any, any> {}

const SettingsScreen = ({navigation}: Props) => {
  // TODO: Pasar a estado global
  const [lang, setLang] = useState('');

  const {top} = useSafeAreaInsets();
  const {
    theme: {colors},
    setDevTheme,
    autoTheme,
    setAutoTheme,
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: colors.card,
        paddingTop: top,
      }}>
      <TouchableOpacity
        style={{...styles.menu, top: top + 10}}
        onPress={() => navigation.toggleDrawer()}
        activeOpacity={0.6}>
        <Icon name="menu-outline" size={30} color={colors.primary} />
      </TouchableOpacity>
      <View style={{marginTop: 80}}>
        <Text style={{...globalStyles.title, color: colors.primary}}>
          Language
        </Text>
        <SegmentedControl
          values={[
            {key: '🇪🇸 Spanish', value: 'ES'},
            {key: '🇬🇧 English', value: 'EN'},
          ]}
          onChange={setDevTheme}
          backgroundColor={colors.primary}
          selectedTextColor={colors.primary}
          textColor={colors.text}
          tintColor={colors.card}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{...globalStyles.title, color: colors.primary}}>
          Theme
        </Text>
        <View style={styles.switch}>
          <Text style={{color: colors.primary, fontWeight: '500'}}>
            System Theme
          </Text>
          <CustomSwitch
            isOn={autoTheme}
            onChange={setAutoTheme}
            backgrounColor={colors.primary}
          />
        </View>
        {!autoTheme && (
          <SegmentedControl
            values={[
              {key: '😎 Light', value: 'light'},
              {key: '🧛‍♂️ Dark', value: 'dark'},
            ]}
            onChange={setDevTheme}
            backgroundColor={colors.primary}
            selectedTextColor={colors.primary}
            textColor={colors.text}
            tintColor={colors.card}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  menu: {
    position: 'absolute',
    left: 15,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
