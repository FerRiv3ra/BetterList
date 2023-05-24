import {Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import React, {useContext} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppContext from '../context/AppContext';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive' | undefined;
}

export const KeyboardAvoidingScrollView = ({
  children,
  keyboardDismissMode,
}: Props) => {
  const {bottom} = useSafeAreaInsets();
  const {showAds} = useContext(AppContext);

  return (
    <KeyboardAvoidingView
      style={{flex: 1, marginBottom: showAds ? bottom + 28 : 0}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardDismissMode={keyboardDismissMode}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
