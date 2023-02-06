import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {HStack, ScrollView} from 'native-base';

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
});

export default function Month() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <ScrollView horizontal>
      <HStack marginY="20px" paddingLeft="2%" marginRight="20px">
        {months.map((value, index) => {
          return (
            <View style={styles.month} key={index}>
              <Text style={styles.black}>{value}</Text>
            </View>
          );
        })}
      </HStack>
    </ScrollView>
  );
}
