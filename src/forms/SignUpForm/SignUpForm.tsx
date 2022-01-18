import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Button, TextInput} from 'react-native-paper';
import {colors} from '../../constants';
import {signUpSchema} from '../schemas';
import {SignInFormProps} from '..';

export const SignUpForm: React.FC<SignInFormProps> = ({
  handleLogin,
  loading,
}) => {
  return (
    <Formik
      validationSchema={signUpSchema}
      initialValues={{
        email: '',
        password: '',
        firstName: '',
        age: '',
      }}
      onSubmit={values => {
        handleLogin(values.email, values.password, values.firstName);
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
          <View style={styles.input}>
            <TextInput
              value={values.firstName}
              activeOutlineColor={colors.red}
              mode="outlined"
              label="First Name *"
              error={!errors.firstName}
              onFocus={() => setFieldTouched('firstName', false)}
              onBlur={() => setFieldTouched('firstName', true)}
              placeholder="Enter your first name"
              onChangeText={handleChange('firstName')}
            />
            {errors.firstName && touched.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
          </View>
          <View style={styles.input}>
            <TextInput
              value={values.email}
              activeOutlineColor={colors.red}
              mode="outlined"
              label="Email Address *"
              error={!errors.email}
              onFocus={() => setFieldTouched('email', false)}
              onBlur={() => setFieldTouched('email', true)}
              placeholder="Enter your email address"
              onChangeText={handleChange('email')}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
          </View>
          <View style={styles.input}>
            <TextInput
              value={values.password}
              activeOutlineColor={colors.red}
              mode="outlined"
              label="Password *"
              error={!errors.password}
              onFocus={() => setFieldTouched('password', false)}
              onBlur={() => setFieldTouched('password', true)}
              placeholder="Enter your password"
              onChangeText={handleChange('password')}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
          <View style={styles.input}>
            <TextInput
              value={values.age}
              activeOutlineColor={colors.red}
              mode="outlined"
              label="Age"
              error={!errors.email}
              onFocus={() => setFieldTouched('age', false)}
              onBlur={() => setFieldTouched('age', true)}
              placeholder="Enter your age"
              onChangeText={handleChange('age')}
            />
            {errors.age && touched.age && (
              <Text style={styles.error}>{errors.age}</Text>
            )}
          </View>

          <Button
            disabled={loading}
            loading={loading}
            onPress={handleSubmit}
            color={colors.red}
            mode="contained">
            Sign Up
          </Button>
        </View>
      )}
    </Formik>
  );
};
