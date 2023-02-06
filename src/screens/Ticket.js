import React from 'react';
import {
  Box,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
} from 'native-base';
import Footer from '../component/Footer';
import NavUser from '../component/NavUser';
import http from '../helper/http';

export default function Ticket({route}) {
  const {id, status} = route.params;
  const [transaction, setTrans] = React.useState({});
  const [seat, setSeats] = React.useState({});
  console.log(seat);
  console.log(transaction);
  React.useEffect(() => {
    getTicket(id);
  }, [id]);
  const getTicket = async idBook => {
    const {data} = await http().get(`/bookings/ticket/${idBook}`);
    setTrans(data.results.transaction);
    setSeats(data.results.seat);
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
            <Box
              backgroundColor="white"
              padding="30px"
              borderRadius="20px"
              borderBottomWidth={3}
              borderBottomStyle="dotted"
              borderBottomColor="gray.500"
              width="90%"
              marginX="auto">
              {status === true ? (
                <Image
                  source={require('../assets/img/qr-code.png')}
                  alt="qr-code"
                  marginX="auto"
                />
              ) : (
                <Box
                  width="150px"
                  height="150px"
                  mx="auto"
                  borderRadius="20px"
                  backgroundColor="gray.300"
                  display="flex"
                  justifyContent="center"
                  alignItems="center">
                  <Text>Ticked Expired</Text>
                </Box>
              )}
            </Box>
            {seat && (
              <Box
                backgroundColor="white"
                padding="30px"
                borderRadius="20px"
                width="90%"
                marginX="auto">
                <HStack space={2} marginBottom="10px">
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Movie
                    </Text>
                    <Text fontSize="17px">{transaction?.title}</Text>
                  </View>
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Category
                    </Text>
                    <Text fontSize="17px">{transaction?.genresMovie}</Text>
                  </View>
                </HStack>
                <HStack space={2} marginBottom="10px">
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Date
                    </Text>
                    <Text fontSize="17px">{transaction?.dateBooking}</Text>
                  </View>
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Time
                    </Text>
                    <Text fontSize="17px">{transaction?.timeBooking}</Text>
                  </View>
                </HStack>
                <HStack space={2} marginBottom="10px">
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Count
                    </Text>
                    <Text fontSize="17px">{seat?.seatBooking?.length} pcs</Text>
                  </View>
                  <View width="50%">
                    <Text color="gray.400" fontSize="15px">
                      Seats
                    </Text>
                    <Text fontSize="17px">{seat?.seatBooking}</Text>
                  </View>
                </HStack>
                <HStack
                  marginTop={10}
                  alignItems="center"
                  justifyContent="space-between">
                  <Text color="gray.400" fontSize="19px">
                    Total :
                  </Text>
                  <Text fontSize="18px">Rp.{transaction?.total}</Text>
                </HStack>
              </Box>
            )}
          </View>
          <Footer />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
