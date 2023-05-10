import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';
import {ListType} from '../types/contextTypes';

interface Props {
  onPress: () => void;
  total?: number;
  type: ListType;
}

const ListFooter = ({onPress, total, type}: Props) => {
  const {bottom} = useSafeAreaInsets();

  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {currency} = useContext(AppContext);

  const {t} = useTranslation();

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: bottom,
        backgroundColor: colors.primary,
      }}>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={{flex: 1}}>
        <View style={{...styles.addTask}}>
          <Icon name="add-outline" color={colors.text} size={22} />
          <Text style={{...styles.text, color: colors.text}}>
            {type === 'shopping' ? t('ui.addItem') : t('ui.addTask')}
          </Text>
        </View>
      </TouchableOpacity>
      {type === 'shopping' && (
        <View>
          <Text style={{...styles.text, color: colors.text}}>
            Total:{' '}
            <Text style={{...styles.total}}>
              {currency} {total!.toFixed(2)}
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
  addTask: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  total: {
    fontWeight: '700',
    fontSize: 18,
  },
});
