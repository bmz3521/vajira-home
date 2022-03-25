import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TextInput, ScrollView } from 'react-native';
import _ from 'lodash';
import { Text, Icon } from '@components';
import { useDispatch } from 'react-redux';
import { TelemedicineActions } from '@actions';
import { BaseStyle, BaseColor } from '@config';

import DoctorCard from '../components/DoctorCard';
import styles, { Container } from './style';
import { View } from 'react-native-animatable';
import database from '@react-native-firebase/database';

const Specialisation = appUsers => {
  const dispatch = useDispatch();

  // const telemedicine = useSelector(state => state.telemedicine);

  // console.log('navigation in Specialisation:');
  // console.log(appUsers.navigation);
  // console.log('doctor:');
  // console.log(appUsers);

  const [searchText, setSearchText] = useState('');
  const [theStatus, setStatus] = useState('');

  useEffect(() => {
    // console.log('fetching status');
    // var ref = database().ref(`/doctorStatus`);
    // console.log(ref);
    database()
      .ref('/doctorStatus')
      .once('value')
      .then(snapshot => {
        // console.log('User data: ', snapshot.val());
        let data = snapshot.val();
        let status = data.status;
        //  console.log('refff');
        // console.log(snapshot.val());
        setStatus(snapshot.val());
      });
  }, []);

  const optionsFilter = _.filter(appUsers.appUsers, o => {
    return (
      _.includes(_.lowerCase(o.gender), _.lowerCase(searchText)) ||
      _.includes(_.lowerCase(o.fullname), _.lowerCase(searchText))
    );
  });

  // const found = optionsFilter.filter(o1 => this.state.theStatus.some(o2 => o1.id === o2.indexOf() ));

  // const handleCard = doctor => {
  //   const anyName = {
  //     doctor,
  //   }
  // }

  const handleCard = item => {
    const anyName = {
      doctor: item,
    };

    dispatch(TelemedicineActions.setTelemedicine(anyName));

    appUsers.navigation.navigate('TelePharmacyProfile');
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 15,
          paddingHorizontal: 13,
        }}
      >
        <View style={styles.searchSection}>
          <Icon
            name="search"
            color="#8d8d8d"
            solid
            size={20}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setSearchText(text)}
            placeholder="ค้นหาด้วยชื่อ"
            placeholderTextColor={BaseColor.grayColor}
            value={searchText}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={8}
        contentContainerStyle={{ paddingBottom: 300 }}
      >
        <Container>
          {optionsFilter.map((doctor, index) => {
            return (
              <DoctorCard key={index} data={doctor} handleCard={handleCard} />
            );
          })}
        </Container>
      </ScrollView>
      {_.isEmpty(optionsFilter) && (
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Text grayColor>No results</Text>
        </View>
      )}
    </View>
  );
};

export default Specialisation;

// handleCard={doctor => handleCard(doctor)}
