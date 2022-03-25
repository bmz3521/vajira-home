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
  card: {
    borderRadius: 14,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.33,
    shadowRadius: 3.84,
    elevation: 6,
  },
  illustration: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    backgroundColor: '#F3FFFB',
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  contentTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#095C3E',
  },
  contentSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentDetail: {
    fontSize: 16,
    color: '#535353',
    marginVertical: 15,
  },
  lineContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  line: {
    backgroundColor: '#000',
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  profileImageContainer: {
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 6,
    borderRadius: 35,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  wrapName: {
    flexDirection: 'row',
    width: '88%',
  },
  doctorName: {
    color: '#0A5C3E',
    marginLeft: 20,
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  doctorProfile: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: 20,
    marginVertical: 2,
  },
  doctorText: {
    fontSize: 14,
    flex: 1,
  },
  detailIcon: {
    fontSize: 12,
    marginRight: 8,
    color: '#535353',
  },
  detailText: {
    fontSize: 12,
    color: '#535353',
  },
  commentContainer: {
    marginVertical: 10,
  },
  commentText: {
    fontSize: 16,
    color: '#535353',
  },
  makeRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
  },
  timeIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#535353',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535353',
  },
  appointmentContainer: {
    marginLeft: 25,
    color: '#0DB779',
    marginBottom: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  appoitnmentText: {
    color: '#535353',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#40424B',
    marginTop: 20,
    marginLeft: 25,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    paddingTop: 20,
  },
  lab: {
    flex: 1,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 14,
    borderColor: '#09B678',
    backgroundColor: '#09B678',
  },
  labText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonItem: {
    marginHorizontal: 10,
    marginTop: 10,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonGreenText: {
    fontSize: 16,
    color: '#09B678',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonWhiteText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGreenIcon: {
    width: 80,
    height: 80,
  },
  buttonWhiteIcon: {
    width: 50,
    height: 50,
  },
  titleIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#40424B',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#40424B',
  },
  presListTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  presListHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  presName: {
    flex: 1,
  },
  instructions: {
    marginLeft: 20,
    marginBottom: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
