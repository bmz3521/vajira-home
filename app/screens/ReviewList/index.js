import React from 'react';
import { View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import {
  SafeAreaView,
  Header,
  Text,
  Icon,
  StarRating,
  ReviewItem,
} from '@components';
import { BaseStyle, BaseColor } from '@config';
import PropTypes from 'prop-types';
import styles from './styles';

function ReviewList(props) {
  const { navigation } = props;
  const { clinic, reviews } = navigation.state.params;

  console.log('REVIEWS ===>');
  console.log(reviews.map(r => r));

  const rating = parseFloat(
    (Math.ceil(clinic.clinicRating * 2) / 2).toFixed(1),
  );
  const overall = [
    {
      name: 'Staffs Communication',
      rate: clinic.rating1,
    },
    {
      name: 'Responsiveness',
      rate: clinic.rating2,
    },
    {
      name: 'Patient Satisfaction',
      rate: clinic.rating3,
    },
    {
      name: 'Extensive Facilities',
      rate: clinic.rating4,
    },
    {
      name: 'Comfort & Cleanliness',
      rate: clinic.rating5,
    },
    {
      name: 'Convenient Location',
      rate: clinic.rating6,
    },
  ];

  return (
    <SafeAreaView
      style={[BaseStyle.safeAreaView]}
      forceInset={{ top: 'always' }}
    >
      <Header
        title="Reviews"
        style={{ marginBottom: 10 }}
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ margin: 10 }}>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 10,
            alignItems: 'flex-start',
          }}
        >
          <Text title2 bold style={{ marginBottom: 10 }}>
            {reviews.length} Reviews
          </Text>
          <StarRating
            buttonStyle={{ marginHorizontal: 2 }}
            disabled={true}
            starSize={20}
            maxStars={5}
            rating={rating}
            selectedStar={() => {}}
            fullStarColor={BaseColor.blueColor}
          />
        </View>
        <FlatList
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          data={overall}
          keyExtractor={(item, index) => item.name}
          renderItem={data => (
            <View
              key={data.item.name}
              style={{
                marginVertical: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text body1>{data.item.name}</Text>
              <StarRating
                buttonStyle={{ marginHorizontal: 1 }}
                disabled={true}
                starSize={14}
                maxStars={5}
                rating={data.item.rate}
                selectedStar={() => {}}
                fullStarColor={BaseColor.blueColor}
              />
            </View>
          )}
        />
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => item.id || index}
          renderItem={data => (
            <ReviewItem
              style={{
                paddingTop: 20,
              }}
              key={data.item.id}
              name={data.item.nickName}
              image={data.item.imgProfile}
              date={`${data.item.monthOfReview} ${data.item.yearOfReview}`}
              rate={data.item.starRating}
              comment={data.item.reviewComment}
              treatments={data.item.procedureDone}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

ReviewList.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ReviewList.defaultProps = {
  style: {},
};

export default ReviewList;
