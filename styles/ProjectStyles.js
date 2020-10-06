import { StyleSheet } from 'react-native';

const color = {
  primary: '',
  secondary: '',
  third: '',
  fourth: '',
  fifth: '',
};

const activityScreen = StyleSheet.create({
  topView: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    height: 180,
    width: '100%',
    backgroundColor: 'grey',
  },
  topTitle: {
    color: 'white',
    top: 50,
    fontSize: 48,
    lineHeight: 48 * 1.2,
  },
  form: {
    margin: 2,
  },
  picker: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  card: {
    backgroundColor: '#62B1F6',
    flex: 1,
    flexDirection: 'column',
  },
  cardbody: {
    flex: 1,
    flexDirection: 'row',
  },
  cardTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardVariableTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  buttonStyle: {
    margin: 2,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
});

const floorBallScreen = StyleSheet.create({
  topView: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
    height: 180,
    width: '100%',
    backgroundColor: 'grey',
  },
  topTitle: {
    color: 'white',
    top: 50,
    fontSize: 48,
    lineHeight: 48 * 1.2,
  },
  form: {
    margin: 2,
  },
  picker: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
  },
  card: {
    backgroundColor: '#62B1F6',
    flex: 1,
    flexDirection: 'column',
  },
  cardbody: {
    flex: 1,
    flexDirection: 'row',
  },
  cardTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardVariableTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  buttonStyle: {
    margin: 2,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
  buttonsign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 50,
  },
  buttonwho: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 50,
  },
  roundedtextbox: {
    margin: 10,
    backgroundColor: 'gainsboro',
    borderRadius: 10,
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    backgroundColor: '#abc',
    marginVertical: 5,
  },
  flatliststyle: {
    borderColor: 'black',
    borderWidth: 2,
    height: '100%',
    width: '80%',
    flex: 5,
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

export { activityScreen, homeScreen, floorBallScreen };
