import styled from '@emotion/native';
import { TextInput } from 'react-native';
import { Image as Images } from '@components';
import { BaseColor } from '@config';

export const Card = styled(Images)`
  background-color: #fff;
  padding: 20px;
  align-items: center;
  border-radius: 10px;
`;

export const Row = styled.View`
  justify-content: space-around;
  flex-direction: row;
  margin-top: 20px;
`;

export const ProfileImage = styled(Images)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
`;

export const TextArea = styled(TextInput)`
  height: 100px;
  justify-content: flex-start;
  border-color: ${BaseColor.lightGrayColor};
  border-width: 1px;
  margin-top: 15px;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
`;

export const Icon = styled(Images)`
  width: 40px;
  height: 40px;
`;
