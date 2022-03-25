import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textInput: {
    width: 350,
    height: 350,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    padding: 10,
  },

  thumb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 20,
    width: '100%',
    paddingTop: 20,
    marginBottom: 20,
  },
});
