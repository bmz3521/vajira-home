import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor, BaseStyle } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  centerView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: Utils.scaleWithPixel(64),
    height: Utils.scaleWithPixel(64),
    margin: 5,
  },
});
