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
    alignItems: 'center',
  },
  lock: {
    backgroundColor: colors.gray,
    borderRadius: 50,
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  error: {
    color: colors.red,
    marginLeft: 10,
  },
});
