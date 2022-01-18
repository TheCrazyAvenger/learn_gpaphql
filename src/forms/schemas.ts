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
