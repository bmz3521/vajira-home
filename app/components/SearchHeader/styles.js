import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    height: Utils.scaleWithPixel(45),
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  center: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLeft: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  contentCenter: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  contentRight: {
    paddingLeft: 10,
    paddingRight: 20,
  },
  contentRightSecond: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: BaseColor.grayColor,
    borderRadius: 4,
  },
  icon: {
    marginTop: 5,
    marginHorizontal: 5,
    padding: 5,
    color: BaseColor.grayColor,
  },
  input: {
    padding: 5,
    flex: 1,
  },
  autocompleteContainer: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: Utils.scaleWithPixel(35),
    zIndex: 1,
  },
  item: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#aaa',
    padding: 5,
    backgroundColor: BaseColor.whiteColor,
  },
});
