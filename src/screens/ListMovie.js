/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import React from 'react';
import Month from '../component/Month';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import {Box, Button, FlatList, Select} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import NavUser from '../component/NavUser';
import http from '../helper/http';
// import DateTimePicker from '@react-native-community/datetimepicker';

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
    height: 500,
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
    maxWidth: 200,
    padding: 20,
    backgroundColor: 'white',
    border: 3,
    borderStyle: 'solid',
    borderRadius: 8,
    marginRight: 20,
  },
  boxMovieGray: {
    maxWidth: 200,
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
  listMovie: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    flexWrap: 'nowrap',
  },
  boxNum: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 8,
    backgroundColor: 'orange',
  },
});

export default function ListMovie() {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [movie, setMovie] = React.useState([]);
  const [limit] = React.useState(4);
  const [count, setCountPage] = React.useState(1);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    getMovie(page, limit);
  }, [page, limit]);

  const getMovie = async (pages, limits) => {
    const {data: result} = await http().get(
      `/movies?limit=${limits}&page=${pages}`,
    );
    setMovie(result.data);
    setCountPage(result.pageInfo.totalPage);
  };

  const totalPage = [];
  for (let countPage = 1; countPage <= count; countPage++) {
    totalPage.push(countPage);
  }
  return (
    <ScrollView>
      <View style={[styles.bgMainWhite]}>
        {/* Navbar */}
        {token ? <NavUser /> : <Navbar />}
        {/* Main */}
        <View style={[styles.bgGray, styles.pVertical]}>
          <View style={[styles.bgGray, styles.p5]}>
            <Text style={styles.textHeaderMain}>List Movie</Text>
          </View>
          <Select
            placeholder="Sort"
            mt={2}
            ml="5%"
            width="74%"
            backgroundColor="white">
            <Select.Item label="A - Z" value="ASC" />
            <Select.Item label="Z - A" value="DESC" />
            <Select.Item label="Now Showing" value="nowShowing" />
            <Select.Item label="Upcoming" value="upComing" />
          </Select>
          <TextInput
            style={[
              styles.input,
              {marginLeft: '5%'},
              {paddingLeft: 15},
              {width: '70%'},
            ]}
            name="search-movie"
            placeholder="Search Movie Name ..."
            placeholderTextColor="gray"
          />
          <Month />
          <FlatList
            paddingX={3}
            data={movie}
            numColumns={2}
            renderItem={({item}) => (
              <View
                key={item.id}
                style={[
                  styles.boxMovieWhite,
                  {width: '50%'},
                  styles.mb20,
                  {marginRight: 5},
                ]}>
                <Image
                  alt=""
                  source={{
                    uri: `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster}`,
                  }}
                  style={[{width: '100%'}, {height: 200}]}
                />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.genre}>{item.genre}</Text>
                <Button
                  onPress={() => navigation.navigate('Details', {id: item.id})}
                  backgroundColor="orange.400">
                  Details
                </Button>
              </View>
            )}
          />
          <View style={[styles.dFlex, {justifyContent: 'center'}]}>
            {totalPage?.map(item => (
              <Pressable onPress={() => setPage(item)} key={item}>
                <Box
                  backgroundColor={page === item ? 'orange.400' : 'gray.300'}
                  paddingY={1}
                  paddingX={3}
                  marginX={1}
                  borderRadius={4}>
                  {item}
                </Box>
              </Pressable>
            ))}
          </View>
        </View>
        {/* Footer */}
        <Footer />
      </View>
    </ScrollView>
  );
}
