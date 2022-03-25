import { StyleSheet } from 'react-native';
export const defaultStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginRight: 45,
  },
  scroll: { backgroundColor: 'white', marginBottom: 10 },
  headContainer: { marginTop: 20, paddingLeft: 12 },
  headTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    padding: 2,
    borderRadius: 15,
    overflow: 'hidden',
    width: 220,
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  cardTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 16,
    paddingLeft: 10,
    textAlign: 'left',
    color: '#000',
  },
  divider: { borderBottomWidth: 2, borderBottomColor: '#ee7488' },
  btn: {
    marginBottom: 10,
    backgroundColor: '#DAA520',
    paddingHorizontal: 10,
    height: 35,
    maxWidth: 240,
    minWidth: 150,
    width: '60%',
  },
  backBtn: {
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    height: 35,
    maxWidth: 240,
    minWidth: 150,
    width: '60%',
  },
  backSubBtn: {
    marginBottom: 10,
    backgroundColor: '#BEA989',
    paddingHorizontal: 10,
    height: 35,
    maxWidth: 240,
    minWidth: 150,
    width: '60%',
  },
  padding5: {
    paddingHorizontal: 5,
  },
});
