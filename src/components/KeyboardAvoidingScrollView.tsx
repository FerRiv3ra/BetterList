import {Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive' | undefined;
}

export const KeyboardAvoidingScrollView = ({
  children,
  keyboardDismissMode,
}: Props) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{flex: 1, marginBottom: bottom + 28}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardDismissMode={keyboardDismissMode}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
