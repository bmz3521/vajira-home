import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import Slider from 'react-native-slider';
import { BaseColor } from '@config';
import { Text, Icon } from '@components';

const SliderBar = ({ value, label, onValueChange, setScrollEnabled }) => {
  return (
    <View>
      <Text
        title2
        primaryColor
        bold
        style={{ marginTop: 20, alignSelf: 'center' }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => onValueChange(value > 1 ? value - 1 : 1)}
          style={{
            marginLeft: 10,
            marginBottom: 8,
            alignSelf: 'flex-end',
            padding: 5,
          }}
        >
          <Icon name="minus" size={15} color={BaseColor.grayColor} />
        </TouchableHighlight>
        <View style={{ flex: 1, marginHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text caption1>Day</Text>
            <Text caption1>Year</Text>
          </View>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={365}
            value={value}
            maximumTrackTintColor="#ECECEC"
            minimumTrackTintColor={BaseColor.primaryColor}
            thumbTintColor={BaseColor.primaryColor}
            onValueChange={value => onValueChange(value)}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />
        </View>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => onValueChange(value < 365 ? value + 1 : 365)}
          style={{
            marginRight: 10,
            marginBottom: 8,
            alignSelf: 'flex-end',
            padding: 5,
          }}
        >
          <Icon name="plus" size={15} color={BaseColor.grayColor} />
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SliderBar;
