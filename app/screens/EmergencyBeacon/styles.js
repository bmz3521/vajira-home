import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;
import { BaseColor } from '@config';

export default StyleSheet.create({
  hoveringBackButton: {
    top: 0,
    fontSize: 30,
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    zIndex: 100,
  },
  contain: {
    elevation: 20,
    zIndex: 20,
    top: 20,
    height: 45,
    flexDirection: 'row',
    position: 'absolute',
  },
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,

    elevation: 10,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#f9fafb',
    width: '80%',
    borderRadius: 5,
  },
  modalHeader: {},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    color: '#000',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  modalBody: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: '#fff',
  },
  circle: {
    backgroundColor: 'orange',
    width: 130,
    height: 130,
    borderRadius: 100,
    position: 'absolute',
  },
  circleGreen: {
    backgroundColor: 'green',
    width: 130,
    height: 130,
    borderRadius: 100,
    position: 'absolute',
  },
  section1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.18,
  },
  section2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.32,
  },
  section3: {
    flex: 0.15,
    alignItems: 'center',
  },
  section4: {
    flex: 0.35,
    alignItems: 'center',
  },
  header: {
    color: '#5c9cff',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
  label: {
    color: '#adb0b0',
    marginLeft: 100,
    marginRight: 100,
  },
  timeText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 0,
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 10,
    width: '95%',
  },
  map: {
    flex: 1,
    zIndex: -1,
    elevation: -1,
  },
  mapMarkerContainer: {
    elevation: 1,
    zIndex: 1,
    left: '47%',
    flex: 1,

    // position: 'absolute',
  },
  mapMarker: {
    fontSize: 40,
    color: 'red',
  },
  deatilSection: {
    alignSelf: 'center',
    bottom: '0%',
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    flex: 0.9,
    padding: 70,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: Dimensions.get('window').width - 20,
    position: 'absolute',
    bottom: 100,
    left: 10,
  },
  add: {
    width: '80%',
    height: 50,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 100,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonTextAdd: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
