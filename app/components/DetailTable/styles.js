import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  contain: {
    marginBottom: 20,
  },
  contentHeadline: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  contentHeadlineIcon: {
    paddingRight: 10,
  },
  contentTable: {
  },
  contentHeaderRow: {
    flexDirection: 'row',
  },
  contentHeaderCol: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    borderTopColor: BaseColor.grayColor,
    borderTopWidth: 1,
  },
  contentFirstRow: {
    borderTopWidth: 0,
    marginTop: 10,
  },
  contentCol: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
  expandButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
});
