import { StyleSheet, Platform } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  head: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  headTextContainer: {
    marginBottom: 5,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subTitle: {
    flex: 1,
    padding: 20,
  },
  timeContainer: {
    marginLeft: 15,
  },
  redTitle: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  redText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#CC4343',
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  detailText: {
    textAlign: 'left',
    fontSize: 14,
    color: '#CC4343',
  },
  detail: {
    marginLeft: 20,
  },
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  phoneIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#CC4343',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 15,
    color: '#0A8C5C',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  nextContainer: {
    flexDirection: 'row',
  },
  backButton: {
    borderRadius: 18,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginRight: 15,
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
  },
  backStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  finishGradient: {
    borderRadius: 18,
    elevation: 2,
  },
  finishButton: {
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  finishText: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  okButton: {
    borderRadius: 18,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 15,
    justifyContent: 'center',
  },
});
