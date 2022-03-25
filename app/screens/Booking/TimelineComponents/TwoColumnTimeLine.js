/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class TwoColumnTmeLine extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);

    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'It is a long established fact that a reader will be distracted by the readable content.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: '12:00',
        title: 'Event 3',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '14:00',
        title: 'Event 4',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
      {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },  {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },  {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },  {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },  {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },  {
        time: '16:30',
        title: 'Event 5',
        description:
          'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://images.pexels.com/photos/2250394/pexels-photo-2250394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250',
      },
    ];
    this.state = { selected: null };
  }

  onEventPress(data) {
    this.setState({ selected: data });
  }

  renderSelected() {
    if (this.state.selected)
      return (
        <Text style={{ marginTop: 10 }}>
          Selected event: {this.state.selected.title} at{' '}
          {this.state.selected.time}
        </Text>
      );
  }

  render() {
    return (
   
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
          onEventPress={this.onEventPress}
          separator={false}
          detailContainerStyle={{
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: '#BBDAFF',
            borderRadius: 10,
          }}
          columnFormat="two-column"
        />
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

{/* <View style={styles.container}>
{this.renderSelected()} */}