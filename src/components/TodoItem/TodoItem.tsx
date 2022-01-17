import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TodoItemProps} from '..';
import {styles} from './styles';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {colors} from '../../constants';
import {useMutation} from '@apollo/client';
import {UPDATE_TODO} from '../../graphql';

export const TodoItem: React.FC<TodoItemProps> = ({title, isComplete, id}) => {
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [loading, setLoading] = useState(false);

  const handleChange = async () => {
    setLoading(true);
    await updateTodo({
      variables: {
        todo: id,
        isComplete: !isComplete,
        name: title,
      },
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <BouncyCheckbox
        disabled={loading}
        isChecked={isComplete}
        onPress={handleChange}
        fillColor={loading ? colors.gray : colors.red}
      />
    </View>
  );
};
