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
import {View, Text, StyleSheet, Button} from 'react-native';

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

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [alert, setAlert] = React.useState(false);
  const getAccount = async email => {
    try {
      await http().post('auth/forgotAccount', email);
      navigation.navigate('ResetPassword');
    } catch (err) {
      setAlert(true);
      setInterval(() => {
        setAlert(false);
      }, 2000);
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
            Fill your complete email
          </Text>
        </View>
        {alert && (
          <Text style={(styles.textCenter, styles.orange)}>
            Email not registered !
          </Text>
        )}
        <Formik
          onSubmit={e => getAccount(e)}
          initialValues={{
            email: '',
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
              <Button
                onPress={handleSubmit}
                color="#fca311"
                title="Get Account"
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};
export default ForgotPassword;
