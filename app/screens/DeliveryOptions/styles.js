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
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mainIconContainer: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    position: 'absolute',
    zIndex: -1,
  },
  textContent: {
    marginTop: 110,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#535353',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#095C3E',
    fontWeight: 'bold',
  },
  content: {
    marginLeft: 15,
    fontSize: 14,
    color: '#5E5E5E',
  },
  content2: {
    fontSize: 16,
    color: '#5E5E5E',
  },
  space: {
    marginVertical: 8,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  contentTitle: {
    fontSize: 26,
    textAlign: 'center',
    color: '#09B678',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentDetail: {
    fontSize: 16,
    textAlign: 'center',
    color: '#535353',
  },
  card: {
    borderRadius: 14,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
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
  nextContainer: {
    marginTop: 10,
  },
  nextButton: {
    borderRadius: 22,
    paddingHorizontal: 40,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: '#09B678',
    padding: 15,
  },
  nextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  paginationContainer: {
    backgroundColor: '#fff',
    paddingVertical: 5,
  },
  smallText: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 10,
    color: '#c0c0c0',
  },
  illustration: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    backgroundColor: '#F3FFFB',
  },
});
