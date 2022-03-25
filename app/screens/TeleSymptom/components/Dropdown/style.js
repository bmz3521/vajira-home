import styled from '@emotion/native';
import { Image as Images } from '@components';
import { BaseColor } from '@config';
import { StyleSheet } from 'react-native';

export const ItemRow = styled.View`
  border-color: #ede8e8;
  border-width: 1px;
  border-radius: 5px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  margin-bottom: 12px;
  flex-direction: row;
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
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
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
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 6,
    shadowColor: '#000',
    backgroundColor: 'white',
  },
  iconTopParent: {
    alignSelf: 'center',
    flex: 0.5,
    aspectRatio: 1,
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
    marginLeft: 10,
    borderRadius: 30,
    marginRight: 5,
  },
  iconTopParent2: {
    alignSelf: 'center',
    flex: 0.5,
    aspectRatio: 1,
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
    marginRight: 10,
    borderRadius: 30,
    marginLeft: 5,
  },

  iconTopParent3: {
    alignSelf: 'center',
    flex: 1.0,
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
    marginRight: 10,
    borderRadius: 22,
    marginLeft: 5,
    flexDirection: 'row',
  },

  iconTopParent4: {
    alignSelf: 'center',
    flex: 1.0,
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
    marginRight: 10,
    borderRadius: 30,
    marginLeft: 5,
    flexDirection: 'row',
  },
  title: {
    paddingRight: 10,
    paddingLeft: 18,
    paddingLeft: 18,
    marginTop: 12,
  },
  cardList: {
    backgroundColor: 'white',
    paddingRight: 10,
    paddingLeft: 12,
    marginTop: 12,
  },
  btnContainer: {
    flexDirection: 'row',
    flex: 3,
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    margin: 10,
    width: 50,
    height: 50,
    backgroundColor: '#0A5C3E',
    borderRadius: 200,
  },
  txt: { marginBottom: 10, color: '#0A5C3E' },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  tabbar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignSelf: 'flex-start',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
  },
  tab: {
    width: 110,
  },
});
