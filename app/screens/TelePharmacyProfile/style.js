import styled from '@emotion/native';
import { BaseColor } from "@config";
import { Image as Images } from '@components';

export const Container = styled.View`
  padding: 15px;
  padding-top: 0px;
  padding-bottom: 80px;
  flex: 1;
`;

export const MainContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;

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
  align-items: center;
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
  padding: 0px;
  margin-top: 30;
  margin-bottom: 40;
  flex-direction: row;
  justify-content: space-around;
`;

