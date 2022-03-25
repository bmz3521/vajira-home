import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  TopPart: {
    flex: 1,
    backgroundColor: 'white',
  },
  congratsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  successTitle: {
    marginBottom: 10,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  successSubtitle: {
    marginBottom: 15,
    color: '#797979',
    textAlign: 'center',
    fontSize: 18,
  },
  methodTitle: {
    marginTop: 10,
    marginHorizontal: 20,
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 24,
  },
  methodContainer: {
    flexDirection: 'row',
    marginHorizontal: 32,
  },
  methodText: {
    color: '#797979',
    fontSize: 14,
    lineHeight: 22,
  },
  bottomPart: {
    paddingTop: 20,
  },
  noteContainer: {
    marginHorizontal: 20,
  },
  skipText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  okButton: {
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 15,
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: '#fff',
  },
  okStyle: {
    color: '#0A5C3E',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  skipGradient: {
    borderRadius: 18,
    elevation: 2,
  },
  skipButton: {
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 60,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  skipText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export const Container = styled.View`
  padding: 20px;
  padding-bottom: 0;
  flex: 1;
`;

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
  border-bottom-color: ${BaseColor.lightGrayColor};
  border-bottom-width: 1px;
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
