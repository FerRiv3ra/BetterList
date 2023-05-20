import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {ThemeContext} from '../context/ThemeContext';
import AppContext from '../context/AppContext';

interface Props {
  route: string;
}

const FloatingButton = ({route}: Props) => {
  const navigator = useNavigation();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {showAds} = useContext(AppContext);

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: colors.primary,
        bottom: showAds ? 70 : 25,
      }}
      onPress={() => navigator.navigate(route as never)}
      activeOpacity={0.7}>
      <View>
        <Icon name="add-outline" size={25} color={colors.text} />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 25,
    padding: 15,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
