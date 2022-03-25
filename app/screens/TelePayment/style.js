import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images, Button, Text } from '@components';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  padding-bottom: 0;
`;

export const Image = styled(Images)`
  width: 14px;
  height: 14px;
  margin-right: 10px;
`;

export const Selete = styled(Images)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const ButtonAdd = styled(Button)`
  border-radius: 10px;
  margin-top: 20px;
  border-color: grey;
  border-width: 1px;
  background-color: transparent;
`;

export const Total = styled(Text)`
  position: absolute;
  left: 0;
  top: 8px;
`;

export const ItemRow = styled.View`
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 1px;
  flex-direction: row;
  padding-vertical: 12px;
  align-items: center;
`;

export default StyleSheet.create({
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
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
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
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
  },
  timeIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#535353',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#535353',
  },
  confirmText: {
    color: '#0DB779',
    fontWeight: 'bold',
  },
  confirmTextContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
  appointmentContainer: {
    marginLeft: 25,
    color: '#0DB779',
    marginBottom: 10,
  },
  appoitnmentText: {
    color: '#535353',
    fontSize: 16,
  },
  patientContainer: {
    paddingHorizontal: 20,
  },
  serviceContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  serviceIcon: {
    fontSize: 20,
    marginRight: 8,
    color: '#535353',
  },
  serviceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#535353',
  },
  options: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#C4C4C4',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  selectOptions: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#095C3E',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#0A905F',
  },
  optionText: {
    fontSize: 18,
    color: '#535353',
  },
  selectOptionText: {
    fontSize: 18,
    color: '#ffffff',
  },
  readyToCallContainer: {
    padding: 20,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 4,
  },
  readyToCallRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
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
  },
  iconTopParent: {
    width: 190,
    height: 135,
    marginTop: 17,
    marginBottom: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mainIconContainer: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  mainTextContainer: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainGradient: {
    paddingVertical: 5,
  },
  containerFAQ: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
