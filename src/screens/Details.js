import React from 'react';
import {
  Box,
  Button,
  FlatList,
  HStack,
  Image,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Text,
  View,
} from 'native-base';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {vw} from 'react-native-expo-viewport-units';
import {useDispatch, useSelector} from 'react-redux';
import NavUser from '../component/NavUser';
import http from '../helper/http';
import {chooseMovie} from '../redux/reducers/transaction';

export default function Details({route}) {
  const token = useSelector(state => state.auth.token);
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [movie, setMovie] = React.useState([]);
  const [schedule, setSchedule] = React.useState([]);
  const [city, setCity] = React.useState([]);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedCinema, setSelectedCinema] = React.useState('');
  const [logoCinema, setImageCinema] = React.useState('');
  const [nameCinema, setNameCinema] = React.useState('');
  const [price, setPrice] = React.useState('');
  const {id} = route.params;
  const dateSlice = String(date).slice(0, 15);
  const timeNow = String(date)
    .slice(16)
    .slice(0, 8)
    .replace(':', '')
    .replace(':', '');

  React.useEffect(() => {
    getMovie();
    getSchedule();
    getCity();
  }, []);

  const getMovie = async () => {
    const {data: result} = await http().get(`/movies/${id}`);
    setMovie(result.data[0]);
  };

  const getSchedule = async () => {
    const {data: result} = await http(token).get(`/scheduleMovies/info/${id}`);
    setSchedule(result.data);
  };

  const getCity = async () => {
    const {data: result} = await http(token).get(`/scheduleMovies/city/${id}`);
    setCity(result.data);
  };
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const bookingActions = () => {
    if (selectedTime) {
      const idMovie = schedule[0].id;
      const idCinema = selectedCinema;
      const timeBooking = selectedTime;
      const dateBooking = dateSlice;
      dispatch(
        chooseMovie({
          idMovie,
          idCinema,
          timeBooking,
          dateBooking,
          logoCinema,
          price,
          nameCinema,
        }),
      );
      navigation.navigate('Booking');
    } else {
      alert('first select the available time');
    }
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        <View backgroundColor="white">
          {/* Navbar */}
          {token ? <NavUser /> : <Navbar />}
          {/* Main */}
          <View width="100%" paddingX="5%" paddingY="10%" key={movie.id}>
            <Box
              width="50%"
              height="230px"
              rounded="8px"
              borderWidth="2"
              marginX="auto"
              overflow="hidden">
              <Image
                alt="error image"
                source={{
                  uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${movie.poster}`,
                }}
                width="100%"
                height="100%"
              />
            </Box>
            <Text
              color="black"
              fontSize="30px"
              textAlign="center"
              marginTop="20px"
              marginBottom="5px">
              {movie.title}
            </Text>
            <Text textAlign="center" fontSize="18px" color="gray.500">
              {movie.genre}
            </Text>
            <View
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              marginY="20px">
              <View width="50%">
                <Text color="gray.500">Realese date</Text>
                <Text fontSize="16px">{movie.dateRelease?.slice(0, 10)}</Text>
              </View>
              <View width="50%" ml={2}>
                <Text color="gray.500">Directed By</Text>
                <Text fontSize="16px">{movie.director}</Text>
              </View>
            </View>
            <View
              display="flex"
              flexDirection="row"
              alignItems="center"
              marginBottom="20px">
              <View width="50%">
                <Text color="gray.500">Duration</Text>
                <Text fontSize="16px">{movie.duration} minute</Text>
              </View>
              <View width="50%" ml={2}>
                <Text color="gray.500">Casts</Text>
                <Text fontSize="16px">{movie.casts}</Text>
              </View>
            </View>
            <View height="1px" widht="100%" backgroundColor="gray.400" />
            <View marginTop="20px">
              <Text color="gray.500">Synopsis</Text>
              <Text fontSize="16px">{movie.synopsis}</Text>
            </View>
          </View>
          {/* Booking */}
          <View backgroundColor="gray.200" paddingX="5%" paddingY="10%">
            <Text fontSize="20px" textAlign="center" marginBottom="5px">
              Showtime and Tickets
            </Text>
            <Text fontSize="13px" textAlign="center" marginBottom="20px">
              *press time to selected
            </Text>
            <HStack space={2}>
              <Button
                w={vw(35)}
                title="Open"
                marginBottom="20px"
                backgroundColor="white"
                onPress={() => setOpen(true)}>
                <Text color="gray.400" fontSize={13}>
                  Set Date
                </Text>
              </Button>
              <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={() => {
                  setOpen(false);
                  setDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Select
                w={vw(50)}
                placeholder="Set a city"
                marginBottom="20px"
                widht="50%"
                backgroundColor="white">
                {city?.map((item, i) => (
                  <Select.Item key={i} label={item.city} value={item.city} />
                ))}
              </Select>
            </HStack>
            {schedule?.map(data => (
              <Box
                key={data.id}
                backgroundColor="white"
                padding="5%"
                rounded="8px"
                marginBottom="20px">
                <Image
                  source={require('../assets/logo/ebu.png')}
                  alt="logo cinema"
                  marginX="auto"
                  marginBottom="20px"
                />
                <Text color="gray.500" textAlign="center">
                  {data.address}. {data.city}
                </Text>
                <View
                  height="1px"
                  widht="100%"
                  backgroundColor="gray.400"
                  marginY="10px"
                />
                <FlatList
                  numColumns={4}
                  data={data.times}
                  renderItem={({item}) => {
                    const timeSplit = item.replace(':', '').replace(':', '');
                    if (timeNow < timeSplit) {
                      return (
                        <Pressable
                          key={item}
                          onPress={() => {
                            setSelectedTime(item);
                            setSelectedCinema(data.idCinema);
                            setImageCinema(data.logo);
                            setNameCinema(data.name);
                            setPrice(data.price);
                          }}
                          w="25%"
                          mx={0.2}
                          mb={2}
                          backgroundColor={
                            selectedTime === item ? 'green.200' : 'transparent'
                          }
                          borderRadius={20}>
                          <Text textAlign="center" color="black">
                            {item}
                          </Text>
                        </Pressable>
                      );
                    }
                  }}
                />
                {token ? (
                  <Button
                    marginTop="20px"
                    backgroundColor="orange.400"
                    onPress={() => bookingActions()}>
                    Book Now
                  </Button>
                ) : (
                  <Button
                    marginTop="20px"
                    backgroundColor="orange.400"
                    onPress={() => navigation.navigate('Register')}>
                    Book Now
                  </Button>
                )}
              </Box>
            ))}
            <Text fontSize="18px" color="orange.400" textAlign="center">
              view more
            </Text>
          </View>
          <Footer />
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
}
