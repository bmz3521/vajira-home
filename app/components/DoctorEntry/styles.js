import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor, BaseStyle } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  content: {
    width: Utils.scaleWithPixel(120),
    height: Utils.scaleWithPixel(160),
  },
  image: {
    margin: 10,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    flex: 1,
    alignSelf: 'stretch',
  },
  text: {
    left: 0,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: BaseColor.whiteColor,
    zIndex: 1,
  },
});
