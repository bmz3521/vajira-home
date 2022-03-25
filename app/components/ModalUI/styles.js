import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';
import { useTheme } from 'react-native-elements';

const styles = theme =>
  StyleSheet.create({
    buttonTextAdd: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
    },
    buttonCancelTextAdd: {
      color: '#00000075',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(173, 173, 173, .6)',
    },
    okIcon: {
      color: '#0AB678',
      textAlign: 'center',
      marginBottom: 10,
    },
    modalView: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalButtonContainer: {
      flexDirection: 'column',
      marginVertical: 20,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '600',
      color: '#CC4343',
      marginBottom: 10,
      textAlign: 'center',
      shadowColor: '#c0c0c0',
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 10,
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
    },
    add: {
      width: '100%',
      height: 50,
      marginTop: 10,
      marginRight: 10,
      marginBottom: 100,
      padding: 12,
      borderRadius: 20,
      alignSelf: 'center',
    },
    modalText: {
      fontSize: 18,
      color: '#CC4343',
      textAlign: 'center',
      fontWeight: 'bold',
      fontFamily: theme.fontFamilyDefault,
      fontSize: theme.fontSizeDefault,
    },
  });
export default styles;
