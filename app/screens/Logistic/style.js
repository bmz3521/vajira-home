import styled from '@emotion/native';
import { BaseColor } from '@config';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  padding: 0px;
  padding-top: 10px;
  padding-bottom: 0;
`;

export default StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
  },
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  continue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  addressInput: {
    marginVertical: 10,
    fontSize: 16,
  },
  card: {
    borderRadius: 14,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
  },
  illustration: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    backgroundColor: '#F3FFFB',
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  contentTitle: {
    fontSize: 18,
    textAlign: 'left',
    color: '#0A7C53',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentDetail: {
    fontSize: 14,
    textAlign: 'center',
    color: '#535353',
  },
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#535353',
  },
  centeredView: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0, .8)',
    backgroundColor: '#fff',
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
  },
  detailTitle: {
    fontSize: 18,
    textAlign: 'left',
    color: '#0A7C53',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#0A7C53',
  },
  detailText: {
    fontSize: 14,
    textAlign: 'left',
    color: '#535353',
  },
  line: {
    backgroundColor: '#535353',
    height: 1,
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  blockContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  blockIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#0A7C53',
  },
  mapContainer: {
    marginHorizontal: 35,
    marginBottom: 10,
  },
  map: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c0c0c0',
    width: '65%',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
  },
  mapButton: {
    width: '100%',
  },
  mapIcon: {
    fontSize: 13,
    marginRight: 8,
    color: 'red',
  },
  mapText: {
    fontSize: 13,
    color: '#0A7C53',
    fontWeight: 'bold',
  },
});
