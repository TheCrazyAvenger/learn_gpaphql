import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 20,
    paddingRight: 5,
    marginHorizontal: 10,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
