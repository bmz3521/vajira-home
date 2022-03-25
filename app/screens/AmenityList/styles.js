import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    shadowOffset: { height: 1 },
    shadowColor: BaseColor.grayColor,
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#919191',
    marginBottom: 12,
  },
  nameContent: {
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomColor: BaseColor.whiteColor,
    // backgroundColor: BaseColor.lightPrimaryColor,
    backgroundColor: 'white',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
});
