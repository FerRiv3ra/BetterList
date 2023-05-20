import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import {globalStyles} from '../theme/globalStyles';
import SegmentedControl from '../components/SegmentedControls';
import {CustomSwitch} from '../components/CustomSwitch';
import {FooterBannerAd} from '../components/FooterBannerAd';

interface Props extends DrawerScreenProps<any, any> {}

const SettingsScreen = ({navigation}: Props) => {
  const [currentCurrency, setCurrentCurrency] = useState('');

  const {t, i18n} = useTranslation();

  const {top} = useSafeAreaInsets();
  const {
    theme: {colors},
    setTheme,
    autoTheme,
    setAutoTheme,
    actualTheme,
  } = useContext(ThemeContext);

  const {setLanguage, currency, setNewCurrency, showAds} =
    useContext(AppContext);

  useEffect(() => {
    setCurrentCurrency(currency);
  }, []);

  const handleCurrency = () => {
    if (!currentCurrency.length) return;
    setNewCurrency(currentCurrency);
  };

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
          {t('settings.language')}
        </Text>
        <SegmentedControl
          values={[
            {key: `🇪🇸 ${t('settings.spanish')}`, value: 'es'},
            {key: `🇬🇧 ${t('settings.english')}`, value: 'en'},
          ]}
          selectedIndex={i18n.language === 'es' ? 0 : 1}
          onChange={setLanguage}
          backgroundColor={colors.primary}
          selectedTextColor={colors.primary}
          textColor={colors.text}
          tintColor={colors.card}
        />
      </View>
      <View style={{marginTop: 30}}>
        <Text style={{...globalStyles.title, color: colors.primary}}>
          {t('settings.theme')}
        </Text>
        <View style={styles.switch}>
          <Text style={{color: colors.primary, fontWeight: '500'}}>
            {t('settings.systemTheme')}
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
              {key: `😎 ${t('settings.light')}`, value: 'light'},
              {key: `🧛‍♂️ ${t('settings.dark')}`, value: 'dark'},
            ]}
            onChange={setTheme}
            selectedIndex={actualTheme === 'light' ? 0 : 1}
            backgroundColor={colors.primary}
            selectedTextColor={colors.primary}
            textColor={colors.text}
            tintColor={colors.card}
          />
        )}
      </View>
      <View style={{marginTop: 30}}>
        <Text
          style={{
            ...globalStyles.title,
            color: colors.primary,
            marginBottom: 10,
          }}>
          {t('settings.placeholder')}
        </Text>
        <TextInput
          placeholder={t('settings.placeholder') || ''}
          maxLength={1}
          value={currentCurrency}
          onChangeText={setCurrentCurrency}
          onEndEditing={handleCurrency}
          onSubmitEditing={handleCurrency}
          style={{
            ...styles.input,
            borderColor: colors.primary,
            color: colors.primary,
          }}
        />
      </View>

      {showAds && <FooterBannerAd />}
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
  input: {
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    fontWeight: '500',
  },
});
