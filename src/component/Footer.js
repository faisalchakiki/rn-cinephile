import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from 'native-base';
import {useNavigation} from '@react-navigation/native';

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
  navbar: {
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 0,
    // backgroundColor: 'white',
    borderBottomColor: 'black',
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
});

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={[styles.bgWhite, styles.p5, styles.pVertical]}>
      <View>
        <View>
          <Text style={[styles.textLogoAuth, styles.font20, {marginBottom: 5}]}>
            CINEPHILE App
          </Text>
          <Text style={styles.gray}>
            Stop waiting in line. Buy tickets conveniently, watch movies quietly
          </Text>
        </View>

        <View>
          <Text style={[styles.font20, styles.gray, styles.mt20]}>Explore</Text>
          <View style={[styles.dFlex, {justifyContent: 'flex-start'}]}>
            <Text
              onPress={() => navigation.navigate('LandingPage')}
              style={[styles.orange, styles.mt10, {marginRight: 20}]}>
              Home
            </Text>
            <Text
              onPress={() => navigation.navigate('ListMovie')}
              style={[styles.orange, styles.mt10]}>
              List Movie
            </Text>
          </View>
        </View>

        <View>
          <Text style={[styles.font20, styles.gray, styles.mt20, styles.mb10]}>
            Our Sponsor
          </Text>
          <Image
            alt=""
            source={require('../assets/logo/ebu.png')}
            marginBottom="10px"
          />
          <Image
            alt=""
            source={require('../assets/logo/cineone.png')}
            marginBottom="10px"
          />
          <Image
            alt=""
            source={require('../assets/logo/hiflix.png')}
            marginBottom="10px"
          />
        </View>

        <View>
          <Text style={[styles.font20, styles.gray, styles.mt20]}>
            Follow Us
          </Text>
          <View
            style={[styles.dFlex, {justifyContent: 'flex-start'}, styles.mt10]}>
            <Image
              alt=""
              source={require('../assets/logo/youtube.png')}
              style={{marginRight: 5}}
            />
            <Text style={styles.gray}>Cinephile Cinema</Text>
          </View>
          <View
            style={[styles.dFlex, {justifyContent: 'flex-start'}, styles.mt10]}>
            <Image
              alt=""
              source={require('../assets/logo/twiter.png')}
              style={{marginRight: 5}}
            />
            <Text style={styles.gray}>cinephile_id</Text>
          </View>
          <View
            style={[styles.dFlex, {justifyContent: 'flex-start'}, styles.mt10]}>
            <Image
              alt=""
              source={require('../assets/logo/instagram.png')}
              style={{marginRight: 5}}
            />
            <Text style={styles.gray}>cinephile_cinema</Text>
          </View>
          <View
            style={[styles.dFlex, {justifyContent: 'flex-start'}, styles.mt10]}>
            <Image
              alt=""
              source={require('../assets/logo/youtube.png')}
              style={{marginRight: 5}}
            />
            <Text style={styles.gray}>Cinephile</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.orange, styles.textCenter, styles.mt20]}>
        © 2020 Tickitz. All Rights Reserved.
      </Text>
    </View>
  );
};

export default Footer;
