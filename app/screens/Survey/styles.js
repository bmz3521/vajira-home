import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseColor, Typography, FontWeight } from '@config';

export default StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 20,
  },
  card: {
    marginTop: 30,
    flex: 1,
  },
  nextBtn: {
    width: '50%',
    textAlign: 'center',
    color: '#ffffff',
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'stretch',
  },
  container: {
    backgroundColor: '#f7f7f7',
  },
  linearGradient: {
    backgroundColor: '#0A7C53',
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 10,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  question: {
    flex: 1,
    marginRight: 10,
  },
  questionNo: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  questionPS: {
    fontSize: 12,
    marginTop: 10,
  },
  nextContainer: {
    marginTop: 40,
  },
  nextButton: {
    borderRadius: 22,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: '#0A8C5C',
    padding: 15,
  },
  backButton: {
    borderRadius: 22,
    padding: 10,
    marginVertical: 10,
    elevation: 2,
    backgroundColor: '#fff',
    padding: 15,
  },
  nextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  backStyle: {
    color: '#0A8C5C',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  finishGradient: {
    borderRadius: 22,
  },
  finishButton: {
    borderRadius: 22,
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
    borderRadius: 22,
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 15,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  },
});
