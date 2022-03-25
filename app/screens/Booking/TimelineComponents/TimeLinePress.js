/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class TimeLinePress extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.data = [
      {
        time: '09:00',
        title: 'Event 1',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        icon: require('../img/place_holder.png'),
      },
      { time: '12:00', title: 'lunch', icon: require('../img/place_holder.png') },
      {
        time: '14:00',
        title: 'Event 3',
        description:
          'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
        lineColor: '#009688',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '16:30',
        title: 'Event 4',
        description:
          'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        icon: require('../img/place_holder.png'),
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
      <View style={styles.container}>
        <Text
          style={{
            padding: 16,
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          TImeline Press Example
        </Text>
        {this.renderSelected()}
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
