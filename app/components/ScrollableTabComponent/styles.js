import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import { BaseColor } from '@config';
export default StyleSheet.create({
  imageBanner: {
    height: Utils.scaleWithPixel(76.8),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  contentList: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(138),
    // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",
  },
  imageBackground: {
    height: 40,
    width: '100%',
    position: 'absolute',
  },

  searchForm: {
    flexDirection: 'row',
    paddingVertical: 15,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    width: '90%',
    shadowColor: 'black',
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 30,

    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  contentCard: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(138),
    // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",
  },
});
