import React from 'react';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  View,
  WarningOutlineIcon,
} from 'native-base';
import Footer from '../component/Footer';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../redux/reducers/auth';
import NavUser from '../component/NavUser';
import http from '../helper/http';
import {Formik} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import 'yup-phone';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
YupPassword(Yup);

const validationPassword = Yup.object({
  password: Yup.string().required('Required').min(6),
  confirmPassword: Yup.string().required('Required').min(6),
});
// import MaterialIcons from 'react-native-vector-icons';

// const validationSchemas = Yup.object({
//   email: Yup.string().email('Invalid email address').required('Required'),
//   firstName: Yup.string().required('Required'),
//   lastName: Yup.string(),
//   phoneNumber: Yup.string().phone('ID').required('Required'),
// });

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [profile, setProfile] = React.useState([]);
  const token = useSelector(state => state.auth.token);
  const [isSuccessPassword, setSuccessPassword] = React.useState(false);
  const [isFailPassword, setFailPassword] = React.useState(false);
  const [isSuccessProfile, setSuccessProfile] = React.useState(false);
  const [isFailProfile, setFailProfile] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const [uploadAlert, setUploadAlert] = React.useState('');
  const [uploadSuccess, setUploadSuccess] = React.useState('');
  const [refresh, setRefresh] = React.useState(1);

  const logoutAction = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    getProfile(token);
  }, [token, refresh]);

  const getProfile = async tokens => {
    const {data} = await http(tokens).get('/profile');
    setProfile(data.data[0]);
  };

  const setPassword = values => {
    const {confirmPassword, password} = values;
    if (password === confirmPassword) {
      http(token).patch('/profile/password', {password});

      setSuccessPassword(true);
      setInterval(() => {
        setRefresh(refresh + 1);
        setSuccessPassword(false);
      }, 5000);
    } else {
      setFailPassword(true);
      setInterval(() => {
        setFailPassword(false);
      }, 3000);
    }
  };

  const changePersonalInfo = async values => {
    try {
      const {fullName, email, phoneNumber} = values;
      const splitName = fullName.split(' ');
      await http(token).patch('/profile', {
        firstName: splitName[0],
        lastName: splitName[1],
        email,
        phoneNumber,
      });
      setSuccessProfile(true);
      setInterval(() => {
        setRefresh(refresh + 1);
        setSuccessProfile(false);
      }, 5000);
    } catch (err) {
      setFailProfile(true);
      setInterval(() => {
        setFailProfile(false);
      }, 3000);
    }
  };

  const getImageProfile = async () => {
    const data = await launchImageLibrary();
    setAvatar(data.assets[0]);
  };

  const uploadImage = async () => {
    // file size limit 2MB
    if (avatar.fileSize > 2000000) {
      setUploadAlert('File size is too big!');
      return false;
    }
    // file type limit
    if (avatar.type !== 'image/png' && avatar.type !== 'image/jpeg') {
      setUploadAlert('File type is not supported!');
      return false;
    }
    try {
      const formData = new FormData();
      formData.append('picture', avatar.uri);
      await http(token).patch(`/profile/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (profile.avatar) {
        setAvatar('');
        setUploadSuccess('Upload Success!');
        setRefresh(refresh + 1);
      }
      setInterval(() => {
        setUploadSuccess('');
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
            backgroundColor="white"
            paddingTop="10px"
            paddingX="5%">
            <HStack justifyContent="space-evenly" alignItems="center">
              <Text
                fontSize="17px"
                color="orange.300"
                borderBottomWidth={3}
                paddingBottom="5px"
                borderBottomColor="orange.300">
                Detail Account
              </Text>
              <Text
                onPress={() => navigation.navigate('History')}
                fontSize="17px"
                color="gray.500"
                borderBottomWidth={3}
                paddingBottom="5px"
                borderBottomColor="gray.500">
                Order History
              </Text>
            </HStack>
          </View>
          <Text fontSize="20px" marginBottom="20px" marginTop="10%">
            Detail Account
          </Text>
          <Box backgroundColor="white" padding="30px" borderRadius="8px">
            <Text color="gray.500" marginBottom="10px">
              INFO
            </Text>
            <Box
              width="53%"
              height="150px"
              borderColor="gray.300"
              borderWidth="1px"
              borderRadius="full"
              marginX="auto">
              {avatar !== '' ? (
                <Image
                  source={{uri: avatar.uri}}
                  alt=""
                  width="100%"
                  height="100%"
                  borderRadius="full"
                />
              ) : (
                <Image
                  source={{uri: profile.avatar}}
                  alt=""
                  width="100%"
                  height="100%"
                  borderRadius="full"
                />
              )}
            </Box>
            {uploadAlert !== '' ? (
              <Text
                onPress={getImageProfile}
                textAlign="center"
                fontSize={18}
                color="red.600">
                {uploadAlert}
              </Text>
            ) : (
              <></>
            )}
            {uploadSuccess !== '' ? (
              <Text
                onPress={getImageProfile}
                textAlign="center"
                fontSize={18}
                color="green.600">
                {uploadSuccess}
              </Text>
            ) : (
              <></>
            )}
            <Text
              onPress={getImageProfile}
              textAlign="center"
              color="orange.600"
              textDecorationLine="underline">
              upload ?
            </Text>
            {avatar && (
              <Pressable onPress={uploadImage}>
                <Box
                  width="50%"
                  mx="auto"
                  textAlign="center"
                  borderRadius={10}
                  py={1}
                  backgroundColor="green.600"
                  my={2}>
                  <Text textAlign="center" color="white">
                    save image
                  </Text>
                </Box>
              </Pressable>
            )}
            <Text fontSize="20px" marginBottom="5px" textAlign="center">
              {profile.firstName} {profile.lastName}
            </Text>
            <Text fontSize="16px" color="gray.500" textAlign="center">
              {profile.statusUser}
            </Text>
            <View
              height="1px"
              backgroundColor="gray.400"
              marginX="-30px"
              marginY="10px"
            />
            <Button
              backgroundColor="orange.400"
              borderRadius="10px"
              onPress={logoutAction}>
              Logout
            </Button>
          </Box>
          <Text fontSize="20px" marginBottom="20px" marginTop="10%">
            Personal Info
          </Text>
          <Formik
            // validationSchema={validationSchemas}
            onSubmit={e => changePersonalInfo(e)}
            initialValues={{
              fullName: profile.firstName + profile.lastName,
              phoneNumber: profile.phoneNumber,
              email: profile.email,
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => {
              return (
                <>
                  <Box
                    backgroundColor="white"
                    padding="30px"
                    borderRadius="8px">
                    <Text marginBottom="5px" fontSize="17px" color="gray.500">
                      Details Information
                    </Text>
                    <View
                      height="2px"
                      backgroundColor="gray.400"
                      marginBottom="20px"
                      marginX="-30px"
                    />
                    <FormControl
                      marginBottom={2}
                      isInvalid={errors.fullName ? true : false}>
                      <Box>Full Name :</Box>
                      <Input
                        fontSize="13px"
                        type="text"
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        placeholder="Type your full name"
                        defaultValue={`${profile.firstName} ${profile.lastName}`}
                        value={values.fullName}
                      />
                      {errors.fullName && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.fullName}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      marginBottom={2}
                      isInvalid={errors.phoneNumber ? true : false}>
                      <Box>Phone Number :</Box>
                      <Input
                        fontSize="13px"
                        type="text"
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        placeholder="Type your phone number"
                        defaultValue={profile.phoneNumber}
                        value={values.phoneNumber}
                      />
                      {errors.phoneNumber && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.phoneNumber}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      marginBottom={2}
                      isInvalid={errors.email ? true : false}>
                      <Box>Email :</Box>
                      <Input
                        fontSize="13px"
                        type="email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        placeholder="Type your email"
                        defaultValue={profile.email}
                        value={values.email}
                      />
                      {errors.email && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}>
                          {errors.email}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                    {isSuccessProfile && (
                      <Text color="green.600" textAlign="center" mt={3}>
                        Changes Profile is Success !
                      </Text>
                    )}
                    {isFailProfile && (
                      <Text color="red.600" textAlign="center" mt={3}>
                        Error Changes
                      </Text>
                    )}
                  </Box>
                  <Button
                    onPress={handleSubmit}
                    backgroundColor="orange.400"
                    borderRadius="10px"
                    marginY="20px">
                    Updated Changes
                  </Button>
                </>
              );
            }}
          </Formik>
          <Formik
            validationSchema={validationPassword}
            onSubmit={setPassword}
            initialValues={{
              password: '',
              confirmPassword: '',
            }}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <>
                <Box backgroundColor="white" padding="30px" borderRadius="8px">
                  <Text marginBottom="5px" fontSize="17px" color="gray.500">
                    Account and Privacy
                  </Text>
                  <View
                    height="2px"
                    backgroundColor="gray.400"
                    marginBottom="20px"
                    marginX="-30px"
                  />
                  <FormControl
                    marginBottom={2}
                    isInvalid={errors.password ? true : false}>
                    <Box>New Password :</Box>
                    <Input
                      fontSize="13px"
                      type="password"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Type your new password"
                      value={values.password}
                    />
                    {errors.password && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.password}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    marginBottom={2}
                    isInvalid={errors.confirmPassword ? true : false}>
                    <Box>Confirm Password :</Box>
                    <Input
                      fontSize="13px"
                      type="password"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      placeholder="Type your confirm password"
                      value={values.confirmPassword}
                    />
                    {errors.confirmPassword && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}>
                        {errors.confirmPassword}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>
                  {isSuccessPassword && (
                    <Text color="green.600" textAlign="center" mt={3}>
                      Changes Password is Success !
                    </Text>
                  )}
                  {isFailPassword && (
                    <Text color="red.600" textAlign="center" mt={3}>
                      Confirm password not match !
                    </Text>
                  )}
                </Box>
                <Button
                  onPress={handleSubmit}
                  backgroundColor="orange.400"
                  borderRadius="10px"
                  marginY="20px">
                  Updated Changes Password
                </Button>
              </>
            )}
          </Formik>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};
export default Profile;
