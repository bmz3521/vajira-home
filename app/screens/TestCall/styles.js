import { BaseColor, FontFamily } from '@config';
import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import styled from '@emotion/native';
import { Image as Images } from '@components';
export const ProfileImage = styled(Images)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid grey;
  padding: 10px;
`;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 125,
    height: 200,
    position: 'absolute',
    right: 10,
    bottom: 400,
    borderRadius: 2,
    borderColor: '#4e4e4e',
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
  optionsTop: {
    position: 'absolute',
    paddingHorizontal: 10,
    right: 0,
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greenText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  Small: {
    backgroundColor: '#00000050',
    width: 70,
    height: 70,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    // backgroundColor: "blue",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  makeColumn: {
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  setRowInfo: {
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderRadius: 10,
    justifyContent: 'center',
  },
  setRowInfoSummary: {
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderRadius: 10,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  thumb: {
    width: 110,
    height: 110,
    borderRadius: 50,
    marginTop: 10,
  },
  rowInfo: {
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 15,
  },
  rowInfoSummary: {
    flexDirection: 'row',
    marginVertical: 3,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: 'white',
  },
  setionText: {
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gabCard: {
    marginVertical: 5,
    shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
    zIndex: 1,
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#fff',
  },
  callText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
  },
  //=========================== Landscape ============================= //
  makeColumnLand: {
    // backgroundColor:'grey',
    marginHorizontal: 10,
  },
  setRowInfoLand: {
    backgroundColor: 'white',
    borderTopLeftRadius: 0,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  thumbLand: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginVertical: 10,
  },
  rowInfoLand: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  sectionLand: {
    backgroundColor: 'white',
  },
  setionTextLand: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '30%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gabCardLand: {
    marginVertical: 5,
    shadowColor: Platform.OS === 'android' ? '#000' : '#B2ADAD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
    zIndex: 1,
  },
  //=========================== Landscape ============================= //
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.2)',
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 22,
    borderRadius: 20,
    maxWidth: 450,
  },
  titleStyles: {
    fontFamily: FontFamily.default,
    flex: 4,
    marginBottom: 5,
    fontSize: 16,
    lineHeight: 22,
  },
  subTitleText: {
    fontFamily: FontFamily.default,
    marginVertical: 5,
  },
  ctaContainer: {
    borderRadius: 15,
    backgroundColor: '#0A905F',
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 13,
  },
  ctaText: {
    fontFamily: FontFamily.default,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 30,
    color: '#FFFFFF',
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  listItemContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
  },
  listItemStyle: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  labelDeopDown: {
    fontFamily: FontFamily.default,
    textAlign: 'left',
    fontSize: 14,
  },
  containerDDBox: {
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },
  listItemRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  seperatePadding: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  listText: {
    fontFamily: FontFamily.default,
    fontSize: 14,
  },

  dropDownContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  containerDDBox: {
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },
  listItemStyle: {
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  listItemContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    paddingVertical: 10,
  },
  labelDeopDown: {
    fontFamily: FontFamily.default,
    textAlign: 'left',
    fontSize: 14,
  },
});
