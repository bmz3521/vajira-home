import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';

export const Card = styled.View`
  flex-direction: row;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.13;
  shadow-radius: 2.41;
  elevation: 15px;
  border-radius: 8px;
  padding: 20px;
  shadow-offset: 1px 3px;
  margin-top: 15px;
`;

export const LeftCard = styled.View`
  margin-right: 20px;
  margin-left: 10px;
  align-items: center;
  width: 100px;
`;

export const ProfileImage = styled(Images)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
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
