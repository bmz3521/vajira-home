import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor, BaseStyle } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  imageBlockView: {
    backgroundColor: BaseColor.whiteColor,
  },
  messageBlockView: {
    flexDirection: 'row',
    backgroundColor: BaseColor.whiteColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  buttonBlockView: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  blockView: {
    flexDirection: 'row',
    borderBottomColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    borderBottomWidth: 2,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
  },
  stretch: {
    flex: 1,
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    borderLeftWidth: 0.5,
  },
  colFirstChild: {
    flexDirection: 'column',
    flex: 1,
  },
  leftView: {
    flex: 2,
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 0,
  },
  fullImage: {
    width: '100%',
    height: Utils.scaleWithPixel(192),
  },
});
