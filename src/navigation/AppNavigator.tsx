import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, Screens} from '../constants';
import {
  DashboardScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
  SignUpScreen,
} from '../screens';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  const navigation: any = useNavigation();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkIsLogin();
  }, []);

  const checkIsLogin = async () => {
    //  await AsyncStorage.removeItem('name');
    //  await AsyncStorage.removeItem('email');
    const name = await AsyncStorage.getItem('name');

    setIsLogin(name ? true : false);
  };

  const handleLogin = () =>
    navigation.navigate(isLogin ? Screens.profileScreen : Screens.loginScreen);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.red,
        },
        headerTitleStyle: {
          color: colors.white,
        },
        headerTitleAlign: 'center',
        headerBackTitleStyle: {
          color: colors.white,
        },
      }}
      initialRouteName={
        !isLogin ? Screens.homeScreen : Screens.dashboardScreen
      }>
      <Stack.Screen
        options={{
          title: 'ToDo',
          headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity onPress={handleLogin}>
              <Icon
                name={isLogin ? 'account-circle' : 'login'}
                size={30}
                color={colors.white}
                style={{marginRight: 15}}
              />
            </TouchableOpacity>
          ),
        }}
        name={Screens.homeScreen}
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          title: 'Dashboard',
        }}
        name={Screens.dashboardScreen}
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{
          title: 'Sign In',
        }}
        name={Screens.loginScreen}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          title: 'Sign Up',
        }}
        name={Screens.signUpScreen}
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{
          title: 'Profile',
        }}
        name={Screens.profileScreen}
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
