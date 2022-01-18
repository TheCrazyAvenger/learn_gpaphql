import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.red,
    padding: 11,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: colors.red,
    marginTop: 5,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
