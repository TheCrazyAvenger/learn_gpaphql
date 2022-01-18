import {Formik} from 'formik';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoFormProps} from '..';
import {addTodoSchema} from '../schemas';

export const TodoForm: React.FC<TodoFormProps> = ({createTodo}) => {
  return (
    <Formik
      validationSchema={addTodoSchema}
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
          <View style={{width: '80%'}}>
            <TextInput
              value={values.title}
              activeOutlineColor={colors.red}
              mode="outlined"
              error={!errors.title}
              onFocus={() => setFieldTouched('title', false)}
              onBlur={() => setFieldTouched('title', true)}
              placeholder="What do you want to do?"
              onChangeText={handleChange('title')}
            />
            {errors.title && touched.title && (
              <Text style={styles.error}>{errors.title}</Text>
            )}
          </View>

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
