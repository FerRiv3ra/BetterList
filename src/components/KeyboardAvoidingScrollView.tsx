import {Platform, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';

interface Props {
  children: React.ReactNode[] | React.ReactNode;
  keyboardDismissMode?: 'none' | 'on-drag' | 'interactive' | undefined;
}

export const KeyboardAvoidingScrollView = ({
  children,
  keyboardDismissMode,
}: Props) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardDismissMode={keyboardDismissMode}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
