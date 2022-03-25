import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalViewSuccess: {
    flex: 1,
    width: '100%',
    margin: 0,
    backgroundColor: 'white',
  },
  congratsContainer: {
    paddingTop: 100,
    height: '100%',
    alignItems: 'center',
  },
  modalSuccessTitle: {
    marginBottom: 10,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 26,
  },
  modalSubtitle: {
    marginBottom: 15,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  thankyouContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 20,
    paddingTop: 20,
  },
  openButton: {
    backgroundColor: '#CC4344',
    marginTop: 15,
    borderRadius: 22,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 25,
    fontSize: 18,
    justifyContent: 'center',
  },
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textInput: {
    height: 46,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    width: '100%',
    backgroundColor: '#F5F5F5',
  },
  borderStyleBase: {
    width: 40,
    height: 45,
  },
  borderStyleHighLighted: {
    borderColor: '#9e9e9e',
  },
  underlineStyleBase: {
    width: 40,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#9e9e9e',
    color: '#000000',
    fontSize: 24,
  },
  underlineStyleHighLighted: {
    borderColor: '#5d5d5d',
  },
});
