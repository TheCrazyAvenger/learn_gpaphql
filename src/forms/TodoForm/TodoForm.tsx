import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoFormProps} from '..';

export const TodoForm: React.FC<TodoFormProps> = ({createTodo}) => {
  return (
    <Formik
      initialValues={{
        title: '',
      }}
      onSubmit={(values, {resetForm}) => {
        createTodo(values.title);
        resetForm();
      }}>
      {({
        handleSubmit,
        setFieldTouched,
        handleChange,
        errors,
        touched,
        values,
      }) => (
        <View style={styles.container}>
          <TextInput
            value={values.title}
            style={{width: '80%'}}
            activeOutlineColor={colors.red}
            mode="outlined"
            error={!errors.title}
            onFocus={() => setFieldTouched('title', false)}
            onBlur={() => setFieldTouched('title', true)}
            placeholder="What do you want to do?"
            onChangeText={handleChange('title')}
          />

          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
            activeOpacity={0.7}
            style={styles.addButton}>
            <Icon name="add" color={colors.white} size={37} />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
