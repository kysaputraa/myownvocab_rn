import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreens from './screens/LoginScreens';
import TesScreen from './screens/TesScreen';
import Dashboard from './screens/Dashboard';
import {useDispatch, useSelector} from 'react-redux';
import {keluar, masuk} from './redux/sessionSlice';
import AsyncStorage from '@react-native-community/async-storage';
import {useEffect} from 'react';
import KategoriAdd from './screens/KategoriAdd';
import VocabList from './screens/VocabList';

const Stackscreens = () => {
  const Stack = createNativeStackNavigator();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    cekdata();
  }, []);

  const cekdata = async () => {
    const getusername = await AsyncStorage.getItem('username');
    if (getusername != null) {
      dispatch(masuk({username: getusername}));
    } else {
      dispatch(keluar());
    }
  };

  useEffect(() => {}, [username]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session.isLogin == 'iya' ? (
          <>
            <Stack.Screen
              name="dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="KategoriAdd"
              options={{title: 'Tambah Kategori'}}
              component={KategoriAdd}
            />
            <Stack.Screen
              name="VocabList"
              options={{title: 'Vocab List'}}
              component={VocabList}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login_page"
              component={LoginScreens}
              // options={{title: 'Halaman Login'}}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stackscreens;
