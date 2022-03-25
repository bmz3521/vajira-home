import { Dimensions, Platform } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// console.log('width', deviceWidth)
// console.log('height', deviceHeight)

export default {
  container: { flex: 1 },
  content: {
    padding: 15,
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  imageView: { flex: 2, justifyContent: 'flex-end', alignItems: 'center' },
  avatar: {
    width: deviceHeight / 5,
    height: deviceHeight / 5,
    borderWidth: 5,
    borderRadius: deviceHeight / 10,
    margin: 10,
  },
  titleText: { fontSize: deviceHeight / 45, color: '#fff' },

  subTitleView: { flex: 1.5, alignItems: 'center', justifyContent: 'center' },
  subTitleHead: { fontSize: deviceHeight / 45, color: '#5C9CFF' },
  subTitleBold: {
    fontSize: deviceHeight / 34,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subTitleText: {
    fontSize: deviceHeight / 45,
    color: '#FFF',
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
  },

  durationView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  incomingView: { flex: 1, alignItems: 'center' },
  callText: { fontSize: deviceHeight / 45, color: '#fff', top: 25 },

  backgroundImage: {
    backgroundColor: '#575757',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 0,
  },

  btnView: { flex: 1, flexDirection: 'row' },
  btn: {
    alignItems: 'center',
    width: deviceHeight / 9.5,
    height: deviceHeight / 9.5,
    borderRadius: deviceHeight / 19,
    justifyContent: 'center',
  },
  iconSize: deviceHeight / 19,
};
