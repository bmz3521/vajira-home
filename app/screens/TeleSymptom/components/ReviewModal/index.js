import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { View, TouchableHighlight } from 'react-native';
import _ from 'lodash';
import { Text, Button } from '@components';
import { BaseColor } from '@config';
import LikeIcon from '@assets/images/like.png';
import { getImage } from '@utils/uploadImageHelper';
import authClient from '@utils/authClient';
import Loading from '@components/Loading';

import { Card, ProfileImage, TextArea, Icon, Row } from './style';

const ReviewModal = ({ isVisible, user, toggleModal }) => {
  const [isLike, setIsLike] = useState(true);
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState('');

  const onSummit = async () => {
    setLoading(true);
    const data = {
      like: isLike,
      review: review,
    };
    try {
      await authClient.client.post('/url', data).then(res => res.data);
      toggleModal();
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Modal
        isVisible={isVisible}
        swipeDirection={['down']}
        useNativeDriver={true}
        propagateSwipe={true}
      >
        <Loading isVisible={loading} />
        <Card>
          <ProfileImage
            source={{
              uri: getImage(_.get(user, 'profileImage')),
            }}
          />
          <Text caption1 semibold style={{ marginTop: 10, marginBottom: 15 }}>
            {_.get(user, 'name')}
          </Text>
          <Text title3 bold>
            How was your call experience?
          </Text>
          <Row>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => setIsLike(true)}
            >
              <Icon
                source={LikeIcon}
                tintColor={BaseColor[isLike ? 'primaryColor' : 'grayColor']}
              />
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={() => setIsLike(false)}
              style={{
                transform: [{ rotate: '180deg' }],
                marginLeft: 40,
                marginTop: 10,
              }}
            >
              <Icon
                source={LikeIcon}
                tintColor={BaseColor[!isLike ? 'primaryColor' : 'grayColor']}
              />
            </TouchableHighlight>
          </Row>
          <TextArea
            numberOfLines={10}
            multiline={true}
            placeholder="Write a review..."
            placeholderTextColor={BaseColor.grayColor}
            value={review}
            onChangeText={text => setReview(text)}
          />
          <Row>
            <Button style={{ backgroundColor: '#fff' }} onPress={toggleModal}>
              <Text grayColor>Skip</Text>
            </Button>
            <Button onPress={onSummit}>Summit</Button>
          </Row>
        </Card>
      </Modal>
    </View>
  );
};

export default ReviewModal;
