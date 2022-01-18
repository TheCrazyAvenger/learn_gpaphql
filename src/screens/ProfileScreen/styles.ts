import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 15,
  },
  logout: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.red,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
