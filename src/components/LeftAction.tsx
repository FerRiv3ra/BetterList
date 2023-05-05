import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import React, {useContext} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

import {ThemeContext} from '../context/ThemeContext';

interface Props {
  setModalVisible: (visible: boolean) => void;
  closeSwipeable: () => void;
  progress?: Animated.AnimatedInterpolation<string | number>;
  dragX: Animated.AnimatedInterpolation<string | number>;
}

const LeftAction = ({setModalVisible, closeSwipeable, dragX}: Props) => {
  const {
    theme: {colors, dividerColor},
  } = useContext(ThemeContext);

  const {t} = useTranslation();

  const scale = dragX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const openEditModal = () => {
    closeSwipeable();

    setModalVisible(true);
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Pressable
        style={{
          ...styles.btn,
          borderBottomColor: dividerColor,
          backgroundColor: colors.primary,
        }}
        onPress={openEditModal}>
        <Animated.View style={{...styles.btnContent, transform: [{scale}]}}>
          <Icon name="create-outline" size={13} color={colors.text} />
          <Text style={{...styles.txtBtn, color: colors.text}}>
            {' '}
            {t('modal.edit')}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export default LeftAction;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  btnContent: {
    flexDirection: 'row',
  },
  txtBtn: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
  },
});
