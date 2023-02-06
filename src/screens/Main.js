import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {React} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Booking from './Booking';
import Details from './Details';
import History from './History';
import ListMovie from './ListMovie';
import Payment from './Payment';
import Profile from './Profile';
import Ticket from './Ticket';
import SignIn from './SignIn';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import LandingPage from './LandingPage';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Main = () => {
  const token = useSelector(state => state.auth.token);
  return (
    <>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ListMovie"
              component={ListMovie}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{headerShown: false}}
            />
            {!token && (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="ResetPassword"
                  component={ResetPassword}
                  options={{headerShown: false}}
                />
              </>
            )}
            {token && (
              <>
                <Stack.Screen
                  name="Booking"
                  component={Booking}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Payment"
                  component={Payment}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="History"
                  component={History}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Ticket"
                  component={Ticket}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
};

export default Main;
