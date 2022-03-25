import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';
import { StyleSheet } from 'react-native';

export const Card = styled.View`
  flex-direction: row;
  background-color: #fff;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 10px;
`;

export const Header = styled.View`
  font-size: 10px;
`;

export const LeftCard = styled.View`
  margin-right: 2px;
  margin-left: 2px;
  align-items: flex-start;
  width: 180px;
`;

export const SmallImage = styled(Images)`
  width: 180px;
  height: 120px;
`;

export const Image = styled(Images)`
  width: 350px;
  height: 200px;
  padding: 10px;
  margin: 15px;
`;

export const Tag = styled.View`
  background-color: #eaeaea;
  align-self: flex-start;
  padding-vertical: 5px;
  padding-horizontal: 10px;
  border-radius: 30px;
  margin: 3px;
  font-size: 10px;
`;

export const TagText = styled.Text`font-size: 10px`;