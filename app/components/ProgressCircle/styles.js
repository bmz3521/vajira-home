import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    paddingBottom: 20,
  },
  content: {
    marginTop: 20,
    flexDirection: 'row',
  },
  image: {
    width: Utils.scaleWithPixel(30),
    height: Utils.scaleWithPixel(30),
    margin: 5,
  },
  text: {
    width: '90%',
    paddingHorizontal: 10,
  },
});
