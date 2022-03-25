import React from 'react';
import { CalendarList } from 'react-native-calendars';
import { View } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';
import { useHooks } from './hooks';

function SelectTreatmentTimeSlot(props) {
  const { navigation } = props;
  const { ready, timeFormat, markTime, minDate, events } = useHooks(props);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="Please Select Time Slot"
        // subTitle="The clinic will confirm available time again in Live Messaging after booking inquiry"
        renderLeft={() => {
          return (
            <Icon name="chevron-left" size={20} color={BaseColor.primaryColor} />
          );
        }}
        renderRight={() => {
          return (
            <Text headline primaryColor>
              Reset
            </Text>
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          events.reset();
        }}
        style={{ marginVertical: 20 }}
      />
      <View style={[styles.resultContainer]}>
        <View style={[styles.result]}>
          <Text body2>{timeFormat}</Text>
        </View>
      </View>
      <View style={[styles.container]}>
        <CalendarList
          style={{ width: '100%' }}
          theme={{
            todayTextColor: 'black',
            'stylesheet.day.period': {
              base: {
                overflow: 'hidden',
                height: 34,
                alignItems: 'center',
                width: 38,
              },
            },
          }}
          minDate={minDate}
          onDayPress={events.onChangeDate()}
          firstDay={0}
          markedDates={markTime}
          markingType="period"
          pastScrollRange={0}
          futureScrollRange={3}
          scrollEnabled={true}
          showScrollIndicator={true}
        />
      </View>
      <View style={[styles.footer]}>
        <Button
          disabled={!ready}
          full
          flat
          onPress={events.onNext()}
          style={{ backgroundColor: '#284F30' }}
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default SelectTreatmentTimeSlot;
