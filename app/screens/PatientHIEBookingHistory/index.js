import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BaseStyle } from '@config';
import config from '@_config';
import moment from 'moment';
import { Header, SafeAreaView, Icon } from '@components';
import { setTracking } from '@utils/asyncStorage';
import { BookingsActions } from '@actions';
import styles from './styles';
import axios from 'axios';
import Timeline from './Timeline/Timeline';

function PatientHIEBookingHistory(props) {
  const { navigation, auth, user } = props;
  const [loadingData, setLoadingData] = useState(false);

  const [{ loading, data }, setState] = useReducer(
    (base, next) => ({ ...base, ...next }),
    {
      loading: false,
      data: [],
    },
  );

  useEffect(() => {
    const fetchHIEData = async () => {
      (async () => await setTracking('healthRecordCount'))();
      setLoadingData(true);

      try {
        const response = await axios(
          `${config.apiUrl}/UserInfos/checkUserVisitedByVerifiedFromHIE?patientId=${user.data.id}`,
        );

        let finalData = [];

        response.data.docs.map(userTele => {
          const updated = userTele.diagnoses.map(item => {
            const addedDepartment = {
              diagId: item.diagId,
              diagType: item.diagType,
              diagTypeName: item.diagTypeName,
              doctor: item.doctor,
              doctorName: item.doctorName,
              icd10: item.icd10,
              icd10Name: item.icd10Name,
              icd10ThaiName: item.icd10ThaiName,
              visitDateTime: item.visitDateTime,
              _id: item._id,
              department: userTele.departmentName,
              billingItems: userTele.billingItems,
              labResults: userTele.labResults,
            };

            finalData.push(addedDepartment);

            return addedDepartment;
          });

          return updated;
        });

        let result = finalData
          .sort(function(a, b) {
            return new Date(b.visitDateTime) - new Date(a.visitDateTime);
          })
          .filter(booking => moment(booking.visitDateTime).isBefore(moment()))
          .map((item, index) => {
            return {
              pressAction: () =>
                navigation.navigate('PatientHIEBookingDetail', {
                  item: item,
                  userId: user.data.id,
                }),
              title: {
                content: item.icd10ThaiName,
                style: {
                  color: '#095C3E',
                },
              },
              description: {
                content: item.department,
              },
              doctorName: {
                content: item.doctorName,
              },
              today: { content: false },
              time: {
                content: `${moment(item.visitDateTime).format(
                  'D MMM YYYY',
                )} \n (${moment(item.visitDateTime).format('HH:mm')} น.)
              `,
                style: {
                  color: '#095C3E',
                  fontWeight: 'bold',
                },
              },
              icon: {
                style: {
                  backgroundColor: index === 0 ? '#095C3E' : '#fff',
                  color: index === 0 ? '#095C3E' : '#fff',
                  borderColor: '#095C3E',
                },
              },
            };
          });

        setState({ data: result });
        setLoadingData(false);
      } catch (error) {
        setLoadingData(false);
        console.log('Error fetching HIE data', error);
      }
    };

    const unsubscribe = props.navigation.addListener('focus', () => {
      if (auth?.data?.verifyId && user.data && user.data.id) {
        fetchHIEData();
      }
    });

    return unsubscribe;
  }, [props.navigation]);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="ประวัติสุขภาพ"
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
          <Text style={styles.headFont}>ประวัติการรักษาทั้งหมด</Text>
        </View>
        {loadingData ? (
          <View>
            <View style={{ marginTop: 150 }}>
              <ActivityIndicator size="large" color="0A7C53" />
            </View>
          </View>
        ) : data.length > 0 ? (
          <Timeline
            data={data}
            // TimelineFooter={() =>
            //   loading ? (
            //     <View>
            //       <ActivityIndicator size="large" color="0A7C53" />
            //     </View>
            //   ) : null
            // }
            lineStyle={styles.line}
            eventStyle={{
              marginBottom: 0,
            }}
            contentContainerStyle={({ flex: 1 }, { borderTopLeftRadius: 15 })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => {
            //   setState({ loading: true });

            //   if (data.length !== dataHIE.length + moreData.length) {
            //     setState({
            //       data: data.concat(moreData),
            //       loading: false,
            //     });
            //   } else {
            //     setState({ loading: false });
            //   }
            // }}
          />
        ) : (
          <View style={styles.loading}>
            {auth?.data?.verifyId ? (
              <Text>ไม่พบประวัติการรักษา</Text>
            ) : (
              <Text>ท่านยังไม่ได้รับการยืนยันตัวตน</Text>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => {
  return {
    bookings: state.bookings,
    auth: state.auth,
    userTele: state.userTele,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(BookingsActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientHIEBookingHistory);
