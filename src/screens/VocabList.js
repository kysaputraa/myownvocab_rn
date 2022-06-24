import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useEffect} from 'react';
import {FAB, Portal} from 'react-native-paper';

const VocabList = ({route, navigation}) => {
  const [datavocab, setDatavocab] = useState();
  const [state, setState] = useState(false);

  useEffect(() => {
    console.log(route);
    getVocab();
    navigation.setOptions({title: route.params.nama});
  }, []);

  //   useEffect(() => {}, datavocab);

  const getVocab = async () => {
    const formData = new FormData();
    formData.append('id_kategori', route.params.id_kategori);

    await axios({
      method: 'post',
      url: 'services/vocab/list',
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(response => {
        const hasil = response.data;
        if (hasil.respon == 1) {
          setDatavocab(hasil.data);
          console.log(hasil);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={datavocab}
        renderItem={({item}) => (
          <View style={styles.Containerlist}>
            <View style={styles.Listitem}>
              <Text>{item.lang_1}</Text>
            </View>
            <View style={styles.Listitem}>
              <Text>{item.lang_2}</Text>
            </View>
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </View>
  );
};

export default VocabList;

const styles = StyleSheet.create({
  Containerlist: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
  },
  Listitem: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
