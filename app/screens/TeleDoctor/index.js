import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, View, Text } from 'react-native';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import axios from 'axios';
import _ from 'lodash';
import Loading from './loading';
import styles from './style';
import config from '@_config';
import Specialisation from './routes/Specialisation';

const TeleDoctor = ({ navigation }) => {
  const telemedicine = useSelector(state => state.telemedicine);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const { name, id, role } = telemedicine.data.symptom;

  useEffect(() => {
    if (role !== undefined) {
      fetchOtherList();
    } else {
      // doctor wont have the role field
      fetchDoctorList();
    }
  }, []);

  const fetchDoctorList = () => {
    axios
      .get(
        `${config.VA_API_URL}/DoctorTypes/${id}/appUsers?filter[order]=employeeId`,
      )
      .then(response => {
        setLoading(false);
        setDoctors(response.data);
      })
      .catch(error => {
        console.log('error fetching doctor list', error);
      });
  };

  const fetchOtherList = () => {
    axios
      .get(
        `${config.VA_API_URL}/OtherTypes/getAppUserByOtherTypeId?otherTypeId=${id}`,
      )
      .then(response => {
        setLoading(false);
        setDoctors(response.data);
      })
      .catch(error => {
        console.log('error fetching other List', error);
      });
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={name ? name : 'แพทย์'}
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />

      {loading ? (
        <View style={{ alignItems: 'center', marginTop: 355 }}>
          <Loading></Loading>
        </View>
      ) : (
        <View>
          {_.isEmpty(doctors) ? (
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text grayColor>ไม่พบข้อมูล</Text>
            </View>
          ) : (
            <Specialisation
              name={name}
              appUsers={doctors}
              navigation={navigation}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default TeleDoctor;
