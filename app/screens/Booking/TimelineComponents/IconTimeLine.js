/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class IconTimeLine extends Component {
  constructor() {
    super();
    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        icon: require('../img/place_holder.png'),
      },
      { time: '12:00', title: 'lunch', icon: require('../img/place_holder.png') },
      {
        time: '14:00',
        title: 'Event 3',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '16:30',
        title: 'Event 4',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        icon: require('../img/place_holder.png'),
      },
    ];
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <View style={styles.container}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Icon TimeLine Example
        </Text>
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor="rgba(0,0,0,0)"
          lineColor="rgb(45,156,219)"
          timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#ff9797',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: 'gray' }}
          options={{
            style: { paddingTop: 5 },
          }}
          innerCircle={'icon'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
