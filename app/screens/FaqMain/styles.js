import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerVideo: {
    backgroundColor: '#f3f3f3',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    transform: [{ translateY: -5 }],
    marginBottom: 5,
    width: '100%',
  },
  kvcButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 2, //IOS
    backgroundColor: '#fff',
    elevation: 4, // Android
  },
  noResult: { alignItems: 'center', marginTop: 15 },
  topicText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#095A3B',
  },
  searchSection: {
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
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
  searchIcon: {
    padding: 10,
  },
  scrollContainer: {
    backgroundColor: 'white',
    paddingRight: 18,
    paddingLeft: 18,
    paddingTop: 10,
    marginTop: 5,
  },
});
