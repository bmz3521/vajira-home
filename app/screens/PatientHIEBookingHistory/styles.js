import { StyleSheet } from 'react-native';
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
  head: {
    height: 60,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headFont: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  line: {
    width: 0,
    borderWidth: 1.21,
    // borderStyle: 'dashed',
    borderRadius: 10,
    borderColor: '#095C3E',
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
