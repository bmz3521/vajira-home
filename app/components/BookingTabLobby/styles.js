import { BaseColor } from '@config';
import { StyleSheet } from 'react-native';
import * as Utils from '@utils';
import styled from '@emotion/native';
import { Image as Images } from '@components';

export const Card = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.13;
  shadow-radius: 2.41;
  elevation: 6px;
  border-radius: 12px;
  shadow-offset: 1px 3px;
  margin: 20px;
  padding: 15px;

  margin-top: 20px;
  margin-bottom: 25px; */
`;

export const TopCard = styled.View`
  align-items: center;
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 0px;
`;

export const ProfileImage = styled(Images)`
  width: 50px;
  height: 50px;
  border-radius: 20px;
`;

export default StyleSheet.create({
  content: {
    marginHorizontal: 10,
    margin: 4,
    borderColor: BaseColor.textSecondaryColor,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 8,
    padding: 10,
  },
  blockView: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: BaseColor.textSecondaryColor,
    // borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 4,
  },
  colFirstChild: {
    flexDirection: 'column',
    flex: 1,
  },
  leftView: {
    flex: 1,
  },
  leftView2: {
    flex: 2,
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: Utils.scaleWithPixel(96),
    height: Utils.scaleWithPixel(64),
    borderRadius: 0,
  },
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  makeColumn: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  titleIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#085394',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#085394',
  },
  status: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusIcon: {
    width: 10,
    height: 10,
    marginRight: 2,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 11,
    paddingLeft: 5,
  },
  lineContainer: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#E5E5E5',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535353',
    paddingBottom: 5,
  },
  timeBigText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#535353',
    paddingBottom: 0,
  },
  appointmentContainer: {
    marginLeft: 25,
    color: '#0DB779',
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  appoitnmentText: {
    color: '#9b9b9b',
    fontSize: 16,
    lineHeight: 25,
  },
  userAva: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: -1,
  },
  doctorProfile: {
    flexDirection: 'row',
    marginLeft: 20,
    marginVertical: 0,
  },
  detailText: {
    fontSize: 20,
    color: '#535353',
    lineHeight: 30,
    fontWeight: 'bold',
  },
  wrapName: {
    flexDirection: 'row',
    width: '88%',
  },
  thumb: {
    backgroundColor: '#fff',
    width: 120,
    height: 120,
    borderRadius: 50,
    marginBottom: 20,
  },
  userProfile: {
    top: -10,
  },
});
