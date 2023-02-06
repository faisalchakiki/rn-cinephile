import React from 'react';
import {
  Alert,
  Box,
  Button,
  CloseIcon,
  FlatList,
  FormControl,
  HStack,
  IconButton,
  Image,
  Input,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Stack,
  Text,
  View,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import Footer from '../component/Footer';
import {useNavigation} from '@react-navigation/native';
import NavUser from '../component/NavUser';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import * as Yup from 'yup';
import {Formik} from 'formik';
import 'yup-phone';
import {transactionAction} from '../redux/actions/transactions';

const validationSchemas = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  fullName: Yup.string().required('Required'),
  phoneNumber: Yup.string().phone('ID').required('Required'),
});

export default function Payment() {
  const [profile, setProfile] = React.useState([]);
  const [payment, setPayment] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  const infoBooking = useSelector(state => state.transaction);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  React.useEffect(() => {
    getProfile(token);
    getPaymentMethod();
  }, [token, setSelected]);

  const getProfile = async tokens => {
    const {data: result} = await http(tokens).get('/profile');
    setProfile(result.data[0]);
  };
  const getPaymentMethod = async () => {
    try {
      const {data: results} = await http().get('/scheduleMovies/payment');
      setPayment(results.data);
    } catch (err) {
      console.log(err);
    }
  };
  let total = 0;
  if (infoBooking.seatSelected) {
    if (infoBooking.seatSelected.length) {
      total = Number(infoBooking.price) * infoBooking.seatSelected.length;
    }
  }
  const transactionProsess = value => {
    if (selected !== 0) {
      const callback = err => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
          navigation.navigate('History');
        }
      };
      const form = {
        fullName: value.fullName,
        phoneNumber: value.phoneNumber,
        email: value.email,
        timeBooking: infoBooking.timeBooking,
        dateBooking: infoBooking.dateBooking,
        idUsers: profile.id,
        idMovie: infoBooking.idMovie,
        idCinema: infoBooking.idCinema,
        idPayMethod: selected,
        seatNum: infoBooking.seatSelected,
        total: total,
        callback,
      };
      dispatch(transactionAction(form));
    } else {
      alert('selected payment method');
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <View backgroundColor="white">
          <NavUser />
          <View
            width="100%"
            paddingX="5%"
            paddingBottom="10%"
            backgroundColor="gray.200">
            <View
              borderBottomRadius="20px"
              width="112%"
              marginX="-6%"
              backgroundColor="white"
              paddingY="10px"
              paddingX="5%">
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize="18px" color="gray.500">
                  Total Payment
                </Text>
                <Text fontSize="17px">Rp.{total}</Text>
              </HStack>
            </View>
            <Text fontSize="20px" marginBottom="20px" marginTop="10%">
              Payment Method
            </Text>
            <Box backgroundColor="white" padding="30px" borderRadius="8px">
              <Box marginBottom="15px" paddingX={1}>
                <FlatList
                  numColumns={3}
                  data={payment}
                  renderItem={({item}) => {
                    return (
                      <Pressable
                        onPress={() => setSelected(item.id)}
                        key={item.id}
                        borderWidth="1px"
                        width="30%"
                        borderColor="gray.400"
                        backgroundColor={
                          Number(selected) === item.id
                            ? 'orange.200'
                            : 'gray.200'
                        }
                        borderRadius="8px"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        height="50px"
                        marginX={1}>
                        {/* <Image
                          source={require('../assets/logo/dana.png')}
                          alt=""
                        /> */}
                        <Text>{item.name}</Text>
                      </Pressable>
                    );
                  }}
                />
              </Box>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                marginY="15px">
                <View height="1px" backgroundColor="gray.500" width="40%" />
                <Text>OR</Text>
                <View height="1px" backgroundColor="gray.500" width="40%" />
              </HStack>
              <Text color="gray.400" textAlign="center">
                Pay via cash. <Text color="orange.300">See it work</Text>
              </Text>
            </Box>
            <Text fontSize="20px" marginBottom="20px" marginTop="10%">
              Personal Info
            </Text>
            <Formik
              validationSchema={validationSchemas}
              onSubmit={e => transactionProsess(e)}
              initialValues={{
                fullName: '',
                phoneNumber: '',
                email: '',
              }}>
              {({handleChange, handleBlur, handleSubmit, errors, values}) => {
                return (
                  <>
                    <Box
                      backgroundColor="white"
                      padding="30px"
                      borderRadius="8px">
                      <Text marginBottom="5px" fontSize="17px" color="gray.500">
                        Details Information
                      </Text>
                      <View
                        height="2px"
                        backgroundColor="gray.400"
                        marginBottom="20px"
                        marginX="-30px"
                      />
                      <FormControl
                        marginBottom={2}
                        isInvalid={errors.fullName ? true : false}>
                        <Box>Full Name :</Box>
                        <Input
                          fontSize="13px"
                          type="text"
                          onChangeText={handleChange('fullName')}
                          onBlur={handleBlur('fullName')}
                          placeholder="Type your full name"
                          defaultValue={`${profile.firstName} ${profile.lastName}`}
                          value={values.fullName}
                        />
                        {errors.fullName && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}>
                            {errors.fullName}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                      <FormControl
                        marginBottom={2}
                        isInvalid={errors.phoneNumber ? true : false}>
                        <Box>Phone Number :</Box>
                        <Input
                          fontSize="13px"
                          type="text"
                          onChangeText={handleChange('phoneNumber')}
                          onBlur={handleBlur('phoneNumber')}
                          placeholder="Type your phone number"
                          defaultValue={profile.phoneNumber}
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
                          defaultValue={profile.email}
                          value={values.email}
                        />
                        {errors.email && (
                          <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs" />}>
                            {errors.email}
                          </FormControl.ErrorMessage>
                        )}
                      </FormControl>
                      <Alert w="100%" status="error">
                        <VStack space={2} flexShrink={1} w="100%">
                          <HStack
                            flexShrink={1}
                            space={2}
                            justifyContent="space-between">
                            <HStack space={2} flexShrink={1}>
                              <Alert.Icon mt="1" />
                              <Text fontSize="md" color="coolGray.800">
                                Fill your data correctly
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </Alert>
                    </Box>
                    <Button
                      onPress={handleSubmit}
                      backgroundColor="orange.400"
                      marginTop="30px">
                      Pay your Order
                    </Button>
                  </>
                );
              }}
            </Formik>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
