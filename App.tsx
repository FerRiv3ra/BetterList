import 'react-native-gesture-handler';

import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerNavigator} from './src/navigator/DrawerNavigator';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import {AppProvider} from './src/context/AppContext';

const App = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <NavigationContainer theme={theme}>
      <ThemeProvider>
        <AppProvider>
          <DrawerNavigator />
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
