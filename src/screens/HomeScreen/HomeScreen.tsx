import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTodoItems} from '../../hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoItem} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../constants';

export const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  const {data, loading} = useTodoItems({takeStatus: null, userId: id});

  useEffect(() => {
    checkIsLogin();
  }, []);

  const checkIsLogin = async () => {
    const name = await AsyncStorage.getItem('name');
    const id = await AsyncStorage.getItem('id');

    setName(name);
    setId(id);

    setIsLogin(name ? true : false);
  };

  const handleDashboard = () =>
    navigation.navigate(Screens.dashboardScreen, {id});

  return (
    <View style={styles.container}>
      {isLogin && (
        <>
          <Text style={styles.title}>Hi, {name}</Text>
          <View style={styles.card}>
            <Text style={styles.title}>Dashboard</Text>
            {!data || loading ? (
              <ActivityIndicator />
            ) : data.todos.length === 0 ? (
              <>
                <Icon name="application" style={styles.noData} size={100} />
                <Text style={styles.noDataText} onPress={handleDashboard}>
                  Empty. Add new todo
                </Text>
              </>
            ) : (
              <>
                {data.todos
                  .reverse()
                  .splice(0, 3)
                  .map((todo: any) => (
                    <TodoItem
                      takeStatus={null}
                      title={todo.name}
                      isComplete={todo.isComplete}
                      key={todo.id}
                      id={todo.id}
                    />
                  ))}
                <Text style={styles.viewMoreButton} onPress={handleDashboard}>
                  View more
                </Text>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};
