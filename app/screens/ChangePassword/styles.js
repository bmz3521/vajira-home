import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
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
