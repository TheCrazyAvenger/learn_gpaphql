import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';
import {SignUpForm} from '../../forms';
import {useSignUp} from '../../hooks';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const SignUpScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const {doSignUp, data, error, loading} = useSignUp();

  const handleLogin = async (
    email: string,
    password: string,
    firstName: string,
  ) => {
    try {
      await doSignUp({
        variables: {email, password, firstName},
      });

      const {firstName: name, email: userEmail, id} = data.signUp;

      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', userEmail);
      await AsyncStorage.setItem('id', id);

      navigation.pop(2);
    } catch {
      // console.log(1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.lock}>
          <Icon name="lock-open" color={colors.white} size={45} />
        </View>
      </View>
      <Text style={styles.title}>Sign Up</Text>
      {error && <Text style={styles.error}>{error.message}</Text>}
      <SignUpForm handleLogin={handleLogin} loading={loading} />
    </View>
  );
};
