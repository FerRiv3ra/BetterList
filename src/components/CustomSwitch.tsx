import React, {useState} from 'react';
import {Platform, Switch} from 'react-native';

interface Props {
  isOn: boolean;
  onChange: (value: boolean) => void;
  backgrounColor?: string;
}

export const CustomSwitch = ({
  isOn,
  onChange,
  backgrounColor = '#1DFF56',
}: Props) => {
  const [isEnabled, setIsEnabled] = useState(isOn);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onChange(!isEnabled);
  };

  return (
    <Switch
      trackColor={{false: '#D9D9DB', true: backgrounColor}}
      thumbColor={Platform.OS === 'android' ? backgrounColor : ''}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
