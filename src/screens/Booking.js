import React from 'react';
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import Footer from '../component/Footer';
import MaterialIcons from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Seats from '../component/Seats';
import NavUser from '../component/NavUser';
import {useDispatch, useSelector} from 'react-redux';
import http from '../helper/http';
import {chooseSeats} from '../redux/reducers/transaction';

export default function Booking() {
  const navigation = useNavigation();
  const infoBooking = useSelector(state => state.transaction);
  const [details, setDetails] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const dispatch = useDispatch();
  const onChangeSeat = seatNum => {
    if (selected.includes(seatNum)) {
      setSelected(selected.filter(value => value !== seatNum));
      dispatch(chooseSeats(selected));
    } else {
      setSelected([...selected, seatNum]);
      dispatch(chooseSeats(selected));
    }
  };
  React.useEffect(() => {
    getDetails();
  }, [setSelected]);
  const getDetails = async () => {
    const {data: result} = await http().get(`/movies/${infoBooking.idMovie}`);
    console.log(setDetails(result.data[0]));
    return setDetails(result.data[0]);
  };
  const goToPayment = () => {
    if (infoBooking.seatSelected !== null) {
      navigation.navigate('Payment');
    } else {
      alert('selected seats');
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
            paddingY="10%"
            backgroundColor="gray.200">
            <Text fontSize="20px" marginBottom="20px">
              Choose Your Seat
            </Text>
            <Box
              backgroundColor="white"
              paddingX="5%"
              paddingY="10%"
              borderRadius="8px"
              marginBottom="30px">
              <View
                height="10px"
                widht="100%"
                backgroundColor="orange.400"
                borderRadius="50px"
              />
              <HStack space="3" marginTop={2}>
                <View>
                  <Seats selected={selected} onChange={onChangeSeat} />
                  <View height={1} backgroundColor="red.300" marginTop={2} />
                </View>
                <View>
                  <Seats
                    selected={selected}
                    onChange={onChangeSeat}
                    startNumber={8}
                  />
                  <View height={1} backgroundColor="red.300" marginTop={2} />
                </View>
              </HStack>
              <Text fontSize="17px" marginY="10px">
                Seating Key
              </Text>
              <View display="flex" flexDirection="row" marginBottom="10px">
                <HStack alignItems="center" marginRight="30px" space={2}>
                  <Icon as={<MaterialIcons name="arrow-down" />} />
                  <Text>A - G</Text>
                </HStack>
                <HStack alignItems="center" space={2}>
                  <Icon as={<MaterialIcons name="arrow-right" />} />
                  <Text>1 - 14</Text>
                </HStack>
              </View>
              <View>
                <HStack space={2} marginBottom="5px">
                  <Box
                    backgroundColor="gray.200"
                    padding="10px"
                    borderRadius="2px"
                  />
                  <Text>Available</Text>
                </HStack>
                <HStack space={2} marginBottom="5px">
                  <Box
                    backgroundColor="gray.500"
                    padding="10px"
                    borderRadius="2px"
                  />
                  <Text>Sold</Text>
                </HStack>
                <HStack space={2} marginBottom="5px">
                  <Box
                    backgroundColor="orange.500"
                    padding="10px"
                    borderRadius="2px"
                  />
                  <Text>Selected</Text>
                </HStack>
              </View>
            </Box>
            <Text fontSize="20px" marginBottom="20px">
              Order Info
            </Text>
            <Box
              backgroundColor="white"
              paddingX="5%"
              paddingY="10%"
              borderRadius="8px"
              marginBottom="30px">
              <Image
                source={require('../assets/logo/ebu.png')}
                mx="auto"
                alt="#cinema booking"
              />
              <Text textAlign="center" fontSize="24px">
                {infoBooking.nameCinema}
              </Text>
              <Text
                textAlign="center"
                marginBottom="20px"
                fontSize="18px"
                color="gray.500">
                {details.title}
              </Text>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                marginBottom="10px">
                <Text color="gray.500">{infoBooking.dateBooking}</Text>
                <Text>{infoBooking.timeBooking}</Text>
              </HStack>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                marginBottom="10px">
                <Text color="gray.500">One ticket price</Text>
                <Text>{infoBooking.price}</Text>
              </HStack>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                marginBottom="10px">
                <Text color="gray.500">Seat Choosed</Text>
                <Text>
                  {infoBooking.seatSelected
                    ? infoBooking?.seatSelected.join(',')
                    : '-'}
                </Text>
              </HStack>
              <HStack
                justifyContent="space-between"
                alignItems="center"
                marginBottom="10px">
                <Text color="gray.500" fontSize="18px">
                  Total
                </Text>
                <Text fontSize="19px">
                  {infoBooking.price
                    ? `Rp.${Number(infoBooking.price) * selected.length}`
                    : `Rp.0`}
                </Text>
              </HStack>
            </Box>
            <Button backgroundColor="orange.400" onPress={() => goToPayment()}>
              Chekout Now
            </Button>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
