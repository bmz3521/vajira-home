import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import * as Utils from '@utils';

export default StyleSheet.create({
  imageBackground: {
    height: 140,
    width: '100%',
    position: 'absolute',
  },
  eventCard: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  searchForm: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    backgroundColor: BaseColor.whiteColor,
    width: '90%',
    shadowColor: 'black',

    elevation: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  textSearch: {
    color: '#7d7d7d',
    fontWeight: '600',
    fontSize: 18,
  },
  contentServiceIcon: {
    marginTop: 10,
    flexDirection: 'row',
    // justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 10,
  },
  contentHiking: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(250),
    width: '100%',
    marginTop: 10,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  line: {
    height: 1,
    backgroundColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 20,
  },
  mainCard:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  iconParent: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
  },
  iconTopParent: {
    alignSelf: 'center',
    width: '43%',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
    shadowColor: '#000',
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 30

  },
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: BaseColor.fieldColor,
    marginBottom: 10,
  },
  promotionItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(250),
  },
  clinicPackageItem: {
    borderRadius: 8,
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160),
  },
  iconContentMany: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 18,
    // backgroundColor: BaseColor.fieldColor
  },
  itemServiceMany: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  contentServiceIconMany: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  modalToggle: {
    padding: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#bbded6',
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 120,
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
