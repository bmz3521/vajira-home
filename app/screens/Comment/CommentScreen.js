import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import CreateCommentScreen from '../CreateComment/CreateCommentScreen';
import { connect } from 'react-redux';

class CommentScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#ffffff',
      elevation: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      visibleModalId: null
    };
  }

  toggleModal = () => {
    this.setState({
      visibleModal: null
    });
  };

  renderComment = ({ item, index }) => (
    <View style={index == 0 ? styles.commentContainerBorderless : styles.commentContainer}>
      <View style={styles.rowContainer}>
        <Image style={styles.authorImg} source={{ uri: item.authorPhoto }} />
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.authorName}>{item.authorName}</Text>
          <Text style={styles.date}>{item.time}</Text>
        </View>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  );

  render() {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const userPhoto = navigation.getParam('userPhoto');
    const itemId = navigation.getParam('itemId');
    const item = this.props.posts[itemId];

    return (
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
          <View>
            <View style={styles.rowContainer}>
              <Image style={styles.authorImg} source={{ uri: item.authorImg }} />
              <View style={{ alignSelf: 'center' }}>
                <Text style={styles.authorName}>{item.author}</Text>
                <Text style={styles.date}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Image style={styles.postImg} source={{ uri: item.photoUrl }} />
            <View style={styles.likesContainer}>
              <TouchableHighlight
                underlayColor="rgb(69, 183, 87)"
                onPress={() => params.onPressLike(item.id)}
              >
                <Image
                  style={styles.icon}
                  source={
                    item.liked
                      ? require('../../assets/icons/fillLike.png')
                      : require('../../assets/icons/like.png')
                  }
                />
              </TouchableHighlight>
              <Text style={styles.iconText}>{item.likes}</Text>
              <Image style={styles.icon} source={require('../../assets/icons/comments.png')} />
              <Text style={styles.iconText}>{item.comments.length}</Text>
            </View>
          </View>
        </View>
        <View style={styles.commentsContainer}>
          <Text style={styles.commentTitle}>Comments</Text>
          <View style={{ marginBottom: 100 }}>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              data={item.comments}
              renderItem={this.renderComment}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
            />
          </View>
        </View>
        <TouchableHighlight
          underlayColor="rgb(69, 183, 87)"
          style={styles.writeCommentContainer}
          onPress={() => this.setState({ visibleModal: 'swipeable' })}
        >
          <Text style={styles.writeCommentText}>Write comment...</Text>
        </TouchableHighlight>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['down']}
        >
          <CreateCommentScreen
            userPhoto={userPhoto}
            onPressPostComment={params.onPressPostComment}
            postId={item.id}
            toggleModal={this.toggleModal}
          />
        </Modal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.community.posts
  };
}

export default connect(mapStateToProps)(CommentScreen);
