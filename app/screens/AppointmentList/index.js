import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, BookingTab } from '@components';
import moment from 'moment';
import Timeline from './Timeline/Timeline';
import styles from './styles';

export default function AppointmentList({ navigation, route }) {
  const { appointments } = route.params;

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="การนัดหมาย"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.head}>
          <Text style={styles.headFont}>รายการนัดหมายแพทย์ที่โรงพยาบาล</Text>
        </View>
        <Timeline
          data={appointments}
          lineStyle={styles.line}
          eventStyle={{
            marginBottom: 0,
          }}
          contentContainerStyle={{ borderTopLeftRadius: 15 }}
        />
      </View>
    </SafeAreaView>
  );
}
