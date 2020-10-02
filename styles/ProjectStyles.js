import { StyleSheet } from 'react-native';

const color = {
  primary: '',
  secondary: '',
  third: '',
  fourth: '',
  fifth: '',
};

const activityscreen = StyleSheet.create({
  topView: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    height: 200,
    width: '100%',
    backgroundColor: 'grey',
  },
  topTitle: {
    color: 'white',
    top: 50,
    fontSize: 48,
    lineHeight: 48 * 1.2,
  },
  picker: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  card: {
    backgroundColor: '#4791db',
  },
  cardbody: {
    flex: 1,
    flexDirection: 'row',
  },
  cardTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

const homeScreen = StyleSheet.create({
  pageLayout: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#f1f1f1',
  },
  title: {
    padding: 15,
    fontSize: 20,
    fontWeight: 'normal',
  },
  cardIconBox: {
    justifyContent: 'flex-end',
  },
  cardIcon: {
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cardIconFont: {
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 5,
  },
});

export { activityscreen, homeScreen };
