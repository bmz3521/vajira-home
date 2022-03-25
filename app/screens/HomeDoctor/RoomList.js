import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, BookingTabLobby } from '@components';
import { getAppUserIdentity } from '@services/appUserService';
import { getDoctorBookings } from '@services/bookingService';
import * as Utils from '@utils';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import {
  checkUserDetail,
  fetchUserInfoByPatientId,
} from '@services/userInfoService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Ionics from 'react-native-vector-icons/Ionicons';
const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const RoomListDetail = ({
  navigation,
  patientStatus,
  onReload,
  trigger,
  roles,
  setLoad,
  load,
  patientDetails,
  setPatientDetails,
}) => {
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [refreshing, setRefreshing] = useState(false);
  const [dataPatient, setDataPatient] = useState(false);

  useEffect(() => {
    fetchUserDoctorInfo();
  }, [trigger]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    onReload();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const fetchUserDoctorInfo = async () => {
    setLoad(true);
    // const bookingData = await getDoctorBookings();
    let bookingData = [];

    const ACCESS_TOKEN = await getAccessToken();
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/Bookings?filter[include]=doctor&filter[include]=patient&filter[include]=prescription&access_token=${ACCESS_TOKEN.id}`,
      );
      bookingData = data;
    } catch (error) {
      console.log('error ', error);
    }

    const bookDataFromBookId = patientStatus.filter(
      bookitem => bookingData.bookingId === bookitem.id,
    );
    // if (!patientStatus.length) {
    //   setPatientDetails([]);
    // }
    if (patientStatus.length < patientDetails.length && patientDetails.length) {
      let detailsData = patientDetails;
      let newData = [];
      for (let ps of patientStatus) {
        newData = detailsData.map(data => {
          if (data.bookingId === ps.bookingId) {
            return data;
          }
        });
        newData = newData.filter(item => item !== undefined);
      }
      setPatientDetails(newData);
    }

    await patientStatus.forEach(async ps => {
      if (patientDetails && patientStatus.length) {
        const patientDetailsData = patientDetails;
        const checkDuplicate = patientDetailsData.some(
          item => item.bookingId === ps.bookingId,
        );
        let response = [];

        //Check => If this bookingId is already in the patientDetails, Just skip the Fetch info section(Use old info)
        if (!checkDuplicate) {
          // const response = await getAppUserIdentity(ps.userId);

          const ACCESS_TOKEN = await getAccessToken();
          try {
            const { data } = await axios.get(
              `${config.VA_API_URL}/AppUserIdentities?filter[where][appUserId]=${ps.userId}&access_token=${ACCESS_TOKEN.id}`,
            );
            response = data.sort((a, b) => b.id - a.id);
          } catch (error) {
            console.log('error ', error);
          }
          console.log('response....', response);

          if (response && response[0].everOmaId && response[0].appUserId) {
            await AsyncStorage.setItem('USER_TYPE', 'USER');
            const resUserInfo = await checkUserDetail(response[0].everOmaId);
            const resUser = await fetchUserInfoByPatientId(
              response[0].everOmaId,
            );
            await AsyncStorage.setItem('USER_TYPE', 'DOCTOR');
            let prescriptions = bookingData;

            prescriptions = await prescriptions.filter(res => {
              if (
                roles === 'pharmacy' &&
                res.prescription &&
                res.prescription.status
              ) {
                return [
                  'PHARMACY_PENDING_RX',
                  'PHARMACY_CONFIRM_RX',
                  'PATIENT_PENDING_PAYMENT',
                  'PATIENT_SUCCESS_PAYMENT',
                  'PATIENT_DECLINE_PAYMENT',
                  'WAIT_FOR_PATIENT_EMS',
                  'WAIT_FOR_PATIENT_PHARMACY',
                  'WAIT_FOR_PATIENT_PHAMACYSTORE',
                  'SUCCESS_BY_PHARMACY',
                  'WAIT_FOR_PHARMACYSTORE_NOTIFY',
                ].includes(res.prescription.status);
              }
              if (
                roles === 'pharmacyStore' &&
                res.prescription &&
                res.prescription.status
              ) {
                return [
                  'WAIT_FOR_PHARMACYSTORE_NOTIFY',
                  'WAIT_FOR_PATIENT_PHAMACYSTORE',
                  'SUCCESS_BY_PHARMACYSTORE',
                  'CANCELED_BY_PATIENT',
                  'CANCELED_BY_PHARMACYSTORE',
                ].includes(res.prescription.status);
              }
            });

            const dataBooking = bookingData.filter(
              item => ps.bookingId === item.id,
            );
            prescriptions = prescriptions.filter(
              item => ps.bookingId === item.id,
            );

            let details = [];
            const detailData = {
              doctor: dataBooking[0].doctor,
              bookingTime: dataBooking[0].bookingTime,
              bookingEndTime: dataBooking[0].bookingEndTime,
              metaclinic: bookDataFromBookId[0].metaclinic,
              ...ps,
              ...resUserInfo,
              user: resUser,
              id: response.userId,
              patientId: response.omaId,
              vnNumber: dataBooking[0].vnNumber,
              prescriptions,
            };
            details.push(detailData);
            setPatientDetails([...patientDetails, ...details]);
          }
        }
      }
    });
    setLoad(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
      scrollEventThrottle={8}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="black"
        />
      }
    >
      {patientDetails?.map((patientDetail, index) => (
        <BookingTabLobby
          key={index}
          onPress={() =>
            navigation.navigate('TestCall', {
              patientInfo: patientDetail || {},
            })
          }
          loading={load}
          patientDetail={patientDetail}
        />
      ))}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.appoitnmentText}>ดึงเพื่อโหลดข้อมูลอีกครั้ง</Text>
        <Ionics size={55} name="arrow-down" color="#ccc" />
      </View>
    </ScrollView>
  );
};

export default RoomListDetail;
