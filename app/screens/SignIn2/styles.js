import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';

export default StyleSheet.create({
  textInput: {
    height: 56,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 28,
    marginTop: 10,
    padding: 10,
    width: '100%',
  },
  contain: {
    padding: 20,
    width: '100%',
  },
  default: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5c9cff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textDefault: {
    ...Typography.headline,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.semibold,
  },
  outline: {
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: BaseColor.primaryColor,
  },
  textOuline: {
    color: BaseColor.primaryColor,
  },
  full: {
    width: '100%',
  },
  round: {
    borderRadius: 28,
  },
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
  },
  signInGradient: {
    borderRadius: 18,
  },
  line: {
    backgroundColor: 'gray',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  lineText: {
    alignSelf: 'center',
    paddingHorizontal: 5,
    fontSize: 14,
  },
  kvcButton: {
    borderRadius: 18,
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    backgroundColor: '#fff',
    elevation: 4, // Android
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#CC4344',
    marginTop: 15,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    color: '#CC4344',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  modalText: {
    marginBottom: 3,
    textAlign: 'center',
  },
});
