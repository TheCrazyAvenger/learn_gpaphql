import {StyleSheet} from 'react-native';

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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  noData: {
    marginTop: 100,
    alignSelf: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 20,
  },
  searchbar: {
    width: '75%',
  },
});
