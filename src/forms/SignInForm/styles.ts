import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: colors.red,
    padding: 11,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 15,
  },
  error: {
    color: colors.red,
    marginTop: 5,
  },
  signUp: {
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});
