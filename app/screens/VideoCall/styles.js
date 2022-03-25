import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
  },
  optionChat: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 0,
    top: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsTop: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 0,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {},
  buttonText: {
    color: 'black',
    textAlign: 'center',
  },
  callWrapper: {
    flexGrow: 1,
  },
  localVideo: {
    position: 'absolute',
    right: 5,
    bottom: 100,
    width: window.width / 4,
    height: window.height / 5,
  },
  remoteGrid: {
    flex: 1,
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  remoteVideo: {
    width: window.width,
    height: window.height / 3,
  },
  remoteVideoVertical: {
    width: window.width,
    height: window.height,
  },
  Small: {
    backgroundColor: '#00000050',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleSmall: {
    backgroundColor: '#17B87B',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 12,
  },
  greenIcon: {
    color: '#fff',
    fontSize: 22,
  },
  greenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  switchVertical: {
    position: 'absolute',
    paddingHorizontal: 20,
    left: 20,
    top: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
