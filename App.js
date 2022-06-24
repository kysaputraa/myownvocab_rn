import React, {useEffect} from 'react';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Api} from './src/services/Api';
import Stackscreens from './src/Stackscreens';
import AsyncStorage from '@react-native-community/async-storage';
export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  useEffect(() => {
    Api(); // inisialisasi base_url
  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <Stackscreens />
      </PaperProvider>
    </Provider>
  );
}
