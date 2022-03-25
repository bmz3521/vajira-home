import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';

import { StyleSheet } from 'react-native';
import * as Utils from '@utils';

export default StyleSheet.create({
  btnContainer: {
    marginHorizontal: 10,
    height: 50,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#284F30',
    borderColor: '#284F30',
    borderRadius: 60,
    alignSelf: 'center',
    flex: 1,
  },
  imageBanner: {
    height: Utils.scaleWithPixel(76.8),
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  content: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(138),
    // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",
  },
  contentCard: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: BaseColor.fieldColor,
    width: Utils.scaleWithPixel(138),
    // borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
    // boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px",
  },

  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  finishGradient: {
    borderRadius: 18,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 15,
    color: '#0A8C5C',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  nextContainer: {
    flexDirection: 'row',
  },
  backButton: {
    borderRadius: 18,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginRight: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: '#fff',
  },
  backStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  finishButton: {
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  finishText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  okButton: {
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 15,
    justifyContent: 'center',
  },
});

export const Card = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.13;
  shadow-radius: 2.41;
  elevation: 15px;
  border-radius: 8px;
  padding: 25px;
  shadow-offset: 1px 3px;
  margin-top: 15px;
  margin-bottom: 25px;
`;

export const TopCard = styled.View`
  align-items: center;
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 1px;
  padding-top: 10px;
  padding-bottom: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

export const ProfileImage = styled(Images)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const BottomRow = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
`;
