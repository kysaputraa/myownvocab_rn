import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput, Button, ActivityIndicator} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {masuk} from '../redux/sessionSlice';
import AsyncStorage from '@react-native-community/async-storage';

// import {camera} from 'react-native-paper/MaterialCommunityIcons';
export default function LoginScreens() {
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    username: '',
    password: '',
    isLoading: false,
  });

  useEffect(() => {
    // console.log(session);
  }, [login]);

  const ceklogin = async (us, pw) => {
    setLogin({...login, isLoading: true});
    console.log(login);
    const formData = new FormData();
    formData.append('username', us);
    formData.append('password', pw);

    await axios({
      method: 'post',
      url: 'services/user/login',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(async function (response) {
        console.log(response.data);
        setLogin({...login, isLoading: false});
        if (response.data.respon == 1) {
          const data = response.data;
          await AsyncStorage.setItem('username', data.username);
          dispatch(masuk({username: data.username}));
          // console.log(session);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{session.username}</Text>
      <TextInput
        outlineColor="#3498db"
        mode="outlined"
        label="username"
        // value={session.username}
        onChangeText={text => setLogin({...login, username: text})}
      />
      <TextInput
        secureTextEntry={true}
        style={{marginTop: 10}}
        outlineColor="#3498db"
        mode="outlined"
        label="password"
        // value={login.password}
        onChangeText={text => setLogin({...login, password: text})}
      />
      <Button
        icon={() => <FontAwesome name="camera" />}
        style={{marginTop: 10}}
        mode="contained"
        onPress={() => ceklogin(login.username, login.password)}>
        Sign In
      </Button>
      <ActivityIndicator style={{marginTop: 20}} animating={login.isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },
});
