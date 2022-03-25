import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';
import { StyleSheet } from 'react-native';

export const LeftCard = styled.View`
  margin-right: 20px;
  margin-left: 5px;
  align-items: center;
  width: 100px;
`;

export const Image = styled(Images)`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

export const Tag = styled.View`
  background-color: ${BaseColor.blueColor};
  align-self: flex-start;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-radius: 3px;
`;

export const Card = styled.View`
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.15;
  shadow-radius: 4.81;
  elevation: 10px;
  border-radius: 8px;
  shadow-offset: 1px 3px;
  margin-horizontal: 10px;
  padding: 15px;

  margin-top: 20px;
`;

export const TopCard = styled.View`
  align-items: center;
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 0px;
  padding-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 0px;
`;

export const ProfileImage = styled(Images)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const BottomRow = styled.View`
  padding: 0px;
  margin-top: 10px;
  margin-bottom: 0;
  flex-direction: row;
  justify-content: space-around;
`;

export default StyleSheet.create({
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  makeUserRow: {
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  userIcon: {
    fontSize: 20,
    width: 25,
    height: 25,
    color: '#535353',
  },
  userText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#535353',
    marginBottom: 15,
  },
  userAva: {
    marginLeft: 5,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 15,
  },
  userProfile: {
    flexDirection: 'column',
  },
  doctorProfile: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    marginVertical: 2,
  },
  doctorText: {
    fontSize: 14,
    flex: 1,
  },
  doctorName: {
    color: '#0A5C3E',
    marginLeft: 20,
    fontSize: 16,
    flex: 1,
  },
  userName: {
    color: '#0A5C3E',
    marginLeft: 20,
    fontSize: 16,
    flex: 1,
  },
  userNotice: {
    alignSelf: 'center',
    marginLeft: 20,
    lineHeight: 20,
    color: 'grey',
  },
  timeIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#535353',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535353',
  },
  lineContainer: {
    marginVertical: 15,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#ccc',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  consultContainer: {
    marginTop: 5,
    width: '100%',
  },
  titleContainer: {
    marginBottom: 10,
  },
  costContainer: {
    flexDirection: 'row',
  },
  costTitle: {
    color: '#535353',
    fontSize: 16,
  },
  cost: {
    color: '#535353',
    fontSize: 16,
    alignSelf: 'flex-end',
    marginHorizontal: 10,
  },
  specialMessage: {
    color: '#CC4445',
    fontSize: 11,
  },
  wrapName: {
    flexDirection: 'row',
    width: '88%',
  },
  wrapNotice: {
    flexDirection: 'row',
    width: '99.8%',
  },
});
