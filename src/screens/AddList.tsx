import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';

import {StackScreenProps} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {v4 as uuidv4} from 'uuid';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import {RootStackParams} from '../navigator/StackNavigator';
import {globalStyles} from '../theme/globalStyles';
import SegmentedControl from '../components/SegmentedControls';
import ListIcons from '../components/ListIcons';
import {List, ListType} from '../types/contextTypes';
import {FooterBannerAd} from '../components/FooterBannerAd';
import {useAdUnit} from '../hooks/useAdUnit';

interface Props extends StackScreenProps<RootStackParams, 'AddList'> {}

const AddList = ({navigation}: Props) => {
  const [type, setType] = useState<ListType | string>('shopping');
  const [title, setTitle] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('list');

  const {addList, showAds} = useContext(AppContext);
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();

  const {interstitial, loaded} = useAdUnit();

  const {
    theme: {colors, listText},
  } = useContext(ThemeContext);

  const handleAdd = () => {
    const newList: List = {
      id: uuidv4(),
      categories: [],
      expandAll: false,
      icon: type === 'shopping' ? 'cart-outline' : selectedIcon,
      items: [],
      orderByNameAsc: true,
      orderByPriceAsc: true,
      showCompleted: true,
      title: title.trim(),
      total: 0,
      type: type as ListType,
    };

    addList(newList);

    if (loaded) {
      interstitial.show();
    }

    navigation.goBack();
  };

  return (
    <View style={{backgroundColor: colors.card, flex: 1, paddingTop: top}}>
      <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: colors.primary,
          }}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" color={colors.text} size={18} />
        </TouchableOpacity>
        <View style={{marginTop: 80, marginHorizontal: 20}}>
          <Text
            style={{
              ...globalStyles.title,
              color: colors.primary,
              marginTop: 20,
            }}>
            {t('ui.type')}
          </Text>
          <SegmentedControl
            values={[
              {key: `🛒 ${t('ui.shopping')}`, value: 'shopping'},
              {key: `☑️ ${t('ui.todo')}`, value: 'todo'},
            ]}
            onChange={setType}
            backgroundColor={colors.primary}
            tintColor={colors.card}
            textColor={colors.text}
            selectedTextColor={colors.primary}
          />
          <Text
            style={{
              ...globalStyles.title,
              color: colors.primary,
              marginTop: 20,
            }}>
            {t('ui.title')}
          </Text>
          <TextInput
            placeholder={`${t('ui.title')}`}
            placeholderTextColor="#a5b4fc"
            style={{
              ...styles.input,
              backgroundColor: colors.card,
              color: listText,
            }}
            onChangeText={setTitle}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {type === 'todo' && (
            <ListIcons
              selectedIcon={selectedIcon}
              setSelectedIcon={setSelectedIcon}
            />
          )}
        </View>

        <View style={{flex: 1}} />

        <TouchableOpacity
          style={{
            ...styles.saveBtn,
            backgroundColor: colors.primary,
            marginBottom: showAds ? 70 : 50,
          }}
          onPress={handleAdd}
          activeOpacity={0.7}>
          <Icon name="create-outline" color={colors.text} size={18} />
          <Text style={{...styles.textSave, color: colors.text}}>
            {' '}
            {t('ui.createList')}
          </Text>
        </TouchableOpacity>
      </Pressable>

      {showAds && <FooterBannerAd />}
    </View>
  );
};

export default AddList;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 15,
    borderRadius: 50,
    left: 15,
    top: 15,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#6663F1',
  },
  saveBtn: {
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontSize: 18,
    fontWeight: '500',
  },
});
