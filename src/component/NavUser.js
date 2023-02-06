import {useNavigation} from '@react-navigation/native';
import {
  Box,
  HamburgerIcon,
  HStack,
  Input,
  Menu,
  Pressable,
  Text,
} from 'native-base';
import React from 'react';
import {vw} from 'react-native-expo-viewport-units';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/reducers/auth';

export default function NavUser() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logoutAction = () => {
    dispatch(logout());
  };
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
          <Input
            w="60%"
            borderWidth={1}
            borderColor="gray.400"
            name="search-movie"
            mx="auto"
            textAlign="center"
            placeholder="Search Movie Name ..."
            placeholderTextColor="black"
          />
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
            onPress={() => navigation.navigate('Profile')}>
            <Text letterSpacing={2} fontSize="17px" mx="auto">
              Profile
            </Text>
          </Menu.Item>
          <Menu.Item
            w="full"
            borderBottomWidth={1}
            borderColor="gray.400"
            onPress={() => logoutAction()}>
            <Text letterSpacing={2} fontSize="17px" mx="auto">
              Logout
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
