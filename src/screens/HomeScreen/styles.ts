import {StyleSheet} from 'react-native';
import {colors} from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.white,
    padding: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  viewMoreButton: {
    textAlign: 'center',
    color: colors.red,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  noData: {
    marginTop: 10,
    alignSelf: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});
