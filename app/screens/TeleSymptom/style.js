import styled from '@emotion/native';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { BaseColor } from '@config';

export const Container = styled.View`
  padding: 20px;
  padding-bottom: 0;
`;

export const TextArea = styled(TextInput)`
  height: 100px;
  justify-content: flex-start;
  border-color: ${BaseColor.lightGrayColor};
  border-width: 1px;
  margin-top: 15px;
  border-radius: 8px;
  padding: 10px;
`;

export const Card = styled.View`
  margin-left: 8;
  margin-right: 8;
  margin-bottom: 12;
  shadow-color: '#000';
`;

export const ItemRow = styled.View`
  border-color: #ede8e8;
  border-width: 1px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  margin-bottom: 12px;
  flex-direction: row;
`;

// export const ItemRow = styled.View`
//   border-color: #ede8e8;
//   border-width: 1px;
//   flex-direction: column;
//   padding-vertical: 12px;
//   padding-horizontal: 12px;
//   margin-bottom: 12px;
//   align-items: flex-start;
//   justify-content: space-between;
// `;

export default StyleSheet.create({
  eventCard: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
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
  },
  iconTopParent: {
    alignSelf: 'center',
    width: '43%',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
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
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 30,
  },
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: BaseColor.fieldColor,
    marginBottom: 10,
  },

  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  group: {
    // flex: 1,
    height: 500,
    backgroundColor: '#6db6a4',
  },
});
