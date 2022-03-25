import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import MenuImage from '../../components/MenuImage/MenuImage';
import CreatePostScreen from '../CreatePost/CreatePostScreen';
import { profilePictures } from '../../data/dataArrays';
import styles from './styles';
import { connect } from 'react-redux';

class CommunityScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        height: 60,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerLeft: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleModalId: null,
      userName: 'Ben Andressen',
      userPhoto:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357'
    };
  }

  toggleModal = () => {
    this.setState({
      visibleModal: null
    });
  };

  renderCard = item => <Image style={styles.cardImg} source={{ uri: item.photo }} />;

  onPressPostComment(commentText, postId) {
    var posts = this.props.posts;
    var comment = {};
    posts.map(post => {
      if (post.id == postId) {
        let id = 0;
        if (post.comments.length != 0) {
          id = post.comments[post.comments.length - 1].id + 1;
        }
        comment = {
          text: commentText,
          authorName: this.props.userName,
          authorPhoto: this.props.userPhoto,
          time: '15 seconds',
          id: id
        };
      }
    });
    this.props.addComment(postId, comment);
  }

  onPressPostPost = postText => {
    var posts = this.props.posts;
    let post = {
      title: postText,
      photoUrl:
        'https://scontent.fotp1-1.fna.fbcdn.net/v/t1.0-9/14064032_1211439115574722_4008304366512255154_n.jpg?_nc_cat=108&_nc_oc=AQnBE7o9_hppxwN1vTI9pf7psutWjHM8yrRyT8FujlPuDQfSeX6_t7n8L7OU6_G-428&_nc_ht=scontent.fotp1-1.fna&oh=dc47657793c14d6b1697f4e1af37bde6&oe=5DE8E357',
      author: this.props.userName,
      authorImg: this.props.userPhoto,
      time: '15 seconds',
      id: posts[posts.length - 1].id + 1,
      likes: 0,
      liked: false,
      comments: []
    };
    this.props.addPost(post);
  };

  onPressLike = postId => {
    this.props.addLike(postId);
  };

  renderPost = ({ item }) => {
    return (
      <TouchableHighlight
        style={styles.postContainer}
        underlayColor="rgb(69, 183, 87)"
        onPress={() =>
          this.props.navigation.navigate('Comment', {
            userPhoto: this.props.userPhoto,
            userName: this.props.userName,
            itemId: item.id,
            onPressPostComment: this.onPressPostComment.bind(this),
            onPressLike: this.onPressLike.bind(this)
          })
        }
      >
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
          <View style={styles.rowContainer}>
            <TouchableHighlight
              underlayColor="rgb(69, 183, 87)"
              onPress={() => this.onPressLike(item.id)}
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
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Community</Text>
          <TouchableHighlight
            underlayColor="rgb(69, 183, 87)"
            onPress={() => this.setState({ visibleModal: 'swipeable' })}
          >
            <Image
              style={styles.inscription}
              source={require('../../assets/icons/inscription.png')}
            />
          </TouchableHighlight>
        </View>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['down']}
        >
          <CreatePostScreen
            userPhoto={this.props.userPhoto}
            onPressPostPost={this.onPressPostPost}
            toggleModal={this.toggleModal}
          />
        </Modal>

        <ScrollView
          horizontal={true}
          style={styles.carouselContainer}
          showsHorizontalScrollIndicator={false}
        >
          {profilePictures.map(item => this.renderCard(item))}
        </ScrollView>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.posts}
            renderItem={this.renderPost}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.community.posts,
    userName: state.registration.userName,
    userPhoto: state.registration.userPhoto
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: post => dispatch({ type: 'ADD_POST', post }),
    addLike: id => dispatch({ type: 'ADD_LIKE', id }),
    addComment: (postId, comment) => dispatch({ type: 'ADD_COMMENT', postId, comment })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommunityScreen);
