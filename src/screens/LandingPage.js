/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import Month from '../component/Month';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import {useNavigation} from '@react-navigation/native';
import {Box, Button, HStack, Pressable} from 'native-base';
import {useSelector} from 'react-redux';
import NavUser from '../component/NavUser';
import http from '../helper/http';

const styles = StyleSheet.create({
  bgAuth: {
    padding: 35,
    backgroundColor: 'white',
    height: '100%',
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
  black: {
    color: 'black',
  },
  input: {
    // w-full bg-[#fcfdfe] border rounded-2xl divide-solid border-slate-300 py-[10px] pl-[24px] mt-[6px] mb-[8px]
    width: '100%',
    backgroundColor: '#fcfdfe',
    color: 'black',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#eaeaea',
    paddingLeft: 24,
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
  p5: {
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  pt20: {
    paddingTop: 20,
  },
  pl5: {
    paddingLeft: '5%',
  },
  py5: {
    paddingVertical: '5%',
  },
  pVertical: {
    paddingVertical: 50,
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageHeader: {
    width: '100%',
    height: 300,
  },
  border: {
    border: 1,
    borderColor: 'black',
  },
  font30: {
    fontSize: 30,
  },
  font20: {
    fontSize: 20,
  },
  bgMainWhite: {
    backgroundColor: 'white',
    width: '100%',
  },
  bgGray: {
    backgroundColor: '#f5f6f8',
    width: '100%',
  },
  bgGrayMain: {
    backgroundColor: '#f5f6f8',
    height: 450,
    width: '100%',
  },
  textHeaderMain: {
    fontSize: 25,
    color: 'black',
  },
  containerFlex: {
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // /* className="flex items-start justify-start pl-[50px] pt-[80px] lg:pl-[120px] scrollbar overflow-x-auto">
  },
  boxMovieWhite: {
    width: 200,
    padding: 20,
    backgroundColor: 'white',
    border: 3,
    borderStyle: 'solid',
    borderRadius: 8,
    marginRight: 20,
  },
  boxMovieGray: {
    width: 200,
    padding: 20,
    backgroundColor: '#f5f6f8',
    border: 3,
    borderStyle: 'solid',
    borderRadius: 8,
    marginRight: 20,
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
    textAlign: 'center',
    color: 'black',
  },
  genre: {
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
    marginBottom: 5,
  },
  month: {
    backgroundColor: 'orange',
    maxWidht: 80,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  wrapMonth: {
    paddingLeft: '5%',
    marginVertical: 20,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'scroll',
  },
  cardMember: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  navbar: {
    marginBottom: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnSignIn: {
    backgroundColor: '#fca311',
    padding: 5,
    borderRadius: 8,
  },
});

export default function LandingPage() {
  const [focus, setFocus] = React.useState(null);
  const focusId = id => {
    if (focus === id) {
      setFocus(null);
    } else {
      setFocus(id);
    }
  };
  const [movieUpComing, setUpComing] = React.useState([]);
  const [movieNowShowing, setNowShowing] = React.useState([]);
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  React.useEffect(() => {
    upComingMovie();
    nowShowing();
  }, []);
  const upComingMovie = async () => {
    try {
      const {data: result} = await http().get('/movies/upcoming');
      setUpComing(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  const nowShowing = async () => {
    try {
      const {data: result} = await http().get('/movies/nowShowing');
      setNowShowing(result);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <ScrollView>
      <View style={[styles.bgMainWhite]}>
        {/* Navbar */}
        {token ? <NavUser /> : <Navbar />}
        {/* Header */}
        <View style={[styles.bgMainWhite, styles.p5]}>
          <View style={styles.py5}>
            <Text style={[styles.black, styles.textCenter, styles.font20]}>
              Nearest Cinema, Newest Movie,
            </Text>
            <Text
              style={[
                styles.orange,
                styles.textCenter,
                styles.mb20,
                styles.font30,
              ]}>
              Find out now!
            </Text>
          </View>
          <View style={styles.mb20}>
            <Image
              alt=""
              source={require('../assets/img/header.png')}
              style={styles.imageHeader}
            />
          </View>
        </View>
        {/* Now Showing */}
        <View style={styles.bgGrayMain}>
          <View
            style={[
              styles.bgGray,
              styles.p5,
              styles.dFlex,
              styles.mt10,
              styles.mb20,
            ]}>
            <Text style={styles.textHeaderMain}>Now Showing</Text>
            <Text
              style={styles.orange}
              onPress={() => navigation.navigate('ListMovie')}>
              View All
            </Text>
          </View>
          <ScrollView horizontal>
            <HStack paddingLeft={5} paddingRight={5} alignItems="flex-start">
              {movieNowShowing?.data?.map(data => (
                <Pressable
                  onPress={() => focusId(data.id)}
                  position="relative"
                  key={data.id}>
                  <Box
                    backgroundColor={focus === data.id ? 'white' : '#f5f6f8'}
                    width="200px"
                    padding="18px"
                    borderRadius={8}
                    borderWidth={2}
                    marginRight="20px"
                    borderColor={focus === data.id ? 'transparent' : 'white'}>
                    <Box width="100%" height="250px">
                      <Image
                        alt=""
                        style={styles.imageBox}
                        source={{
                          uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${data.poster}`,
                        }}
                        width="100%"
                        height="100%"
                      />
                    </Box>
                    <Box>
                      {focus === data.id && (
                        <View>
                          <Text style={[styles.title]}>{data.title}</Text>
                          <Text style={[styles.genre]}>{data.genre}</Text>
                          <Button
                            onPress={() =>
                              navigation.navigate('Details', {id: data.id})
                            }
                            backgroundColor="orange.400">
                            Details
                          </Button>
                        </View>
                      )}
                    </Box>
                  </Box>
                </Pressable>
              ))}
            </HStack>
          </ScrollView>
        </View>
        {/* Upcoming */}
        <View style={[styles.bgMainWhite, styles.py5]}>
          <View style={[styles.dFlex, styles.p5, styles.pt20]}>
            <Text style={styles.textHeaderMain}>Upcoming Movies</Text>
            <Text
              style={styles.orange}
              onPress={() => navigation.navigate('ListMovie')}>
              View All
            </Text>
          </View>
          <Month />
          <ScrollView horizontal>
            <HStack
              overflowX="auto"
              paddingLeft={5}
              paddingRight={5}
              alignItems="flex-start">
              {movieUpComing?.data?.map(item => (
                <View style={styles.boxMovieGray} key={item.id}>
                  <Box width="100%" height="250px">
                    <Image
                      alt=""
                      style={styles.imageBox}
                      source={{
                        uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster}`,
                      }}
                      width="100%"
                      height="100%"
                    />
                  </Box>
                  <View>
                    <Text style={[styles.title]}>{item.title}</Text>
                    <Text style={[styles.genre]}>{item.genre}</Text>
                    <Button
                      onPress={() =>
                        navigation.navigate('Details', {id: item.id})
                      }
                      backgroundColor="orange.400">
                      Details
                    </Button>
                  </View>
                </View>
              ))}
            </HStack>
          </ScrollView>
        </View>
        {/* Card Member */}
        <View style={[styles.cardMember, styles.p5]}>
          <View
            style={[styles.bgGray, styles.p5, styles.py5, {borderRadius: 8}]}>
            <Text style={[styles.font20, styles.black, styles.textCenter]}>
              Be the vanguard of the
            </Text>
            <Text style={[styles.font30, styles.orange, styles.textCenter]}>
              Moviegoers
            </Text>
            <View>
              <TextInput
                style={[styles.input]}
                placeholder="Type your email"
                placeholderTextColor="gray"
              />
              <Button backgroundColor="orange.400">Join now</Button>
            </View>
            {/* className="text-[#6e7191] text-[12px] md:text-[17px]" */}
            <Text style={[styles.gray, styles.textCenter, styles.mt10]}>
              By joining you as a Tickitz member, we will always send you the
              latest updates via email .
            </Text>
          </View>
        </View>
        {/* Footer */}
        <Footer />
      </View>
    </ScrollView>
  );
}
