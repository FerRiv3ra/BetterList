import 'react-native-gesture-handler';
import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {DrawerNavigator} from './src/navigator/DrawerNavigator';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import {AppProvider} from './src/context/AppContext';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/translations/config/i18NextConfig';

const App = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={theme}>
        <ThemeProvider>
          <AppProvider>
            <DrawerNavigator />
          </AppProvider>
        </ThemeProvider>
      </NavigationContainer>
    </I18nextProvider>
  );
};

export default App;
