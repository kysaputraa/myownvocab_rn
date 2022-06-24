import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  Modal,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {Button, Card, FAB, Paragraph, Portal} from 'react-native-paper';
import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const Dashboard = props => {
  const session = useSelector(state => state.session);
  const [state, setState] = useState(false);
  const [data, setData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [statusmodal, setStatusmodal] = useState(false);
  const [datamodal, setDatamodal] = useState({
    nama: '',
    id: '',
  });

  useEffect(() => {
    getDataCategory();
  }, []);

  const getDataCategory = async () => {
    const username = await AsyncStorage.getItem('username');
    const formData = new FormData();
    formData.append('username', username);

    await axios({
      method: 'post',
      url: 'services/kategori/list',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(async function (response) {
        if (response.data.respon == 1) {
          console.log(response.data.data);
          const dataresponse = response.data.data;
          setData(dataresponse);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const hapusCategory = async () => {
    const formData = new FormData();
    formData.append('id_kategori', datamodal.id_kategori);

    await axios({
      method: 'post',
      url: 'services/kategori/delete',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(async response => {
        const data = response.data;
        console.log(data);
        if (data.respon == 1) {
          setStatusmodal(!statusmodal);
          getDataCategory();
          ToastAndroid.show('Berhasil', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Gagal', ToastAndroid.SHORT);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  // props.navigation.addListener('focus', () => {
  //   getDataCategory();
  // });

  const onRefresh = () => {
    getDataCategory();
  };

  // INI DATA FLATLIST
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('VocabList', {
          id_kategori: item.id_kategori,
          nama: item.nama,
        });
      }}
      onLongPress={() => {
        setStatusmodal(!statusmodal);
        setDatamodal({nama: item.nama, id_kategori: item.id_kategori});
      }}>
      <Card style={{marginVertical: 5}}>
        <Card.Content>
          <Paragraph>{item.nama}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{marginTop: 20}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id_kategori}
      />
      <FAB.Group
        open={state}
        icon={state ? 'calendar-today' : 'plus'}
        actions={[
          {
            icon: 'plus',
            label: 'Tambah Kategori',
            onPress: () =>
              props.navigation.navigate('KategoriAdd', {
                refreshKategory: getDataCategory,
              }),
          },
          {
            icon: 'account',
            label: 'Profile',
            onPress: () => console.log('Pressed star'),
          },
        ]}
        onStateChange={() => setState(!state)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={statusmodal}
        onRequestClose={() => {
          // ini akan bekerja ketika di klik tombol kembali
          // Alert.alert('Modal has been closed.');
          setStatusmodal(!statusmodal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Apakah anda ingin Mmengahpus data {datamodal.nama} ?</Text>
            <View style={{flexDirection: 'row', paddingTop: 20}}>
              <Button
                style={{marginHorizontal: 5, borderRadius: 15}}
                mode="contained"
                onPress={() => hapusCategory()}>
                Hapus
              </Button>
              <Button
                style={{marginHorizontal: 5, borderRadius: 15}}
                mode="contained"
                onPress={() => setStatusmodal(!statusmodal)}>
                Tutup
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
