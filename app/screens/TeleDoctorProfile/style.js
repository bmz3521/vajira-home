import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';

export const Container = styled.View`
  flex: 1;
`;

export const MainContainer = styled.View`
  margin-left: 20px;
  margin-right: 20px;
`;

export const Card = styled.View`
  background-color: #fff;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  margin-bottom: 25px;
`;

export const TopCard = styled.View`
  align-items: center;
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
