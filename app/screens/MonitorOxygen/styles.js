import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 20,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  rightContainer: {
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  above: {
    fontWeight: 'bold',
    color: '#0AB678',
  },
  normal: {
    fontWeight: 'bold',
    color: '#E6B285',
  },
  below: {
    fontWeight: 'bold',
    color: '#CC4343',
  },
  row: {
    flexDirection: 'row',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    marginHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'space-evenly',
    padding: 5,
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 2,
  },
  boxContainerWithBorder: {
    justifyContent: 'flex-start',
    borderRightWidth: 1,
    borderColor: '#C4C4C4',
    paddingRight: 5,
  },
  tabText: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  tabValue: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  tabMeasure: {
    fontSize: 8,
    lineHeight: 25,
    fontWeight: 'normal',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 100,
  },
  info: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5,
  },
  infoText: {
    color: '#095394',
  },
  listContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
    marginRight: 10,
  },
  leftText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightText: {
    color: '#095394',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftValue: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#535353',
  },
  leftMeasurement: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#535353',
  },
  result: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lineContainer: {
    marginVertical: 3,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#E5E5E5',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  add: {
    flex: 1,
    width: '100%',
    height: 50,
    marginTop: 10,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateAndActivity: {
    flex: 1,
    marginRight: 10,
  },
  resultAndDelete: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 237, 208, .6)',
  },
  modalView: {
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  okIcon: {
    color: '#0AB678',
    textAlign: 'center',
    marginBottom: 10,
  },
  add: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonTextAdd: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  buttonTextDelete: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 2,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#CC4343',
    marginBottom: 10,
    textAlign: 'center',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#CC4343',
    textAlign: 'center',
  },
});

export default styles;
