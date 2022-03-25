import { StyleSheet } from 'react-native';
import { post } from '../../AppStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    fontFamily: 'Rubik'
  },
  title: {
    lineHeight: 30,
    fontSize: 30,
    color: '#2d3142',
    fontWeight: 'bold'
  },
  titleContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inscription: {
    height: 20,
    width: 20,
    marginRight: 10
  },
  cardImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    margin: 10,
    marginLeft: 0,
    marginRight: 20
  },
  carouselContainer: {
    margin: 20
  },
  postContainer: post.postContainer,
  rowContainer: post.rowContainer,
  authorImg: post.authorImg,
  authorName: post.authorName,
  date: post.date,
  postImg: post.postImg,
  postTitle: post.postTitle,
  icon: post.icon,
  iconText: post.iconText
});

export default styles;
