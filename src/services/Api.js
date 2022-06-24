import Axios from 'axios';

export const Api = () => {
  Axios.defaults.baseURL = 'http://103.146.244.122/myownvocab/';
};
