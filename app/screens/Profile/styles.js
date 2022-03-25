import { StyleSheet } from 'react-native';
import { BaseColor } from '@config';

export default StyleSheet.create({
  contentTitle: {
    alignItems: 'flex-start',
    width: '100%',
    height: 32,
    justifyContent: 'center',
  },
  contain: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  textInput: {
    height: 56,
    backgroundColor: BaseColor.fieldColor,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: BaseColor.textSecondaryColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  profile: {
    marginBottom: 20,
    marginTop: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  signInOutGradient: {
    backgroundColor: '#0A7C53',
    marginVertical: 10,
    borderRadius: 18,
    paddingBottom: 8,
    paddingTop: 8,
  },
  topCard: {
    backgroundColor: '#fff',
  },
  bottomCard: {
    marginHorizontal: 20,
  },
  name: {
    textAlign: 'center',
    color: '#0A7C53',
    fontSize: 16,
    fontWeight: 'bold',
  },
  age: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
  },
  category: {
    marginTop: 15,
  },
  cText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#535353',
  },
  icon: {
    width: 25,
    height: 25,
  },
  card: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
    alignItems: 'center',
  },
  option: {
    textAlign: 'left',
    color: '#0AB678',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  optionGray: {
    textAlign: 'left',
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});
