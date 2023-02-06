/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {
  Box,
  FormControl,
  // Icon,
  Input,
  Pressable,
  ScrollView,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {vh} from 'react-native-expo-viewport-units';
// import MaterialIcons from 'react-native-vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

import {loginAction} from '../redux/actions/auth';

const styles = StyleSheet.create({
  bgAuth: {
    padding: 35,
    backgroundColor: 'white',
    height: vh(100),
    width: '100%',
  },
  headerAuth: {
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
  },
  textLogoAuth: {
    color: '#fca311',
    fontSize: 35,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  orange: {
    color: '#fca311',
  },
  gray: {
    color: 'gray',
  },
  input: {
    // w-full bg-[#fcfdfe] border rounded-2xl divide-solid border-slate-300 py-[10px] pl-[24px] mt-[6px] mb-[8px]
    width: '100%',
    backgroundColor: '#fcfdfe',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#eaeaea',
    paddingLeft: 14,
    paddingVertical: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  mb20: {
    marginBottom: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb5: {
    marginBottom: 5,
  },
  mt20: {
    marginTop: 20,
  },
  mt10: {
    marginTop: 10,
  },
  mt5: {
    marginTop: 5,
  },
  textCenter: {
    width: '100%',
    textAlign: 'center',
  },
});

const validationSchema = Yup.object({
  password: Yup.string().required('Required').min(6),
  email: Yup.string().email('Invalid email address').required('Required'),
});

const SignIn = () => {
  // const [show, setShow] = React.useState(false);
  const toast = useToast();
  const toastIdRef = React.useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loginValidation = event => {
    const email = event.email;
    const password = event.password;
    const cb = err => {
      if (err) {
        toastIdRef.current = toast.show({
          title: 'Email or Password Wrong',
          placement: 'top',
        });
      } else {
        navigation.navigate('LandingPage');
      }
    };
    dispatch(loginAction({email, password, cb}));
  };

  return (
    <ScrollView>
      <View style={[styles.bgAuth, styles.textWhite]}>
        <Text style={[styles.textLogoAuth, styles.textCenter]}>
          Cinephile App
        </Text>
        <View>
          <Text style={styles.headerAuth}>Sign In</Text>
          <Text style={[styles.gray, styles.mb20]}>
            Sign in with your data that you entered during your registration
          </Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          onSubmit={e => loginValidation(e)}
          initialValues={{
            email: '',
            password: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <FormControl
                marginBottom={2}
                isInvalid={errors.email ? true : false}>
                <Box>Email :</Box>
                <Input
                  fontSize="13px"
                  type="email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Type your email"
                  value={values.email}
                />
                {errors.email && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.email}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl
                marginBottom={6}
                isInvalid={errors.password ? true : false}>
                <Box>Password :</Box>
                <Input
                  type="password"
                  fontSize="13px"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Type your password"
                  value={values.password}
                  // InputRightElement={
                  //   <Pressable>
                  //     <Icon as={<MaterialIcons name="visibility" />} />
                  //   </Pressable>
                  // }
                />
                {errors.password && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.password}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <Button onPress={handleSubmit} color="#fca311" title="Sign In" />
            </>
          )}
        </Formik>
        <View
          style={[
            styles.textCenter,
            styles.mb5,
            styles.mt20,
            {display: 'flex'},
            {flexDirection: 'row'},
            {alignItems: 'center'},
            {justifyContent: 'center'},
          ]}>
          <Text style={[styles.gray]}>Forgot your password?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>
            <Text style={styles.orange}> Reset now</Text>
          </Pressable>
        </View>
        <View
          style={[
            styles.textCenter,
            styles.mb5,
            {display: 'flex'},
            {flexDirection: 'row'},
            {alignItems: 'center'},
            {justifyContent: 'center'},
          ]}>
          <Text style={[styles.gray]}>Don’t have an account?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.orange}> Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignIn;
