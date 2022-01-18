import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const name = await AsyncStorage.getItem('name');
    const email = await AsyncStorage.getItem('email');

    setEmail(email);
    setName(name);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('email');
    navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="account-circle" style={{marginRight: 10}} size={90} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <Text style={styles.logout} onPress={handleLogout}>
        Logout
      </Text>
    </View>
  );
};
