import {View, Text, StyleSheet, ToastAndroid, LogBox} from 'react-native';
import React from 'react';
import {Button, TextInput} from 'react-native-paper';
import {useState} from 'react';
import axios, {Axios} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useEffect} from 'react';

const KategoriAdd = ({navigation, route}) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const [data, setData] = useState();

  useEffect(() => {}, []);

  const tambahdata = async () => {
    const formData = new FormData();
    const username = await AsyncStorage.getItem('username');
    formData.append('nama', data);
    formData.append('username', username);

    await axios({
      url: 'services/kategori/add',
      method: 'post',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(async response => {
        console.log(response);
        if (response.data.respon == 1) {
          navigation.goBack();
          route.params.refreshKategory();
          ToastAndroid.show('Berhasil Ditambahkan !', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('GAGAL !', ToastAndroid.SHORT);
        }
      })
      .catch(e => {
        console.log(e.message);
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{marginTop: 20}}
        outlineColor="#3498db"
        mode="outlined"
        label="Masukan Nama Kategori . . . "
        onChangeText={text => {
          setData(text);
        }}
      />
      <Button style={{marginTop: 20}} mode="contained" onPress={tambahdata}>
        Tambah
      </Button>
    </View>
  );
};

export default KategoriAdd;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },
});
