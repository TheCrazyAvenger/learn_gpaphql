import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../constants';
import {SignInForm} from '../../forms';
import {useLoginMutation} from '../../hooks';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const {doLogin, data, error, loading} = useLoginMutation();

  const handleLogin = async (email: string, password: string) => {
    try {
      await doLogin({
        variables: {email, password},
      });

      const {firstName, email: userEmail, id} = data.login;

      await AsyncStorage.setItem('name', firstName);
      await AsyncStorage.setItem('email', userEmail);
      await AsyncStorage.setItem('id', id);
      navigation.pop();
    } catch {
      // console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.lock}>
          <Icon name="lock-open" color={colors.white} size={45} />
        </View>
      </View>
      <Text style={styles.title}>Sign In</Text>
      {error && <Text style={styles.error}>{error.message}</Text>}
      <SignInForm handleLogin={handleLogin} loading={loading} />
    </View>
  );
};
