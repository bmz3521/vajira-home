/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class TemplateTimeLine extends Component {
  constructor() {
    super();
    this.data = [
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '10:45',
        title: 'Event 2',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently.',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '12:00',
        title: 'Event 3',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '14:00',
        title: 'Event 4',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        icon: require('../img/place_holder.png'),
      },
      {
        time: '16:30',
        title: 'Event 5',
        description:
          'It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
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
          Template TImeline Example
        </Text>
        <Timeline
          style={styles.list}
          data={this.data}
          //separator={true}
          circleSize={20}
          circleColor="rgba(0,0,0,0)"
          //circleStyle={{borderWidth:1}}
          //dotColor='yellow'
          //lineWidth={2}
          //lineColor='rgb(45,156,219)'
          //timeTextStyle={{color:'green'}}
          //timeContainerStyle={{minWidth: 65}}
          //titleStyle={{color:'green'}}
          //descriptionStyle={{color:'red'}}
          innerCircle={'icon'}
          //iconStyle={{backgroundColor:'white'}}
          //separatorStyle={{backgroundColor: 'green'}}
          //scrollEnabled={false}
          options={{}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
});
