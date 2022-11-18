import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ThemeContext} from '../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParams, 'ShoppingLists'> {}

const ShoppingLists = ({navigation}: Props) => {
  const {
    theme: {colors},
  } = useContext(ThemeContext);

  const {top} = useSafeAreaInsets();

  return (
    <View style={{backgroundColor: colors.card, flex: 1, paddingTop: top}}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: colors.primary,
          top: top + 5,
        }}
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" color={colors.text} size={18} />
      </TouchableOpacity>
    </View>
  );
};

export default ShoppingLists;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 15,
    borderRadius: 50,
    left: 15,
  },
});
