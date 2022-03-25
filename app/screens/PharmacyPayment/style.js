import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images, Button, Text } from '@components';

export const Card = styled.View`
  flex-direction: row;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.13;
  shadow-radius: 2.41;
  elevation: 15px;
  border-radius: 8px;
  padding: 10px;
  shadow-offset: 1px 3px;
  margin-top: 15px;
`;

export const LeftCard = styled.View`
  margin-right: 2px;
  margin-left: 2px;
  align-items: flex-start;
  width: 70px;
`;

export const Container = styled.View`
  padding: 20px;
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
  margin-top: 30px;
  border-color: ${BaseColor.blueColor};
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
