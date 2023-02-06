import {useNavigation} from '@react-navigation/native';
import {
  Box,
  FormControl,
  Input,
  Pressable,
  ScrollView,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {vh} from 'react-native-expo-viewport-units';
import {Formik} from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import YupPassword from 'yup-password';
import {useDispatch} from 'react-redux';
import {loginAction, registerAction} from '../redux/actions/auth';
YupPassword(Yup);

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
  firstName: Yup.string().required('Required'),
  lastName: Yup.string(),
  phoneNumber: Yup.string().phone('ID').required('Required'),
});

const Register = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RegisterProcess = event => {
    const firstName = event.firstName;
    const lastName = event.lastName;
    const phoneNumber = event.phoneNumber;
    const email = event.email;
    const password = event.password;
    const cb = () => {
      navigation.navigate('LandingPage');
    };
    const callback = err => {
      if (err) {
        console.log(err);
        toastIdRef.current = toast.show({
          title: 'Email already used',
          placement: 'top',
        });
      } else {
        dispatch(loginAction({email, password, cb}));
      }
    };
    dispatch(
      registerAction({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        callback,
      }),
    );
  };
  return (
    <ScrollView>
      <View style={[styles.bgAuth, styles.textWhite]}>
        <Text style={[styles.textLogoAuth, styles.textCenter, styles.mb20]}>
          Cinephile App
        </Text>
        <View>
          <Text style={styles.headerAuth}>Sign Up</Text>
          <Text style={[styles.gray, styles.mb20]}>
            Fill your additional details
          </Text>
        </View>
        <Formik
          validationSchema={validationSchema}
          onSubmit={RegisterProcess}
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <FormControl
                marginBottom={2}
                isInvalid={errors.firstName ? true : false}>
                <Box>First Name :</Box>
                <Input
                  fontSize="13px"
                  type="text"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  placeholder="Type your first name"
                  value={values.firstName}
                />
                {errors.firstName && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.firstName}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl
                marginBottom={2}
                isInvalid={errors.lastName ? true : false}>
                <Box>Last Name :</Box>
                <Input
                  fontSize="13px"
                  type="text"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  placeholder="Type your last name"
                  value={values.lastName}
                />
                {errors.lastName && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.lastName}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
              <FormControl
                marginBottom={2}
                isInvalid={errors.phoneNumber ? true : false}>
                <Box>Phone Number :</Box>
                <Input
                  fontSize="13px"
                  type="number"
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  placeholder="Type your phone number"
                  value={values.phoneNumber}
                />
                {errors.phoneNumber && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.phoneNumber}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
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
          <Text style={[styles.gray]}>Already have account?</Text>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.orange]}> Sign In</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default Register;
