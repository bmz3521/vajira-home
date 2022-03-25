import { BaseColor } from '@config';
import { StyleSheet } from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderColor: BaseColor.grayColor,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
  },
  leftView: {
    flex: 2,
  },
  rightView: {
    flex: 3,
  },
  image: {
    width: Utils.scaleWithPixel(96),
    height: Utils.scaleWithPixel(96),
    borderRadius: 5,
  },
  price: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
