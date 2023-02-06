import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {
  Box,
  FormControl,
  Input,
  ScrollView,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {vh} from 'react-native-expo-viewport-units';
import http from '../helper/http';

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

const ResetPassword = () => {
  const navigation = useNavigation();
  const [alert, setAlert] = React.useState('');
  const [alertSuccess, setAlertSuccess] = React.useState('');
  const getAccount = async value => {
    const {password, confirmPassword, code} = value;
    console.log(value);
    if (value.password === value.confirmPassword) {
      try {
        await http().post('auth/resetPassword', {
          password,
          confirmPassword,
          code,
        });
        setAlertSuccess('Success Get Account');
        return setTimeout(() => {
          setAlertSuccess('');
          // navigation.navigate('SignIn');
        }, 5000);
      } catch (err) {
        setAlert('Code is false');
        return setTimeout(() => {
          setAlert('');
        }, 5000);
      }
    } else {
      setAlert('Confirm Password Not Match!');
      return setTimeout(() => {
        setAlert('');
      }, 5000);
    }
  };
  return (
    <ScrollView>
      <View style={[styles.bgAuth, styles.textWhite]}>
        <Text style={[styles.textLogoAuth, styles.textCenter]}>
          Cinephile App
        </Text>
        <View>
          <Text style={styles.headerAuth}>Get back your account</Text>
          <Text style={[styles.gray, styles.mb20]}>
            Fill your complete password
          </Text>
        </View>
        {alert !== '' && (
          <Text style={(styles.textCenter, styles.orange)}>{alert}</Text>
        )}
        {alertSuccess !== '' && (
          <Text style={(styles.textCenter, styles.orange)}>{alertSuccess}</Text>
        )}
        <Formik
          onSubmit={e => getAccount(e)}
          initialValues={{
            confirmPassword: '',
            password: '',
            code: '',
          }}>
          {({handleChange, handleBlur, handleSubmit, errors, values}) => (
            <>
              <FormControl
                marginBottom={6}
                isInvalid={errors.password ? true : false}>
                <Box>Code :</Box>
                <Input
                  type="text"
                  fontSize="13px"
                  onChangeText={handleChange('code')}
                  onBlur={handleBlur('code')}
                  placeholder="Type your code"
                  value={values.code}
                />
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
              </FormControl>
              <FormControl
                marginBottom={6}
                isInvalid={errors.confirmPassword ? true : false}>
                <Box>Confirm Password :</Box>
                <Input
                  type="password"
                  fontSize="13px"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder="Type your confirm password"
                  value={values.confirmPassword}
                  // InputRightElement={
                  //   <Pressable>
                  //     <Icon as={<MaterialIcons name="visibility" />} />
                  //   </Pressable>
                  // }
                />
              </FormControl>
              <Button onPress={handleSubmit} color="#fca311" title="Sign In" />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default ResetPassword;
