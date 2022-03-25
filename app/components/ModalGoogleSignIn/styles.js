import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalContaimer: {
    backgroundColor: 'rgba(0,0,0,.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    position: 'relative',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 2,
  },
  buttonContainer: {
    elevation: 3,
    marginHorizontal: 45,
    marginBottom: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    alignSelf: 'center',
    borderRadius: 3,
    padding: 2,
  },
  successContainer: {
    overflow: 'hidden',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    alignSelf: 'center',
    borderRadius: 10,
  },
  googleIcon: {
    width: 25,
    height: 25,
  },
  vajiraIcon: {
    width: 60,
    height: 60,
  },
  fitIcon: {
    width: 50,
    height: 50,
  },
  clostBtn: {
    position: 'absolute',
    right: 10,
    top: 3,
  },
  bgIcon: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 1,
  },
  fontSignIn: {
    marginHorizontal: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
