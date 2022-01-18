import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Button, TextInput} from 'react-native-paper';
import {colors, Screens} from '../../constants';
import {signInSchema} from '../schemas';
import {SignInFormProps} from '..';
import {useNavigation} from '@react-navigation/native';

export const SignInForm: React.FC<SignInFormProps> = ({
  handleLogin,
  loading,
}) => {
  const navigation: any = useNavigation();

  const handleSignUp = () => navigation.navigate(Screens.signUpScreen);

  return (
    <Formik
      validationSchema={signInSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => {
        handleLogin(values.email, values.password);
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

          <Button
            disabled={loading}
            loading={loading}
            onPress={handleSubmit}
            color={colors.red}
            mode="contained">
            Sign In
          </Button>

          <Text style={styles.signUp} onPress={handleSignUp}>
            Don't have an account? Sign Up
          </Text>
        </View>
      )}
    </Formik>
  );
};
