import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  username: 'default',
  isLogin: 'tidak',
};

export const sessionSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    masuk: (state, action) => {
      const newItem = action.payload;
      state.username = newItem.username;
      state.isLogin = 'iya';
    },
    keluar: state => {
      state.username = '';
      state.isLogin = 'tidak';
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const {masuk, keluar} = sessionSlice.actions;

export default sessionSlice.reducer;
