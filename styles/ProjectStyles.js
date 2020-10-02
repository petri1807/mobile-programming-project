import { StyleSheet } from 'react-native';

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

export { activityscreen };
