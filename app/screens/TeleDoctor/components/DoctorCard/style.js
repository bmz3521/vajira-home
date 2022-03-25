import styled from '@emotion/native';
import { BaseColor } from '@config';
import { Image as Images } from '@components';
import { StyleSheet } from 'react-native';

export const Card = styled.View`
  padding: 5px;
  margin-top: 5px;
`;

export const LeftCard = styled.View`
  flex: 1;
  margin-right: 15px;
  margin-left: 2px;
  align-items: flex-start;
  width: 70px;
`;

export const RightCard = styled.View`
  margin-right: 10px;
  align-items: flex-end;
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

  iconTopParent4: {
    alignSelf: 'center',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    shadowColor: '#000',
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 15,
    marginLeft: 5,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    shadowColor: '#000',
  },
});
