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
  topContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    elevation: 3,
    paddingHorizontal: 20,
  },
  topBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  signInGradient: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 6,
    flex: 1,
    marginHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonConfirmContainer: {
    width: '100%',
    marginVertical: 10,
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
  buttonText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: '#FFFFFF',
  },
  presListTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 20,
    color: '#40424B',
  },
  presListHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  presName: {
    flex: 1,
    color: '#40424B',
    marginRight: 5,
  },
  instructions: {
    marginLeft: 20,
    marginBottom: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    //     backgroundColor: '#CC4344',
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textConfirm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  textCancel: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  modalSuccessTitle: {
    marginBottom: 15,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
  },
  modalFailTitle: {
    marginBottom: 15,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
  },
});
