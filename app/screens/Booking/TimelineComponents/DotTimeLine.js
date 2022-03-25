/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class DotTimeLine extends Component {
  constructor() {
    super();
    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        circleColor: '#009688',
        lineColor: '#009688',
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      },
      {
        time: '14:00',
        title: 'Event 4',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.',
        lineColor: '#009688',
      },
      {
        time: '16:30',
        title: 'Event 5',
        description:
          'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        circleColor: '#009688',
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
          Dot TimeLine Example
        </Text>
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={20}
          circleColor="rgb(45,156,219)"
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
          innerCircle={'dot'}
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
  },
});
