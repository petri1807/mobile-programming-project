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
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
  },
  cardbody: {
    flex: 1,
    flexDirection: 'row',
  },
  cardTextStyle: {
    fontSize: 18,
    color: '#333333',
  },
  cardVariableTextStyle: {
    fontSize: 18,
    color: '#333333',
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
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 75,
  },
  buttonwho: {
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 70,
  },
  roundedtextbox: {
    margin: 2,
    backgroundColor: 'gainsboro',
    borderRadius: 10,
  },
  listItemStyle: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'gainsboro',
    marginVertical: 5,
  },
  flatliststyle: {
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 25,
    height: '100%',
    width: '80%',
    flex: 5,
  },
  modalStyle: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dialogStyle: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const homeScreen = StyleSheet.create({
  pageLayout: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  announcementBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  cardContainer: {
    zIndex: -1,
  },
  card: {
    padding: 0,
  },
  header: {
    backgroundColor: '#f1f1f1',
    borderColor: 'orange',
    borderWidth: 2,
  },
  content: {
    zIndex: 3,
    backgroundColor: 'white',
  },
  title: {
    padding: 15,
    fontSize: 20,
    fontWeight: 'normal',
  },
});

const calendarScreen = StyleSheet.create({
  calendar: {
    // marginBottom: 10,
    flex: 1,
    marginTop: 30,
  },
  keyboardstyle: {
    zIndex: 1,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
  },
  itemCardTopic: {
    fontWeight: 'bold',
  },
});

const loginScreen = StyleSheet.create({
  title: {
    padding: 15,
    fontSize: 20,
    fontWeight: 'normal',
  },
  buttonStyle: {
    margin: 2,
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
  },
});

export {
  activityScreen,
  homeScreen,
  calendarScreen,
  floorBallScreen,
  loginScreen,
};
