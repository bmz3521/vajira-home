import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  padding-horizontal: 10px;
`;

export default StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
  eventCard: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10.84,

    elevation: 3,
    shadowColor: '#dddddd',
    backgroundColor: 'white',
  },
});
