import { StyleSheet } from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  contentHeadline: {
    marginLeft: 5,
  },
  contentLeft: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  contentDate: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
  },
  contentImage: {
    width: '100%',
    height: Utils.scaleWithPixel(160),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    alignSelf: 'flex-start',
  },
  footerRight: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  footerIconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  footerIcon: {
    flexDirection: 'row',
    paddingRight: 5,
  },
});
