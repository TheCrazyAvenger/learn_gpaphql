import {Formik} from 'formik';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {TextInput} from 'react-native-paper';
import {colors} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoEditFormProps} from '..';
import {addTodoSchema} from '../schemas';

export const TodoEditForm: React.FC<TodoEditFormProps> = ({
  updateTodo,
  title,
  loading,
  setIsEditing,
}) => {
  return (
    <Formik
      validationSchema={addTodoSchema}
      initialValues={{
        title,
      }}
      onSubmit={values => {
        updateTodo(values.title);
        setIsEditing(false);
      }}>
      {({
        handleSubmit,
        setFieldTouched,
        handleChange,
        errors,
        touched,
        values,
      }) => (
        <>
          <View style={{width: '73%'}}>
            <TextInput
              value={values.title}
              activeOutlineColor={colors.red}
              mode="outlined"
              disabled={loading}
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

          <View style={styles.buttons}>
            <TouchableOpacity disabled={loading} onPress={handleSubmit}>
              <Icon
                name="done"
                style={{marginRight: 10}}
                color={loading ? colors.gray : colors.green}
                size={30}
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={loading} onPress={setIsEditing}>
              <Icon
                name="close"
                color={loading ? colors.gray : colors.red}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </Formik>
  );
};
