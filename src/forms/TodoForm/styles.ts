import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.red,
    padding: 11,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
