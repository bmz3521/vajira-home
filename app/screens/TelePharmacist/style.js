import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';
import { StyleSheet } from 'react-native';

export const Card = styled.View`
  flex-direction: row;
  align-self: center;
  width: 95%;
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
  width: 80px;
`;

export const ProfileImage = styled(Images)`
  width: 60px;
  height: 60px;
  border-radius: 35px;
`;

export const Image = styled(Images)`
  width: 14px;
  height: 14px;
  margin-right: 10px;
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

export const TagText = styled.Text`

  font-size: 10px;
`;

export default StyleSheet.create({
  reviewView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  reviewCount: {
    paddingHorizontal: 5,
  },
  reviewBlockView: {
    flexDirection: 'column',
    paddingVertical: 20,
  },
  reviewHeaderView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  reviewTitleView: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  contentButtonBottom: {
    marginTop: 10,
  },
  textHeight: {
    marginTop: 10,
    lineHeight: 25,
  },
  subtitleMargin: {
    marginTop: 10,
    marginBottom: 10,
  },
  showOrReadMoreMP: {
    color: '#284F30',
    marginBottom: 15,
    paddingRight: 10,
  },
});