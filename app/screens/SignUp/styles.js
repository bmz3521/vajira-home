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
});
