import {useNavigation} from '@react-navigation/native';
import {Box, HamburgerIcon, HStack, Menu, Pressable, Text} from 'native-base';
import React from 'react';
import {vw} from 'react-native-expo-viewport-units';

export default function Navbar() {
  const navigation = useNavigation();
  return (
    <HStack
      paddingX="5%"
      paddingY={5}
      zIndex={99}
      justifyContent="space-between"
      alignItems="center">
      <Text fontSize={20} fontStyle="italic" color="orange.400">
        CINEPHILE
      </Text>
      <Box shadow="none">
        <Menu
          mt={8}
          width={vw(100)}
          borderWidth="0"
          trigger={triggerProps => {
            return (
              <Pressable
                borderWidth={2}
                padding="3px"
                rounded={5}
                borderColor="gray.400"
                accessibilityLabel="More options menu"
                {...triggerProps}>
                <HamburgerIcon />
              </Pressable>
            );
          }}>
          <Menu.Item
            w="full"
            borderBottomWidth={1}
            borderColor="gray.400"
            onPress={() => navigation.navigate('LandingPage')}>
            <Text letterSpacing={2} fontSize="17px" mx="auto">
              Home
            </Text>
          </Menu.Item>
          <Menu.Item
            w="full"
            borderBottomWidth={1}
            borderColor="gray.400"
            onPress={() => navigation.navigate('ListMovie')}>
            <Text letterSpacing={2} fontSize="17px" mx="auto">
              List Movie
            </Text>
          </Menu.Item>
          <Menu.Item
            w="full"
            borderBottomWidth={1}
            borderColor="gray.400"
            onPress={() => navigation.navigate('SignIn')}>
            <Text letterSpacing={2} fontSize="17px" mx="auto">
              Sign In
            </Text>
          </Menu.Item>
          <Text color="orange.400" mx="auto" marginTop={2}>
            © 2020 Tickitz. All Rights Reserved.
          </Text>
        </Menu>
      </Box>
    </HStack>
  );
}
