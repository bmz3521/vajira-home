import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {
  Header,
  SafeAreaView,
  Icon,
  Image,
  DrugCard,
  TimeImage,
} from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { connect } from 'react-redux';
import { getAccessToken } from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import styles from './styles';
import tempDrugs from './tempDrugs';
import {
  cancelMultipleNotification,
  cancelGroupNotification,
  TAG_MORNING_BM,
  TAG_MORNING_AM,
} from '@utils/localNotificationHelper';

function MonitorDrugCompliance1({ navigation, user }) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState(false);
  const [step, setStep] = useState(0);
  const [dataToUpdate, setDataToUpdate] = useState([]);
  const [timeImage, setTimeImage] = useState('MORNING');
  const [tempTime, setTempTime] = useState({
    begin: '06:00',
    end: '11:00',
    eat: '07:00',
  });
  const [before, setBefore] = useState([]);
  const [after, setAfter] = useState([]);
  const [beforeNotTaken, setBeforeNotTaken] = useState(false);
  const [afterNotTaken, setAfterNotTaken] = useState(false);
  const [checkBeforeForgot, setCheckBeforeForgot] = useState(false);
  const [checkAfterForgot, setCheckAfterForgot] = useState(false);
  const [checkBeforeNotTime, setCheckBeforeNotTime] = useState(false);
  const [checkAfterNotTime, setCheckAfterNotTime] = useState(false);
  const [tagTime, setTagTime] = useState('');

  const fetchTime = value => {
    const timeFormat = 'HH:mm:ss';
    let time;

    // time = moment('06:00:01', timeFormat);
    // time = moment();

    // value === moment().format()
    time = moment(value).format('HH:mm:ss');

    let begin = tempTime.begin;
    let end = tempTime.end;

    if (user?.data?.userInformation?.drugTime?.morning) {
      let beginTime = user?.data?.userInformation?.drugTime?.morning?.begin;
      let endTime = user?.data?.userInformation?.drugTime?.morning?.end;

      begin = moment(beginTime).format('HH:mm');
      end = moment(endTime).format('HH:mm');
    }

    if (
      moment(time, timeFormat).isBetween(
        moment(begin, timeFormat),
        moment(end, timeFormat),
      )
    ) {
      return 'MORNING';
    } else {
      return '';
    }
  };

  const checkTaken = async (token, beforeList, afterList, time) => {
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/drugComplianceLogs?access_token=${token.id}&filter[where][userId]=${user.data.userInformation.userId}`,
      );

      let beforeTaken = false;
      let afterTaken = false;
      let beforeForgot = false;
      let afterForgot = false;
      let beforeNotTime = false;
      let afterNotTime = false;

      console.log('data taken');
      console.log(data);

      let begin = tempTime.begin;
      let end = tempTime.end;

      if (user?.data?.userInformation?.drugTime?.morning) {
        let beginTime = user?.data?.userInformation?.drugTime?.morning?.begin;
        let eatTime = user?.data?.userInformation?.drugTime?.morning?.eat;
        let endTime = user?.data?.userInformation?.drugTime?.morning?.end;

        begin = moment(beginTime).format('HH:mm');
        end = moment(endTime).format('HH:mm');

        setTempTime({
          begin: moment(beginTime).format('HH:mm'),
          end: moment(endTime).format('HH:mm'),
          eat: moment(eatTime).format('HH:mm'),
        });
      }

      if (data !== null && data !== undefined && data.length > 0) {
        if (beforeList.length > 0) {
          const tempList = [];
          beforeList.forEach(item => tempList.push(item.drugComplianceTypeId));

          let result;

          result = data.filter(
            item =>
              tempList.includes(item.drugComplianceId) &&
              moment().isSame(item.timestamp, 'date') &&
              time === fetchTime(item.timestamp),
          );

          if (result.length > 0) {
            beforeTaken = true;
          } else {
            const timeFormat = 'HH:mm:ss';

            let isToolate =
              !moment().isBetween(
                moment(begin, timeFormat),
                moment(end, timeFormat),
              ) && !moment().isBefore(moment(begin, timeFormat));

            let isNotTime = moment().isBefore(moment(begin, timeFormat));

            beforeForgot = isToolate;
            beforeNotTime = isNotTime;
          }
        }

        if (afterList.length > 0) {
          const tempList = [];
          afterList.forEach(item => tempList.push(item.drugComplianceTypeId));

          let result;

          result = data.filter(
            item =>
              tempList.includes(item.drugComplianceId) &&
              moment().isSame(item.timestamp, 'date') &&
              fetchTime(item.timestamp) === time,
          );

          if (result.length > 0) {
            afterTaken = true;
          } else {
            const timeFormat = 'HH:mm:ss';

            let isToolate =
              !moment().isBetween(
                moment(begin, timeFormat),
                moment(end, timeFormat),
              ) && !moment().isBefore(moment(begin, timeFormat));

            let isNotTime = moment().isBefore(moment(begin, timeFormat));

            afterForgot = isToolate;
            afterNotTime = isNotTime;
          }
        }

        return {
          beforeTaken,
          afterTaken,
          beforeForgot,
          afterForgot,
          beforeNotTime,
          afterNotTime,
        };

        // console.log(moment().isSame(time, 'date'));
      } else {
        if (beforeList.length > 0) {
          const tempList = [];
          beforeList.forEach(item => tempList.push(item.drugComplianceTypeId));

          const timeFormat = 'HH:mm:ss';

          let isToolate =
            !moment().isBetween(
              moment(begin, timeFormat),
              moment(end, timeFormat),
            ) && !moment().isBefore(moment(begin, timeFormat));

          let isNotTime = moment().isBefore(moment(begin, timeFormat));

          beforeForgot = isToolate;
          beforeNotTime = isNotTime;
        }

        if (afterList.length > 0) {
          const tempList = [];
          afterList.forEach(item => tempList.push(item.drugComplianceTypeId));

          const timeFormat = 'HH:mm:ss';

          let isToolate =
            !moment().isBetween(
              moment(begin, timeFormat),
              moment(end, timeFormat),
            ) && !moment().isBefore(moment(begin, timeFormat));

          let isNotTime = moment().isBefore(moment(begin, timeFormat));

          afterForgot = isToolate;
          afterNotTime = isNotTime;
        }

        return {
          beforeTaken,
          afterTaken,
          beforeForgot,
          afterForgot,
          beforeNotTime,
          afterNotTime,
        };
      }
    } catch (error) {
      console.log('error fetchTaken', error);
    }
  };

  const cancelOldDrugs = async oldDrugs => {
    console.log('oldDrugs...');
    console.log(oldDrugs);

    const ACCESS_TOKEN = await getAccessToken();

    setSaving(true);

    oldDrugs.forEach(async item => {
      try {
        await axios.post(
          `${config.VA_API_URL}/drugCompliances/updateDrugQty?access_token=${ACCESS_TOKEN.id}`,
          {
            drugId: item.id,
            qty: item.qty - item.usedQty,
            calculate: 'plus',
          },
        );
        setSaving(false);
        console.log('CANCEL OLD DRUGS:: saving to updateDrugQty...');
      } catch (error) {
        setSaving(false);
        console.log('CANCEL OLD DRUGS:: error from updateDrugQty', error);
      }
    });
  };

  // https://api.telemed.vajira.everapp.io/api/drugCompliances/latestPrescription?userId=516&filter[include]=drugComplianceType

  // https://dev.api.vajira.telemed.everapp.io/api/drugCompliances/latestPrescription?userId=26&filter[include]=drugComplianceType

  const fetchDrugs = async () => {
    const ACCESS_TOKEN = await getAccessToken();
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/drugCompliances?filter[where][userId]=${user.data.userInformation.userId}&filter[include]=drugComplianceType&access_token=${ACCESS_TOKEN.id}`,
      );

      // const data = tempDrugs;

      console.log('data >>>>');
      console.log(data);

      if (data !== null) {
        let available = [];

        available = data.filter(
          item =>
            item.status === true &&
            item.drugComplianceTypeId !== null &&
            item.usedQty !== item.qty &&
            item.usedQty < item.qty,
        );

        if (available.length > 0) {
          const morning = available.filter(
            item =>
              item.drugComplianceType.logic.includes('BM') ||
              item.drugComplianceType.logic.includes('AM'),
          );

          const morningBefore = morning.filter(item =>
            item.drugComplianceType.logic.includes('BM'),
          );
          const morningAfter = morning.filter(item =>
            item.drugComplianceType.logic.includes('AM'),
          );

          const oldDrugs = [];

          for (let i of morningBefore) {
            for (let j of morningBefore) {
              if (i.id !== j.id) {
                if (i.name === j.name) {
                  const indexI = morningBefore.indexOf(i);
                  const indexJ = morningBefore.indexOf(j);

                  if (moment(i.created_at).isBefore(moment(j.created_at))) {
                    oldDrugs.push(i);
                    morningBefore.splice(indexI, 1);
                  } else {
                    oldDrugs.push(j);
                    morningBefore.splice(indexJ, 1);
                  }
                }
              }
            }
          }

          for (let i of morningAfter) {
            for (let j of morningAfter) {
              if (i.id !== j.id) {
                if (i.name === j.name) {
                  const indexI = morningAfter.indexOf(i);
                  const indexJ = morningAfter.indexOf(j);

                  if (moment(i.created_at).isBefore(moment(j.created_at))) {
                    oldDrugs.push(i);
                    morningAfter.splice(indexI, 1);
                  } else {
                    oldDrugs.push(j);
                    morningAfter.splice(indexJ, 1);
                  }
                }
              }
            }
          }

          if (oldDrugs.length > 0) {
            console.log('Calling cancelOldDrugs...');
            cancelOldDrugs(oldDrugs);
          }

          setBefore(morningBefore);
          setAfter(morningAfter);

          const result = await checkTaken(
            ACCESS_TOKEN,
            morningBefore,
            morningAfter,
            'MORNING',
          );

          console.log(result);

          const {
            beforeTaken,
            afterTaken,
            beforeForgot,
            afterForgot,
            beforeNotTime,
            afterNotTime,
          } = result;

          setBeforeNotTaken(beforeTaken);
          setAfterNotTaken(afterTaken);
          setCheckBeforeForgot(beforeForgot);
          setCheckAfterForgot(afterForgot);
          setCheckBeforeNotTime(beforeNotTime);
          setCheckAfterNotTime(afterNotTime);
        } else {
          console.log('No available drugs.');
        }
      }
    } catch (err) {
      if (user?.data?.userInformation?.drugTime?.morning) {
        console.log('No prescriptions - updating drug time...');
        let beginTime = user?.data?.userInformation?.drugTime?.morning?.begin;
        let eatTime = user?.data?.userInformation?.drugTime?.morning?.eat;
        let endTime = user?.data?.userInformation?.drugTime?.morning?.end;

        setTempTime({
          begin: moment(beginTime).format('HH:mm'),
          end: moment(endTime).format('HH:mm'),
          eat: moment(eatTime).format('HH:mm'),
        });
      }
      console.log('error fetching drugs', err);
    }
  };

  const onUpdateDrugs = async () => {
    console.log('dataToUpdate');
    console.log(dataToUpdate);

    const ACCESS_TOKEN = await getAccessToken();

    setSaving(true);

    dataToUpdate.forEach(async item => {
      try {
        await axios.post(
          `${config.VA_API_URL}/drugCompliances/updateDrugQty?access_token=${ACCESS_TOKEN.id}`,
          {
            drugId: item.id,
            qty: 1,
            calculate: 'plus',
          },
        );
        console.log('saving to updateDrugQty...');
      } catch (error) {
        setSaving(false);
        setStep(400);
        console.log('error from updateDrugQty', error);
      }
    });

    dataToUpdate.forEach(async item => {
      try {
        await axios.post(
          `${config.VA_API_URL}/drugComplianceLogs?access_token=${ACCESS_TOKEN.id}`,
          {
            qty: 1,
            medusetime: item.medusetime,
            timestamp: moment().format(),
            drugComplianceId: item.drugComplianceTypeId,
            userId: user.data.userInformation.userId,
          },
        );
        console.log('saving to drugComplianceLogs...');
      } catch (error) {
        setSaving(false);
        setStep(400);
        console.log('error from drugComplianceLogs', error);
      }
    });

    if (Platform.OS === 'ios') {
      cancelMultipleNotification(tagTime);
    } else {
      cancelGroupNotification(tagTime);
    }

    setSaving(false);
    setDataToUpdate([]);
    fetchDrugs();
    setStep(step + 1);
  };

  useEffect(() => {
    fetchDrugs();

    const morning = user?.data?.userInformation?.drugTime?.morning;

    if (morning) {
      setTempTime({
        begin: moment(morning.begin).format('HH:mm'),
        end: moment(morning.end).format('HH:mm'),
        eat: moment(morning.eat).format('HH:mm'),
      });
    }
  }, []);

  if (loading === true) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="การรับประทานยา"
          textStyle={styles.headerText}
          renderLeft={() => {
            return <Icon bold name="chevron-left" size={20} color="#fff" />;
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View>
            <ActivityIndicator size="large" color="0A7C53" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="การรับประทานยา"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.navigate('Home');
        }}
      />
      <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
        <View style={styles.container}>
          <TimeImage
            period={timeImage}
            tempTime={tempTime}
            navigation={navigation}
          />

          <View style={styles.mainContainer}>
            <Text style={styles.title}>แจ้งเตือนการรับประทานยา</Text>
          </View>

          <View style={[styles.subContainer, { marginTop: 10 }]}>
            <View>
              <Text style={styles.subtitle}>ยาก่อนอาหาร</Text>
            </View>
          </View>
          {before.length > 0 ? (
            <DrugCard
              drugs={before}
              image={Images.tempDrug}
              taken={beforeNotTaken}
              checkForgot={checkBeforeForgot}
              checkNotTime={checkBeforeNotTime}
              openModal={() => {
                setTagTime(TAG_MORNING_BM);
                setModal(true);
                setDataToUpdate(before);
              }}
            />
          ) : (
            <View style={styles.noDrugListContainer}>
              <View style={styles.noDrugContainer}>
                <Text style={styles.noDrugText}>
                  ไม่มีรายการยาที่ต้องรับประทาน
                </Text>
              </View>
            </View>
          )}

          <View style={[styles.subContainer, { marginTop: 10 }]}>
            <View>
              <Text style={styles.subtitle}>ยาหลังอาหาร</Text>
            </View>
          </View>
          {after.length > 0 ? (
            <DrugCard
              drugs={after}
              image={Images.tempDrug}
              taken={afterNotTaken}
              checkForgot={checkAfterForgot}
              checkNotTime={checkAfterNotTime}
              openModal={() => {
                setTagTime(TAG_MORNING_AM);
                setModal(true);
                setDataToUpdate(after);
              }}
            />
          ) : (
            <View style={styles.noDrugListContainer}>
              <View style={styles.noDrugContainer}>
                <Text style={styles.noDrugText}>
                  ไม่มีรายการยาที่ต้องรับประทาน
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {modal && (
        <Modal animationType="slide" transparent={true} visible={modal}>
          <View style={styles.centeredView}>
            {step === 0 ? (
              <View style={styles.modalView}>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  1. หยิบยาทั้งหมด
                </Text>
                <View style={styles.modalButtonContainer}>
                  <LinearGradient style={styles.add} colors={['#ccc', '#ccc']}>
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setModal(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ยกเลิก</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    style={styles.add}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setStep(step + 1);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ต่อไป</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            ) : step === 1 ? (
              <View style={styles.modalView}>
                {saving ? (
                  <Text style={[styles.modalText, { color: '#000' }]}>
                    กำลังบันทึกข้อมูล
                  </Text>
                ) : (
                  <>
                    <Text style={[styles.modalText, { color: '#000' }]}>
                      2. ทานยา
                    </Text>
                    <Text style={[styles.modalText, { color: '#fff' }]}>
                      ...
                    </Text>
                  </>
                )}

                {saving ? (
                  <View style={styles.modalButtonContainer} />
                ) : (
                  <View style={styles.modalButtonContainer}>
                    <LinearGradient
                      style={styles.add}
                      colors={['#ccc', '#ccc']}
                    >
                      <TouchableOpacity
                        underlayColor="grey"
                        style={{ width: '100%', alignItems: 'center' }}
                        disabled={false}
                        onPress={() => {
                          setStep(step - 1);
                        }}
                      >
                        <Text style={styles.buttonTextAdd}>ย้อนกลับ</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient
                      style={styles.add}
                      colors={['#0A905F', '#095C3E']}
                    >
                      <TouchableOpacity
                        underlayColor="grey"
                        style={{ width: '100%', alignItems: 'center' }}
                        disabled={false}
                        onPress={async () => {
                          await onUpdateDrugs();
                        }}
                      >
                        <Text style={styles.buttonTextAdd}>ต่อไป</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                )}
              </View>
            ) : step === 400 ? (
              <View style={styles.modalView}>
                <Icon
                  name="times-circle"
                  size={100}
                  style={[styles.okIcon, { color: '#CC4344' }]}
                />
                <Text style={[styles.modalTitle, { color: '#CC4344' }]}>
                  เกิดข้อผิดพลาด
                </Text>

                <Text style={[styles.modalText, { color: '#000' }]}>
                  ไม่สามารถบันทึก
                </Text>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  ได้ในขณะนี้
                </Text>

                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={styles.add}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setStep(0);
                        setModal(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            ) : (
              <View style={styles.modalView}>
                <Icon name="check-circle" size={100} style={styles.okIcon} />
                <Text style={[styles.modalTitle, { color: '#095C3E' }]}>
                  เสร็จสิ้น
                </Text>

                <Text style={[styles.modalText, { color: '#000' }]}>
                  ระบบได้บันทึก
                </Text>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  การรับประทานยา
                </Text>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  ของท่านเรียบร้อยแล้ว
                </Text>

                <View style={styles.modalButtonContainer}>
                  <LinearGradient
                    style={styles.add}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setStep(0);
                        setModal(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ตกลง</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    userTele: state.userTele,
    user: state.user,
  };
}

export default connect(mapStateToProps, null)(MonitorDrugCompliance1);
