import React from 'react';
import {
  Box,
  Button,
  HStack,
  Image,
  NativeBaseProvider,
  ScrollView,
  Text,
  View,
  FlatList,
} from 'native-base';
import Footer from '../component/Footer';
import {useNavigation} from '@react-navigation/native';
import NavUser from '../component/NavUser';
import http from '../helper/http';
import {useSelector} from 'react-redux';

export default function History() {
  const navigation = useNavigation();
  const [data, setDataHistory] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  console.log(token);
  React.useEffect(() => {
    getDataOrder(token);
  }, [token]);
  const getDataOrder = async tokens => {
    const {data: result} = await http(tokens).get('/bookings/history');
    setDataHistory(result.data);
  };
  const timeNow = String(new Date())
    .slice(16)
    .slice(0, 8)
    .replace(':', '')
    .replace(':', '');
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
              marginBottom="10%"
              backgroundColor="white"
              paddingTop="10px"
              paddingX="5%">
              <HStack justifyContent="space-evenly" alignItems="center">
                <Text
                  onPress={() => navigation.navigate('Profile')}
                  fontSize="17px"
                  color="gray.500"
                  borderBottomWidth={3}
                  paddingBottom="5px"
                  borderBottomColor="gray.500">
                  Detail Account
                </Text>
                <Text
                  fontSize="17px"
                  color="orange.300"
                  borderBottomWidth={3}
                  paddingBottom="5px"
                  borderBottomColor="orange.300">
                  Order History
                </Text>
              </HStack>
            </View>
            {data?.map(item => {
              console.log(item);
              let timeSplit = item.timeBooking
                .replace(':', '')
                .replace(':', '');
              let status = false;
              if (timeSplit > timeNow) {
                status = true;
              }
              return (
                <Box
                  key={item.id}
                  backgroundColor="white"
                  padding="30px"
                  borderRadius="8px"
                  marginBottom="30px">
                  <Image
                    alt=""
                    source={require('../assets/logo/cineone.png')}
                    marginBottom="10px"
                  />
                  <Text color="gray.500">{item.dateBooking}</Text>
                  <Text fontSize="19px">{item.title}</Text>
                  <View
                    height="2px"
                    backgroundColor="gray.200"
                    marginY="20px"
                    marginX="-30px"
                  />
                  {status === true ? (
                    <Button
                      onPress={() =>
                        navigation.navigate('Ticket', {id: item.id})
                      }
                      backgroundColor="green.500">
                      Ticket active
                    </Button>
                  ) : (
                    <Button
                      onPress={() =>
                        navigation.navigate('Ticket', {id: item.id, status})
                      }
                      backgroundColor="gray.500">
                      Ticket expired
                    </Button>
                  )}
                </Box>
              );
            })}
          </View>
          <Footer />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
