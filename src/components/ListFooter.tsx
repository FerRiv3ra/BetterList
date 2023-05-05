import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {ThemeContext} from '../context/ThemeContext';
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
          <Text style={{...styles.text, color: colors.text}}>Add Task</Text>
        </View>
      </TouchableOpacity>
      {type === 'shopping' && (
        <View>
          <Text style={{...styles.text, color: colors.text}}>
            Total: <Text style={{...styles.total}}>$ {total!.toFixed(2)}</Text>
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
