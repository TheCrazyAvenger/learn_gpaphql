import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {TodoItem} from '../../components';
import {styles} from './styles';
import {TodoForm} from '../../forms';
import {useCreateTodoItem, useTodoItems} from '../../hooks';

export const DashboardScreen: React.FC = () => {
  const {createTodo} = useCreateTodoItem();
  const {data, loading} = useTodoItems();

  const handleCreateTodo = (title: string) => {
    createTodo({
      variables: {
        userId: 1,
        isComplete: false,
        name: title,
      },
    });
  };

  if (!data || loading) {
    return <ActivityIndicator style={{flex: 1}} />;
  }

  return (
    <View style={styles.container}>
      <TodoForm createTodo={handleCreateTodo} />
      <Text style={styles.title}>Your plans</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.todos.map((todo: any) => (
          <TodoItem
            title={todo.name}
            isComplete={todo.isComplete}
            key={todo.id}
            id={todo.id}
          />
        ))}
      </ScrollView>
    </View>
  );
};
