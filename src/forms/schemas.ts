import * as yup from 'yup';

export const addTodoSchema = yup.object().shape({
  title: yup
    .string()
    .required('Please enter your todo')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  password: yup
    .string()
    .required('Password is required')
    .max(12, 'The field should be less than or equal to 12 symbols ')
    .min(5, 'This field should contain at least 5 symbols'),
});

export const signUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter first name')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols')
    .matches(
      /^[а-яA-яa-zA-Z-\s]*$/,
      'Please enter only letters of the alphabet, hyphen (-) and spaces',
    ),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required')
    .max(50, 'The field should be less than or equal to 50 symbols ')
    .min(2, 'This field should contain at least 2 symbols'),
  password: yup
    .string()
    .required('Password is required')
    .max(12, 'The field should be less than or equal to 12 symbols ')
    .min(5, 'This field should contain at least 5 symbols'),
  age: yup.number(),
});
