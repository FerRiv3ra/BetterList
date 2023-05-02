import {StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {ThemeContext} from '../context/ThemeContext';
import {useModalList} from '../hooks/useModalList';
import {useTranslation} from 'react-i18next';

interface Props {
  id: string;
  closeSwipeable: () => void;
  progress?: Animated.AnimatedInterpolation<string | number>;
  dragX: Animated.AnimatedInterpolation<string | number>;
}

const RightAction = ({id, closeSwipeable, dragX}: Props) => {
  const {
    theme: {colors, dividerColor},
  } = useContext(ThemeContext);

  const {t} = useTranslation();

  const {handleDelete} = useModalList();

  const scale = dragX.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const deleteList = () => {
    closeSwipeable();

    handleDelete(id);
  };

  return (
    <Animated.View style={{flexDirection: 'row'}}>
      <Pressable
        style={{...styles.btn, borderBottomColor: dividerColor}}
        onPress={deleteList}>
        <Animated.View style={{...styles.btnContent, transform: [{scale}]}}>
          <Icon name="trash-outline" size={13} color={colors.text} />
          <Text style={{...styles.txtBtn, color: colors.text}}>
            {' '}
            {t('modal.delete')}
          </Text>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

export default RightAction;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#EF4444',
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
