import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {Searchbar, ToggleButton} from 'react-native-paper';
import {TodoItem} from '../../components';
import {styles} from './styles';
import {TodoForm} from '../../forms';
import {useCreateTodoItem, useTodoItems} from '../../hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';

export const DashboardScreen: React.FC = () => {
  const [takeStatus, setTakeStatus] = useState('');
  const [filter, setFilter] = useState('');
  const route: any = useRoute();

  const {id} = route.params;

  const {createTodo} = useCreateTodoItem();
  const {data, loading} = useTodoItems({takeStatus, userId: id, filter});

  const handleCreateTodo = async (title: string) => {
    const id = await AsyncStorage.getItem('id');
    createTodo({
      variables: {
        userId: id,
        isComplete: false,
        name: title,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add todo</Text>
      <TodoForm createTodo={handleCreateTodo} />
      <Text style={styles.title}>Your todos</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!data || loading ? (
          <ActivityIndicator style={{marginTop: 150}} />
        ) : data.todos.length === 0 ? (
          <>
            <Icon name="application" style={styles.noData} size={100} />
            <Text style={styles.noDataText}>Empty</Text>
          </>
        ) : (
          data.todos
            .reverse()
            .map((todo: any) => (
              <TodoItem
                takeStatus={takeStatus}
                title={todo.name}
                isComplete={todo.isComplete}
                key={todo.id}
                id={todo.id}
              />
            ))
        )}
      </ScrollView>
      <View style={styles.filters}>
        <View style={styles.searchbar}>
          <Searchbar
            value={filter}
            onChangeText={value => setFilter(value)}
            placeholder="Search for todos"
          />
        </View>
        <ToggleButton.Row
          onValueChange={value => setTakeStatus(value)}
          value={takeStatus}>
          <ToggleButton icon="check-circle" value="complete" />
          <ToggleButton icon="circle-outline" value="incomplete" />
        </ToggleButton.Row>
      </View>
    </View>
  );
};
