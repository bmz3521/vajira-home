import { StyleSheet, Platform } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
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
    marginHorizontal: 20,
  },
  display: {
    width: '100%',
    height: 250,
  },
  signInGradient: {
    borderRadius: 18,
  },
  button: {
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  presListTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  presListHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  presName: {
    flex: 1,
    marginRight: 3,
  },
  instructions: {
    marginLeft: 20,
    marginBottom: 5,
  },
  titleIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#40424B',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#40424B',
  },
  buttonGreenIcon: {
    width: 40,
    height: 40,
  },
  modalButtonContainer: {
    flexDirection: 'column',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  modalRowContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 10,
  },
  add: {
    width: '100%',
    height: 50,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 100,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  okIcon: {
    color: '#0AB678',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#CC4343',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#CC4343',
    marginBottom: 10,
    textAlign: 'center',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  buttonTextAdd: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(173, 173, 173, .6)',
  },
  modalView: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  okIcon: {
    color: '#0AB678',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    color: '#CC4343',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#CC4343',
    marginBottom: 10,
    textAlign: 'center',
    shadowColor: '#c0c0c0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  modalButton: {
    flex: 1,
    width: '100%',
    height: 50,
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 100,
    padding: 12,
    borderRadius: 20,
    alignSelf: 'center',
  },
  modalFailTitle: {
    marginBottom: 15,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalSuccessTitle: {
    marginBottom: 15,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textConfirm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
