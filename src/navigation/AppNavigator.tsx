import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {colors, Screens} from '../constants';
import {DashboardScreen, HomeScreen, LoginScreen} from '../screens';

const Stack = createStackNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          presentation: 'modal',
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
        }}>
        <Stack.Screen
          options={{
            title: 'Dashboard',
          }}
          name={Screens.dashboardScreen}
          component={DashboardScreen}
        />
        <Stack.Screen
          options={{
            title: 'ToDo',
          }}
          name={Screens.homeScreen}
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: 'Sign In',
          }}
          name={Screens.loginScreen}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
