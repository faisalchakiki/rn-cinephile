import React, {useEffect} from 'react';
import {Box, FlatList, HStack, Pressable} from 'native-base';

const alfabeth = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export default function Seats({
  maxWidht = 7,
  startNumber = 1,
  onChange,
  selected,
}) {
  return (
    <FlatList
      data={alfabeth}
      renderItem={({item}) => (
        <HStack space={1}>
          {[...Array(maxWidht)].map((_v, index) => {
            let value = item.concat(startNumber + index);
            return (
              <Pressable onPress={() => onChange(value)} key={value}>
                <Box
                  backgroundColor={
                    selected.includes(value) ? 'orange.400' : 'gray.300'
                  }
                  width="18px"
                  height="18px"
                  borderRadius="2px"
                  marginBottom={1}
                />
              </Pressable>
            );
          })}
        </HStack>
      )}
    />
  );
}
