import {createAsyncThunk} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import http from '../../helper/http';

export const profileAction = createAsyncThunk(
  'profile/profileAsnyc',
  async () => {
    try {
      const token = useSelector(state => state.auth.token);
      const {data} = await http(token).get('/profile');
      return data.results;
    } catch (err) {
      console.log('error parah');
      throw err.response.data.message;
    }
  },
);
