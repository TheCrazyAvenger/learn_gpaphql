import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TodoItemProps} from '..';
import {styles} from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../../constants';
import {useDeleteTodoItem, useUpdateTodoItem} from '../../hooks';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoEditForm} from '../../forms';

export const TodoItem: React.FC<TodoItemProps> = ({
  title,
  isComplete,
  id,
  takeStatus,
}) => {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {updateTodo} = useUpdateTodoItem();
  const {deleteTodo} = useDeleteTodoItem({
    takeStatus,
  });

  const handleChange = async () => {
    try {
      setLoading(true);
      await updateTodo({
        variables: {todo: id, isComplete: !isComplete, name: title},
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteTodo({
        variables: {todoId: id},
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleUpdate = async (title: string) => {
    try {
      setLoading(true);
      await updateTodo({
        variables: {todo: id, isComplete, name: title},
      });
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.buttons}>
            <BouncyCheckbox
              disabled={loading}
              isChecked={isComplete}
              onPress={handleChange}
              fillColor={loading ? colors.gray : colors.red}
            />
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Icon
                name="edit"
                style={{marginRight: 10}}
                color={loading ? colors.gray : colors.red}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Icon
                name="delete"
                color={loading ? colors.gray : colors.red}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TodoEditForm
          updateTodo={handleUpdate}
          title={title}
          setIsEditing={() => setIsEditing(false)}
          loading={loading}
        />
      )}
    </View>
  );
};
