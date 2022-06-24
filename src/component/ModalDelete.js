import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Modal, Portal} from 'react-native-paper';
import {useEffect} from 'react';
import {useState} from 'react';

export default ModalDelete = props => {
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  return (
    <Portal>
      <Modal
        visible={status}
        onDismiss={() => {
          setStatus(false);
          console.log(status);
        }}
        contentContainerStyle={styles.containermodal}>
        <Text>Apakah Yakin ingin Menghapus data ?</Text>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containermodal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});
