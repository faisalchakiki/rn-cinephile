import {createAsyncThunk} from '@reduxjs/toolkit';
import PushNotification from 'react-native-push-notification';
import http from '../../helper/http';

export const transactionAction = createAsyncThunk(
  'transaction/bookingAction',
  async ({
    fullName,
    phoneNumber,
    email,
    timeBooking,
    dateBooking,
    idUsers,
    idMovie,
    idCinema,
    idPayMethod,
    idStatus = 1,
    total,
    seatNum,
    callback,
  }) => {
    try {
      const {data} = await http().post('/bookings', {
        dateBooking,
        timeBooking,
        fullName,
        idUsers,
        phoneNumber,
        idCinema,
        idMovie,
        idStatus,
        total,
        seatNum,
        idPayMethod,
        email,
      });
      callback();
      PushNotification.localNotification({
        channelId: 'global_notif',
        title: 'Success Booking',
        message: 'Can you show in History Page, thanks you...',
      });
      return data[0];
    } catch (err) {
      console.log('object');
      callback(err);
      throw err;
    }
  },
);
