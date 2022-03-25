import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Switch,
  TouchableNativeFeedback,
  NativeModules,
} from 'react-native';
import { manageDrugNotiIOS } from '@utils/manageDrugNoti';
import { Bar } from 'react-native-progress';
import Fitness from '@ovalmoney/react-native-fitness';
import { PulseIndicator } from 'react-native-indicators';
import {
  Header,
  SafeAreaView,
  Icon,
  Image,
  ModalGoogleSignIn,
} from '@components';
import { BaseStyle, BaseColor, Images } from '@config';
import { bindActionCreators } from 'redux';
import { UserActions } from '@actions';
import { connect } from 'react-redux';
import styles from './styles';
import { Card } from 'react-native-elements';
import {
  getAccessToken,
  setDrugNoti,
  getDrugNoti,
  setCancelDrugNoti,
  getCancelDrugNoti,
  setListDrugNoti,
  resetNotificationIOS,
  setTracking,
} from '@utils/asyncStorage';
import config from '@_config';
import axios from 'axios';
import moment from 'moment';
import { localNotificationService } from '../../LocalNotificationService';
import MonitorCard from './components/MonitorCard';

const permissions = [
  {
    kind: Fitness.PermissionKinds.Steps,
    access: Fitness.PermissionAccesses.Read,
  },
];

function HealthActivity({ navigation, route, user, actions }) {
  const { CheckInstalledApplication } = NativeModules;
  const [progress, setProgress] = useState(0.0);
  const [steps, setSteps] = useState(0);
  const [morningBeforeAlert, setMorningBeforeAlert] = useState(false);
  const [morningAfterAlert, setMorningAfterAlert] = useState(false);

  const [lunchBeforeAlert, setLunchBeforeAlert] = useState(false);
  const [lunchAfterAlert, setLunchAfterAlert] = useState(false);

  const [eveningBeforeAlert, setEveningBeforeAlert] = useState(false);
  const [eveningAfterAlert, setEveningAfterAlert] = useState(false);

  const [bedBeforeAlert, setBedBeforeAlert] = useState(false);

  const [drugs, setDrugs] = useState({
    morningBefore: false,
    morningAfter: false,
    lunchBefore: false,
    lunchAfter: false,
    eveningBefore: false,
    eveningAfter: false,
    bedBefore: false,
  });

  const [latestGlucose, setLatestGlucose] = useState(null);
  const [latestPressure, setLatestPressure] = useState(null);
  const [latestWeight, setLatestWeight] = useState(null);
  const [latestTemp, setLatestTemp] = useState(null);
  const [latestOxygen, setLatestOxygen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drugNotiBtn, setDrugNotiBtn] = useState(false);
  const [allDrugNotiList, setAllDrugNotiList] = useState([]);
  const [healthkitEnabled, setHealthkitEnabled] = useState(false);
  const refGoogleModal = useRef();
  const risk = user?.data?.userInformation?.thaiCVRick?.result;

  useEffect(() => {
    fetchMonitoringReports();
    fetchDrugs();
    fetchDoctorValues();
    getDrugBtn();
    getAllDrugNoti();
    const type = Platform.OS === 'ios' ? true : false;
    getHealthData(type);

    (async () => await setTracking('diaryCount'))();

    // force call this only when user sets new drug time.
    if (!drugNotiBtn && route?.params?.forceReset) {
      checkResetNoti();
    }
  }, []);

  const checkResetNoti = async () => {
    const notis = await getCancelDrugNoti();

    if (notis.length > 0) {
      await cancelDrugNoti(notis, 'reset');
    }
    sendNewReminder();
  };

  const sendNewReminder = async () => {
    // console.log('enable noti from settime screen sendNewReminder....');
    let checkDrugs = {
      morningBefore: false,
      morningAfter: false,
      lunchBefore: false,
      lunchAfter: false,
      eveningBefore: false,
      eveningAfter: false,
      bedBefore: false,
    };

    const retrieveDrugs = async () => {
      const ACCESS_TOKEN = await getAccessToken();
      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/drugCompliances?filter[where][userId]=${user.data.userInformation.userId}&filter[include]=drugComplianceType&access_token=${ACCESS_TOKEN.id}`,
        );

        if (data !== null || data.length > 0) {
          let available = [];
          available = data.filter(
            item =>
              item.status === true &&
              item.drugComplianceTypeId !== null &&
              item.usedQty !== item.qty &&
              item.usedQty < item.qty,
          );

          let periodToNotify = {
            morningBefore: false,
            morningAfter: false,
            lunchBefore: false,
            lunchAfter: false,
            eveningBefore: false,
            eveningAfter: false,
            bedBefore: false,
          };

          if (available.length > 0) {
            // Morning
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

            for (let i of morningBefore) {
              for (let j of morningBefore) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = morningBefore.indexOf(i);
                    const indexJ = morningBefore.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      morningBefore.splice(indexI, 1);
                    } else {
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
                      morningAfter.splice(indexI, 1);
                    } else {
                      morningAfter.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            if (morningBefore.length > 0) periodToNotify.morningBefore = true;
            if (morningAfter.length > 0) periodToNotify.morningAfter = true;

            // Lunch
            const lunch = available.filter(
              item =>
                item.drugComplianceType.logic.includes('BL') ||
                item.drugComplianceType.logic.includes('AL'),
            );

            const lunchBefore = lunch.filter(item =>
              item.drugComplianceType.logic.includes('BL'),
            );
            const lunchAfter = lunch.filter(item =>
              item.drugComplianceType.logic.includes('AL'),
            );

            for (let i of lunchBefore) {
              for (let j of lunchBefore) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = lunchBefore.indexOf(i);
                    const indexJ = lunchBefore.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      lunchBefore.splice(indexI, 1);
                    } else {
                      lunchBefore.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            for (let i of lunchAfter) {
              for (let j of lunchAfter) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = lunchAfter.indexOf(i);
                    const indexJ = lunchAfter.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      lunchAfter.splice(indexI, 1);
                    } else {
                      lunchAfter.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            if (lunchBefore.length > 0) periodToNotify.lunchBefore = true;
            if (lunchAfter.length > 0) periodToNotify.lunchAfter = true;

            // Evening
            const evening = available.filter(
              item =>
                item.drugComplianceType.logic.includes('BE') ||
                item.drugComplianceType.logic.includes('AE'),
            );

            const eveningBefore = evening.filter(item =>
              item.drugComplianceType.logic.includes('BE'),
            );

            const eveningAfter = evening.filter(item =>
              item.drugComplianceType.logic.includes('AE'),
            );

            for (let i of eveningBefore) {
              for (let j of eveningBefore) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = eveningBefore.indexOf(i);
                    const indexJ = eveningBefore.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      eveningBefore.splice(indexI, 1);
                    } else {
                      eveningBefore.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            for (let i of eveningAfter) {
              for (let j of eveningAfter) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = eveningAfter.indexOf(i);
                    const indexJ = eveningAfter.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      eveningAfter.splice(indexI, 1);
                    } else {
                      eveningAfter.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            if (eveningBefore.length > 0) periodToNotify.eveningBefore = true;
            if (eveningAfter.length > 0) periodToNotify.eveningAfter = true;

            // Bed
            const bed = available.filter(item =>
              item.drugComplianceType.logic.includes('B'),
            );

            for (let i of bed) {
              for (let j of bed) {
                if (i.id !== j.id) {
                  if (i.name === j.name) {
                    const indexI = bed.indexOf(i);
                    const indexJ = bed.indexOf(j);

                    if (moment(i.created_at).isBefore(moment(j.created_at))) {
                      bed.splice(indexI, 1);
                    } else {
                      bed.splice(indexJ, 1);
                    }
                  }
                }
              }
            }

            if (bed.length > 0) periodToNotify.bedBefore = true;

            return periodToNotify;
          } else {
            // console.log('No available drugs.');
            return periodToNotify;
          }
        }
      } catch (err) {
        console.log('error fetching drugs from HealthActivity', err);
      }
    };

    checkDrugs = await retrieveDrugs();

    // console.log('checkDrugs');
    // console.log(checkDrugs);

    const options = {
      soundName: 'default',
      playSound: true,
    };

    if (
      checkDrugs.morningBefore === true ||
      checkDrugs.morningAfter === true ||
      checkDrugs.lunchBefore === true ||
      checkDrugs.lunchAfter === true ||
      checkDrugs.eveningBefore === true ||
      checkDrugs.eveningAfter === true ||
      checkDrugs.bedBefore === true
    ) {
      //  console.log('yes');

      const isOn = await getDrugNoti();

      // if switch is not on, turn it on to enable noti.
      if (!isOn) {
        // set Async Storage
        setDrugNoti(true);
        // set Local state
        setDrugNotiBtn(true);
      }

      let newTime = {
        morning: {
          begin:
            user?.data?.userInformation?.drugTime?.morning?.begin ||
            moment('2021-06-28T06:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.morning?.end ||
            moment('2021-06-28T09:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.morning?.eat ||
            moment('2021-06-28T07:00:00+07:00').format(),
        },
        lunch: {
          begin:
            user?.data?.userInformation?.drugTime?.lunch?.begin ||
            moment('2021-06-28T11:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.lunch?.end ||
            moment('2021-06-28T14:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.lunch?.eat ||
            moment('2021-06-28T12:00:00+07:00').format(),
        },
        evening: {
          begin:
            user?.data?.userInformation?.drugTime?.evening?.begin ||
            moment('2021-06-28T16:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.evening?.end ||
            moment('2021-06-28T18:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.evening?.eat ||
            moment('2021-06-28T17:00:00+07:00').format(),
        },
        bed: {
          begin:
            user?.data?.userInformation?.drugTime?.bed?.begin ||
            moment('2021-06-28T19:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.bed?.end ||
            moment('2021-06-28T23:59:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.bed?.eat ||
            moment('2021-06-28T20:00:00+07:00').format(),
        },
      };

      const beforeMMeal = moment(newTime.morning.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterMMeal = moment(newTime.morning.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeLMeal = moment(newTime.lunch.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterLMeal = moment(newTime.lunch.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeEMeal = moment(newTime.evening.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterEMeal = moment(newTime.evening.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeBMeal = moment(newTime.bed.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');

      const splitMBefore = beforeMMeal.split(':');
      const splitMAfter = afterMMeal.split(':');

      const splitLBefore = beforeLMeal.split(':');
      const splitLAfter = afterLMeal.split(':');

      const splitEBefore = beforeEMeal.split(':');
      const splitEAfter = afterEMeal.split(':');

      const splitBBefore = beforeBMeal.split(':');

      let adjustDate = {
        morning: {
          beforeMeal: checkDrugs.morningBefore
            ? new Date().setHours(
                splitMBefore[0],
                splitMBefore[1],
                splitMBefore[2],
              )
            : null,
          afterMeal: checkDrugs.morningAfter
            ? new Date().setHours(
                splitMAfter[0],
                splitMAfter[1],
                splitMAfter[2],
              )
            : null,
        },
        lunch: {
          beforeMeal: checkDrugs.lunchBefore
            ? new Date().setHours(
                splitLBefore[0],
                splitLBefore[1],
                splitLBefore[2],
              )
            : null,
          afterMeal: checkDrugs.lunchAfter
            ? new Date().setHours(
                splitLAfter[0],
                splitLAfter[1],
                splitLAfter[2],
              )
            : null,
        },
        evening: {
          beforeMeal: checkDrugs.eveningBefore
            ? new Date().setHours(
                splitEBefore[0],
                splitEBefore[1],
                splitEBefore[2],
              )
            : null,
          afterMeal: checkDrugs.eveningAfter
            ? new Date().setHours(
                splitEAfter[0],
                splitEAfter[1],
                splitEAfter[2],
              )
            : null,
        },
        bed: {
          beforeMeal: checkDrugs.bedBefore
            ? new Date().setHours(
                splitBBefore[0],
                splitBBefore[1],
                splitBBefore[2],
              )
            : null,
        },
      };

      let repeatNoti = {
        morning: {
          beforeMeal: [],
          afterMeal: [],
        },
        lunch: {
          beforeMeal: [],
          afterMeal: [],
        },
        evening: {
          beforeMeal: [],
          afterMeal: [],
        },
        bed: {
          beforeMeal: [],
        },
      };

      const notiList = await getCancelDrugNoti();
      const toSaveNotis = [...notiList];

      if (adjustDate?.morning?.beforeMeal) {
        //  console.log('yes morning before meal... ');

        // noti for today
        repeatNoti.morning.beforeMeal.push(adjustDate.morning.beforeMeal);

        // noti for the next 20 days
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.morning.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          // to be used in LocalNotificationService
          repeatNoti.morning.beforeMeal.push(newNoti);

          // to store in Async and to be used when user cancel drug notis
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.morning?.afterMeal) {
        //  console.log('yes morning after meal... ');

        repeatNoti.morning.afterMeal.push(adjustDate.morning.afterMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.morning.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.morning.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.lunch?.beforeMeal) {
        console.log('yes lunch before meal... ');

        repeatNoti.lunch.beforeMeal.push(adjustDate.lunch.beforeMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.lunch.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.lunch.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.lunch?.afterMeal) {
        //  console.log('yes lunch after meal... ');

        repeatNoti.lunch.afterMeal.push(adjustDate.lunch.afterMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.lunch.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.lunch.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.evening?.beforeMeal) {
        console.log('yes evening before meal... ');

        repeatNoti.evening.beforeMeal.push(adjustDate.evening.beforeMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.evening.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.evening.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.evening?.afterMeal) {
        //  console.log('yes evening after meal... ');

        repeatNoti.evening.afterMeal.push(adjustDate.evening.afterMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.evening.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.evening.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.bed?.beforeMeal) {
        //  console.log('yes bed before meal... ');

        repeatNoti.bed.beforeMeal.push(adjustDate.bed.beforeMeal);
        for (let i = 1; i < 90; i++) {
          let addedDays = moment(adjustDate.bed.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.bed.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      // Save in Async Storage
      setCancelDrugNoti(toSaveNotis);
      // Save in local state
      setAllDrugNotiList(toSaveNotis);
      setListDrugNoti(repeatNoti);
      repeatNoti = manageDrugNotiIOS(repeatNoti);
      // console.log('Check if time is not null');
      // console.log(timeToAlert);
      // console.log(new Date(timeToAlert.lunch.beforeMeal));

      localNotificationService.showNotification(
        0,
        'การตั้งค่าเวลาทานยา',
        'อัพเดพเวลาทานยาใหม่เรียบร้อยแล้ว',
        null,
        options,
        repeatNoti,
      );
    } else {
      //  console.log('no');

      const data = {
        nodrugs: true,
      };

      localNotificationService.showNotification(
        0,
        'การตั้งค่าเวลาทานยา',
        'คุณยังไม่มีรายการยา',
        null,
        options,
        data,
      );
    }
  };

  // console.log('allDrugNotiList >>>>>');
  // console.log(allDrugNotiList);

  const getAllDrugNoti = async () => {
    const drugList = await getCancelDrugNoti();
    // console.log('drugList');
    // console.log(drugList);

    setAllDrugNotiList(drugList);
  };

  const getDrugBtn = async () => {
    const isOn = await getDrugNoti();
    setDrugNotiBtn(isOn);
  };

  const checkGoogleFitPackage = async () => {
    const isInstalled = await CheckInstalledApplication.isInstalled(
      'com.google.android.apps.fitness',
    );
    if (isInstalled) {
      refGoogleModal && refGoogleModal.current.show('default');
    } else {
      refGoogleModal && refGoogleModal.current.show('playstore');
    }
  };

  const getHealthData = async type => {
    let isAuthorized = await Fitness.isAuthorized(permissions);
    setHealthkitEnabled(isAuthorized);
    if (!isAuthorized) {
      if (Platform.OS === 'android' && !type) {
        return;
      } else if (Platform.OS === 'android') {
        isAuthorized = await Fitness.requestPermissions(permissions);
        setHealthkitEnabled(isAuthorized);
      }
    }

    if (!isAuthorized) return;

    const getSteps = async () => {
      let currentDate = new Date();
      let period = {
        startDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          0,
          0,
          0,
        ),
        endDate: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59,
        ),
        interval: 'days',
      };

      // console.log('period');
      // console.log(period);
      return await Fitness.getSteps(period);
    };

    const trackedSteps = await getSteps();

    // console.log('trackedSteps');
    // console.log(trackedSteps);

    if (trackedSteps.length > 0) {
      const steps = trackedSteps[0].quantity;
      setSteps(steps);

      if (steps < 500) {
        setProgress(0);
      } else if (steps >= 7000) {
        setProgress(1);
      } else if (steps >= 6500) {
        setProgress(0.92);
      } else if (steps >= 6000) {
        setProgress(0.85);
      } else if (steps >= 5500) {
        setProgress(0.77);
      } else if (steps >= 5000) {
        setProgress(0.7);
      } else if (steps >= 4500) {
        setProgress(0.63);
      } else if (steps >= 4000) {
        setProgress(0.56);
      } else if (steps >= 3500) {
        setProgress(0.49);
      } else if (steps >= 3000) {
        setProgress(0.42);
      } else if (steps >= 2500) {
        setProgress(0.35);
      } else if (steps >= 2000) {
        setProgress(0.28);
      } else if (steps >= 1300) {
        setProgress(0.21);
      } else if (steps >= 501) {
        setProgress(0.14);
      }
    } else {
      return;
    }
  };

  const fetchDoctorValues = async () => {
    try {
      await actions.getUpdateInfo();
      //   console.log('update doctor values successfully!!!!');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      //   console.log('Error updating doctor values', error);
    }
  };

  const fetchMonitoringReports = async () => {
    const ACCESS_TOKEN = await getAccessToken();
    try {
      const { data } = await axios.get(
        `${config.apiUrl}/monitoringReports?access_token=${ACCESS_TOKEN.id}&filter[where][appUserId]=${user.data.userInformation.userId}`,
      );

      // console.log('data');
      // console.log(data);

      // Set Weight
      const weight = data
        .filter(
          item =>
            item.detail.measurements.weightMeasurements !== false &&
            item.detail.measurements.weightMeasurements !== undefined,
        )
        .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

      if (weight !== null && weight !== undefined && weight.length > 0) {
        let latest = weight[0].detail.measurements.weightMeasurements.bmi;

        let result;
        let color;

        if (latest < 18.5) {
          result = 'ต่ำกว่าเกณฑ์';
          color = '#3997EA';
        } else if (latest >= 18.5 && latest <= 22.99) {
          result = 'เกณฑ์ดี';
          color = '#0AB678';
        } else {
          result = 'สูงกว่าเกณฑ์';
          color = '#CC4343';
        }

        setLatestWeight({ bmi: latest, result: result, color: color });
      }

      // Set Temperature
      const temp = data
        .filter(
          item =>
            item.detail.measurements.temperatureMeasurements !== false &&
            item.detail.measurements.temperatureMeasurements !== undefined,
        )
        .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

      if (temp !== null && temp !== undefined && temp.length > 0) {
        let latest =
          temp[0].detail.measurements.temperatureMeasurements.celsius;

        let result;
        let color;

        if (latest < 35.0) {
          result = 'ต่ำกว่าเกณฑ์';
          color = '#3997EA';
        } else if (latest >= 35.0 && latest <= 37.8) {
          result = 'เกณฑ์ดี';
          color = '#0AB678';
        } else {
          result = 'สูงกว่าเกณฑ์';
          color = '#CC4343';
        }

        setLatestTemp({ celsius: latest, result: result, color: color });
      }

      // Set Oxygen
      const oxygen = data
        .filter(
          item =>
            item.detail.measurements.oxygenMeasurements !== false &&
            item.detail.measurements.oxygenMeasurements !== undefined,
        )
        .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

      if (oxygen !== null && oxygen !== undefined && oxygen.length > 0) {
        let latest = oxygen[0].detail.measurements.oxygenMeasurements.percent;

        let result;
        let color;

        if (latest < 90) {
          result = 'ต่ำกว่าปกติ';
          color = '#CC4343';
        } else if (latest >= 90 && latest <= 95) {
          result = 'เฝ้าระวังอาการ';
          color = '#E6B285';
        } else {
          result = 'ปกติดี';
          color = '#0AB678';
        }

        setLatestOxygen({ percent: latest, result: result, color: color });
      }

      // Set Glucose
      const glucose = data
        .filter(
          item =>
            item.detail.measurements.glucoseMeasurements !== false &&
            item.detail.measurements.glucoseMeasurements !== undefined,
        )
        .sort(
          (a, b) => new Date(b.detail.timeStamp) - new Date(a.detail.timeStamp),
        );

      if (glucose !== null && glucose !== undefined && glucose.length > 0) {
        let latest = glucose[0].detail.measurements.glucoseMeasurements.glucose;

        let result;
        let color;

        const glucoseLow = parseInt(
          user.data.userInformation.defaultGlucoseValue[0],
        );
        const glucoseHigh = parseInt(
          user.data.userInformation.defaultGlucoseValue[1],
        );

        if (latest < glucoseLow) {
          result = 'ต่ำกว่าเกณฑ์';
          color = '#CC4343';
        } else if (latest >= glucoseLow && latest <= glucoseHigh) {
          result = 'เกณฑ์ดี';
          color = '#0AB678';
        } else {
          result = 'สูงกว่าเกณฑ์';
          color = '#3997EA';
        }

        setLatestGlucose({ glucose: latest, result: result, color: color });
      }

      // Set Pressure
      const pressure = data
        .filter(
          item =>
            item.detail.measurements.pressureMeasurements !== false &&
            item.detail.measurements.pressureMeasurements !== undefined,
        )
        .sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt));

      if (pressure !== null && pressure !== undefined && pressure.length > 0) {
        let high = pressure[0].detail.measurements.pressureMeasurements.high;
        let low = pressure[0].detail.measurements.pressureMeasurements.low;

        let defaultTopHigh =
          user.data.userInformation.defaultPressureMeasurementsAbove[1];
        let defaultTopLow =
          user.data.userInformation.defaultPressureMeasurementsAbove[0];
        let defaultBottomHigh =
          user.data.userInformation.defaultPressureMeasurementsBelow[1];
        let defaultBottomLow =
          user.data.userInformation.defaultPressureMeasurementsBelow[0];

        let result;
        let color;

        if (
          high >= defaultTopLow &&
          high <= defaultTopHigh &&
          low >= defaultBottomLow &&
          low <= defaultBottomHigh
        ) {
          result = 'เกณฑ์ดี';
          color = '#0AB678';
        } else if (high > defaultTopHigh || low > defaultBottomHigh) {
          result = 'สูงกว่าเกณฑ์';
          color = '#CC4343';
        } else if (high < defaultTopLow || low < defaultBottomLow) {
          result = 'ต่ำกว่าเกณฑ์';
          color = '#3997EA';
        }

        setLatestPressure({
          high: high,
          low: low,
          result: result,
          color: color,
        });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      //   console.log('Error From HealthActivity', error);
    }
  };

  const fetchTime = value => {
    const timeFormat = 'HH:mm:ss';
    let time;

    let beginMorning = '07:00';
    let endMorning = '11:00';
    let beginLunch = '11:00';
    let endLunch = '14:00';
    let beginEvening = '14:00';
    let endEvening = '19:00';
    let beginBed = '19:00';
    let endBed = '23:00';

    if (user?.data?.userInformation?.drugTime?.morning) {
      let begin = user?.data?.userInformation?.drugTime?.morning?.begin;
      let end = user?.data?.userInformation?.drugTime?.morning?.end;

      beginMorning = moment(begin).format('HH:mm');
      endMorning = moment(end).format('HH:mm');
    }

    if (user?.data?.userInformation?.drugTime?.lunch) {
      let begin = user?.data?.userInformation?.drugTime?.lunch?.begin;
      let end = user?.data?.userInformation?.drugTime?.lunch?.end;

      beginLunch = moment(begin).format('HH:mm');
      endLunch = moment(end).format('HH:mm');
    }

    if (user?.data?.userInformation?.drugTime?.evening) {
      let begin = user?.data?.userInformation?.drugTime?.evening?.begin;
      let end = user?.data?.userInformation?.drugTime?.evening?.end;

      beginEvening = moment(begin).format('HH:mm');
      endEvening = moment(end).format('HH:mm');
    }

    if (user?.data?.userInformation?.drugTime?.bed) {
      let begin = user?.data?.userInformation?.drugTime?.bed?.begin;
      let end = user?.data?.userInformation?.drugTime?.bed?.end;

      beginBed = moment(begin).format('HH:mm');
      endBed = moment(end).format('HH:mm');
    }

    if (value === 'now') {
      // time = moment('07:00:01', timeFormat);
      time = moment();

      if (
        time.isBetween(
          moment(beginMorning, timeFormat),
          moment(endMorning, timeFormat),
        )
      ) {
        return 'MORNING';
      } else if (
        time.isBetween(
          moment(beginLunch, timeFormat),
          moment(endLunch, timeFormat),
        )
      ) {
        return 'LUNCH';
      } else if (
        time.isBetween(
          moment(beginEvening, timeFormat),
          moment(endEvening, timeFormat),
        )
      ) {
        return 'EVENING';
      } else if (
        time.isBetween(moment(beginBed, timeFormat), moment(endBed, timeFormat))
      ) {
        return 'BED';
      }
    } else {
      time = moment(value).format('HH:mm:ss');

      if (
        moment(time, timeFormat).isBetween(
          moment(beginMorning, timeFormat),
          moment(endMorning, timeFormat),
        )
      ) {
        return 'MORNING';
      } else if (
        moment(time, timeFormat).isBetween(
          moment(beginLunch, timeFormat),
          moment(endLunch, timeFormat),
        )
      ) {
        return 'LUNCH';
      } else if (
        moment(time, timeFormat).isBetween(
          moment(beginEvening, timeFormat),
          moment(endEvening, timeFormat),
        )
      ) {
        return 'EVENING';
      } else if (
        moment(time, timeFormat).isBetween(
          moment(beginBed, timeFormat),
          moment(endBed, timeFormat),
        )
      ) {
        return 'BED';
      } else {
        return '';
      }
    }

    return '';
  };

  const checkTaken = async (token, beforeList, afterList, bedList, time) => {
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/drugComplianceLogs?access_token=${token.id}&filter[where][userId]=${user.data.userInformation.userId}`,
      );

      let beforeTaken = false;
      let afterTaken = false;
      let bedTaken = false;

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
          }
        }

        if (bedList.length > 0) {
          const tempList = [];
          bedList.forEach(item => tempList.push(item.drugComplianceTypeId));

          let result;

          result = data.filter(
            item =>
              tempList.includes(item.drugComplianceId) &&
              moment().isSame(item.timestamp, 'date') &&
              fetchTime(item.timestamp) === time,
          );

          if (result.length > 0) {
            bedTaken = true;
          }
        }

        return { beforeTaken, afterTaken, bedTaken };
      } else {
        return { beforeTaken, afterTaken, bedTaken };
      }
    } catch (error) {
      console.log('error fetchTaken', error);
    }
  };

  const checkDrugsForNotification = available => {
    // Morning
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

    if (morningBefore.length > 0)
      setDrugs(prevState => ({ ...prevState, morningBefore: true }));
    if (morningAfter.length > 0)
      setDrugs(prevState => ({ ...prevState, morningAfter: true }));

    // Lunch
    const lunch = available.filter(
      item =>
        item.drugComplianceType.logic.includes('BL') ||
        item.drugComplianceType.logic.includes('AL'),
    );

    const lunchBefore = lunch.filter(item =>
      item.drugComplianceType.logic.includes('BL'),
    );
    const lunchAfter = lunch.filter(item =>
      item.drugComplianceType.logic.includes('AL'),
    );

    if (lunchBefore.length > 0)
      setDrugs(prevState => ({ ...prevState, lunchBefore: true }));
    if (lunchAfter.length > 0)
      setDrugs(prevState => ({ ...prevState, lunchAfter: true }));

    // Evening
    const evening = available.filter(
      item =>
        item.drugComplianceType.logic.includes('BE') ||
        item.drugComplianceType.logic.includes('AE'),
    );

    const eveningBefore = evening.filter(item =>
      item.drugComplianceType.logic.includes('BE'),
    );

    const eveningAfter = evening.filter(item =>
      item.drugComplianceType.logic.includes('AE'),
    );

    if (eveningBefore.length > 0)
      setDrugs(prevState => ({ ...prevState, eveningBefore: true }));
    if (eveningAfter.length > 0)
      setDrugs(prevState => ({ ...prevState, eveningAfter: true }));

    // Bed
    const bed = available.filter(item =>
      item.drugComplianceType.logic.includes('B'),
    );
    if (bed.length > 0)
      setDrugs(prevState => ({
        ...prevState,
        bedBefore: true,
      }));
  };

  const fetchDrugs = async () => {
    const ACCESS_TOKEN = await getAccessToken();
    try {
      const { data } = await axios.get(
        `${config.VA_API_URL}/drugCompliances?filter[where][userId]=${user.data.userInformation.userId}&filter[include]=drugComplianceType&access_token=${ACCESS_TOKEN.id}`,
      );

      const time = fetchTime('now');

      if (data !== null || data.length > 0) {
        let available = [];

        available = data.filter(
          item =>
            item.status === true &&
            item.drugComplianceTypeId !== null &&
            item.usedQty !== item.qty &&
            item.usedQty < item.qty,
        );

        if (available.length > 0) {
          // check if there are drugs in this period to send notifications
          checkDrugsForNotification(available);

          // set red dot alert according to the current time
          if (time === 'MORNING') {
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

            const result = await checkTaken(
              ACCESS_TOKEN,
              morningBefore,
              morningAfter,
              { bed: [] },
              time,
            );

            const { beforeTaken, afterTaken } = result;

            if (morningBefore.length > 0 || morningAfter.length > 0) {
              if (beforeTaken !== true) setMorningBeforeAlert(true);
              if (afterTaken !== true) setMorningAfterAlert(true);
            }
          } else if (time === 'LUNCH') {
            const lunch = available.filter(
              item =>
                item.drugComplianceType.logic.includes('BL') ||
                item.drugComplianceType.logic.includes('AL'),
            );

            const lunchBefore = lunch.filter(item =>
              item.drugComplianceType.logic.includes('BL'),
            );
            const lunchAfter = lunch.filter(item =>
              item.drugComplianceType.logic.includes('AL'),
            );

            const result = await checkTaken(
              ACCESS_TOKEN,
              lunchBefore,
              lunchAfter,
              { bed: [] },
              time,
            );

            const { beforeTaken, afterTaken } = result;

            if (lunchBefore.length > 0 || lunchAfter.length > 0) {
              if (beforeTaken !== true) setLunchBeforeAlert(true);
              if (afterTaken !== true) setLunchAfterAlert(true);
            }
          } else if (time === 'EVENING') {
            const evening = available.filter(
              item =>
                item.drugComplianceType.logic.includes('BE') ||
                item.drugComplianceType.logic.includes('AE'),
            );

            const eveningBefore = evening.filter(item =>
              item.drugComplianceType.logic.includes('BE'),
            );

            const eveningAfter = evening.filter(item =>
              item.drugComplianceType.logic.includes('AE'),
            );

            const result = await checkTaken(
              ACCESS_TOKEN,
              eveningBefore,
              eveningAfter,
              { bed: [] },
              time,
            );

            const { beforeTaken, afterTaken } = result;

            if (eveningBefore.length > 0 || eveningAfter.length > 0) {
              if (beforeTaken !== true) setEveningBeforeAlert(true);
              if (afterTaken !== true) setEveningAfterAlert(true);
            }
          } else if (time === 'BED') {
            const bed = available.filter(item =>
              item.drugComplianceType.logic.includes('B'),
            );

            const result = await checkTaken(
              ACCESS_TOKEN,
              { eveningBefore: [] },
              { eveningAfter: [] },
              bed,
              time,
            );

            const { bedTaken } = result;

            if (bed.length > 0) {
              if (bedTaken !== true) setBedBeforeAlert(true);
            }
          }
        } else {
          console.log('No available drugs.');
        }
      }
    } catch (err) {
      console.log('error fetching drugs from HealthActivity', err);
    }
  };

  const cancelDrugNoti = async (allDrugNotis, value) => {
    const options = {
      soundName: 'default',
      playSound: true,
    };

    if (allDrugNotis.length > 0) {
      //   console.log('yes');
      const drugList = {
        drugIds: allDrugNotis,
      };

      const message = value
        ? 'การแจ้งเตือนเดิมถูกยกเลิกแล้ว'
        : 'คุณได้ยกเลิกการแจ้งเตือนทั้งหมดเรียบร้อยแล้ว';
      await resetNotificationIOS();
      localNotificationService.cancelAllLocalNotifications();
      localNotificationService.showNotification(
        0,
        'ยกเลิกการแจ้งเตือนการทานยา',
        message,
        null,
        options,
        drugList,
      );
      // clear Async Storage
      setCancelDrugNoti([]);
      // clear local state
      setAllDrugNotiList([]);
    } else {
      //   console.log('no');

      const data = {
        nodrugs: true,
      };

      localNotificationService.showNotification(
        0,
        'การตั้งค่าเวลาทานยา',
        'คุณยังไม่มีรายการยา',
        null,
        options,
        data,
      );
    }
  };

  // console.log('notifications ::::::::::::');
  // console.log(route?.params?.forceReset);
  // console.log(drugNotiBtn + ':::' + !route?.params?.forceReset);

  // console.log(!drugNotiBtn + ' ooo ' + route?.params?.forceReset);

  const sendReminder = () => {
    if (drugNotiBtn) {
      // clear Async
      setDrugNoti(false);
      // clear local state
      setDrugNotiBtn(false);
      // call local function
      cancelDrugNoti(allDrugNotiList);
      return;
    }

    if (!drugNotiBtn) {
      // set Async
      setDrugNoti(true);
      // set Local state
      setDrugNotiBtn(true);
    }

    const options = {
      soundName: 'default',
      playSound: true,
    };

    // console.log('check if there are drugs in each period');
    // console.log(drugs);

    if (
      drugs.morningBefore === true ||
      drugs.morningAfter === true ||
      drugs.lunchBefore === true ||
      drugs.lunchAfter === true ||
      drugs.eveningBefore === true ||
      drugs.eveningAfter === true ||
      drugs.bedBefore === true
    ) {
      //   console.log('yes');

      let newTime = {
        morning: {
          begin:
            user?.data?.userInformation?.drugTime?.morning?.begin ||
            moment('2021-06-28T06:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.morning?.end ||
            moment('2021-06-28T09:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.morning?.eat ||
            moment('2021-06-28T07:00:00+07:00').format(),
        },
        lunch: {
          begin:
            user?.data?.userInformation?.drugTime?.lunch?.begin ||
            moment('2021-06-28T11:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.lunch?.end ||
            moment('2021-06-28T14:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.lunch?.eat ||
            moment('2021-06-28T12:00:00+07:00').format(),
        },
        evening: {
          begin:
            user?.data?.userInformation?.drugTime?.evening?.begin ||
            moment('2021-06-28T16:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.evening?.end ||
            moment('2021-06-28T18:00:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.evening?.eat ||
            moment('2021-06-28T17:00:00+07:00').format(),
        },
        bed: {
          begin:
            user?.data?.userInformation?.drugTime?.bed?.begin ||
            moment('2021-06-28T19:00:00+07:00').format(),
          end:
            user?.data?.userInformation?.drugTime?.bed?.end ||
            moment('2021-06-28T23:59:00+07:00').format(),
          eat:
            user?.data?.userInformation?.drugTime?.bed?.eat ||
            moment('2021-06-28T20:00:00+07:00').format(),
        },
      };

      const beforeMMeal = moment(newTime.morning.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterMMeal = moment(newTime.morning.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeLMeal = moment(newTime.lunch.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterLMeal = moment(newTime.lunch.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeEMeal = moment(newTime.evening.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');
      const afterEMeal = moment(newTime.evening.eat)
        .add(30, 'minutes')
        .format('HH:mm:ss');

      const beforeBMeal = moment(newTime.bed.eat)
        .subtract(30, 'minutes')
        .format('HH:mm:ss');

      const splitMBefore = beforeMMeal.split(':');
      const splitMAfter = afterMMeal.split(':');

      const splitLBefore = beforeLMeal.split(':');
      const splitLAfter = afterLMeal.split(':');

      const splitEBefore = beforeEMeal.split(':');
      const splitEAfter = afterEMeal.split(':');

      const splitBBefore = beforeBMeal.split(':');

      let adjustDate = {
        morning: {
          beforeMeal: drugs.morningBefore
            ? new Date().setHours(
                splitMBefore[0],
                splitMBefore[1],
                splitMBefore[2],
              )
            : null,
          afterMeal: drugs.morningAfter
            ? new Date().setHours(
                splitMAfter[0],
                splitMAfter[1],
                splitMAfter[2],
              )
            : null,
        },
        lunch: {
          beforeMeal: drugs.lunchBefore
            ? new Date().setHours(
                splitLBefore[0],
                splitLBefore[1],
                splitLBefore[2],
              )
            : null,
          afterMeal: drugs.lunchAfter
            ? new Date().setHours(
                splitLAfter[0],
                splitLAfter[1],
                splitLAfter[2],
              )
            : null,
        },
        evening: {
          beforeMeal: drugs.eveningBefore
            ? new Date().setHours(
                splitEBefore[0],
                splitEBefore[1],
                splitEBefore[2],
              )
            : null,
          afterMeal: drugs.eveningAfter
            ? new Date().setHours(
                splitEAfter[0],
                splitEAfter[1],
                splitEAfter[2],
              )
            : null,
        },
        bed: {
          beforeMeal: drugs.bedBefore
            ? new Date().setHours(
                splitBBefore[0],
                splitBBefore[1],
                splitBBefore[2],
              )
            : null,
        },
      };

      // const addedOneDay = moment(adjustDate.morning.afterMeal).add(1, 'days');

      // console.log('addedOneDay');
      // console.log(new Date(adjustDate.morning.afterMeal));
      // console.log(adjustDate.morning.afterMeal); // milli
      // console.log(new Date(addedOneDay));
      // console.log(new Date(addedOneDay).getTime()); // milli

      let repeatNoti = {
        morning: {
          beforeMeal: [],
          afterMeal: [],
        },
        lunch: {
          beforeMeal: [],
          afterMeal: [],
        },
        evening: {
          beforeMeal: [],
          afterMeal: [],
        },
        bed: {
          beforeMeal: [],
        },
      };

      const toSaveNotis = [...allDrugNotiList];

      if (adjustDate?.morning?.beforeMeal) {
        //    console.log('yes morning before meal... ');

        // noti for today
        repeatNoti.morning.beforeMeal.push(adjustDate.morning.beforeMeal);

        // noti for the next 20 days
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.morning.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          // to be used in LocalNotificationService
          repeatNoti.morning.beforeMeal.push(newNoti);

          // to store in Async and to be used when user cancel drug notis
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.morning?.afterMeal) {
        //   console.log('yes morning after meal... ');

        repeatNoti.morning.afterMeal.push(adjustDate.morning.afterMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.morning.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.morning.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.lunch?.beforeMeal) {
        //   console.log('yes lunch before meal... ');

        repeatNoti.lunch.beforeMeal.push(adjustDate.lunch.beforeMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.lunch.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.lunch.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.lunch?.afterMeal) {
        //   console.log('yes lunch after meal... ');

        repeatNoti.lunch.afterMeal.push(adjustDate.lunch.afterMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.lunch.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.lunch.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.evening?.beforeMeal) {
        //   console.log('yes evening before meal... ');

        repeatNoti.evening.beforeMeal.push(adjustDate.evening.beforeMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.evening.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.evening.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.evening?.afterMeal) {
        //   console.log('yes evening after meal... ');

        repeatNoti.evening.afterMeal.push(adjustDate.evening.afterMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.evening.afterMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.evening.afterMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      if (adjustDate?.bed?.beforeMeal) {
        //   console.log('yes bed before meal... ');

        repeatNoti.bed.beforeMeal.push(adjustDate.bed.beforeMeal);
        for (let i = 1; i < 20; i++) {
          let addedDays = moment(adjustDate.bed.beforeMeal).add(i, 'days');

          let newNoti = new Date(addedDays).getTime();

          repeatNoti.bed.beforeMeal.push(newNoti);
          toSaveNotis.push(newNoti.toString());
        }
      }

      //  console.log('toSaveNotis');
      //  console.log(toSaveNotis);

      // Save in Async Storage
      setCancelDrugNoti(toSaveNotis);
      // Save in local state
      setAllDrugNotiList(toSaveNotis);
      setListDrugNoti(repeatNoti);
      repeatNoti = manageDrugNotiIOS(repeatNoti);
      localNotificationService.showNotification(
        0,
        'การตั้งค่าเวลาทานยา',
        'คุณได้ตั้งค่าเวลาทานยาเรียบร้อยแล้ว',
        null,
        options,
        repeatNoti,
      );
    } else {
      //  console.log('no');

      const data = {
        reason: true,
      };

      localNotificationService.showNotification(
        0,
        'การตั้งค่าเวลาทานยา',
        'คุณยังไม่มีรายการยา',
        null,
        options,
        data,
      );
    }
  };

  if (loading === true) {
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="บันทึกสุขภาพ"
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
      <ModalGoogleSignIn
        ref={refGoogleModal}
        openFitness={() => {
          getHealthData(true);
          refGoogleModal && refGoogleModal.current.close();
        }}
      />
      <Header
        title="บันทึกสุขภาพ"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.navigate('Home');
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              {user?.data?.HIEimage ? (
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: `data:image/png;base64,${user?.data?.HIEimage}`,
                  }}
                />
              ) : (
                <Image style={styles.profileImage} source={Images.avata2} />
              )}
            </View>
            <View style={styles.row}>
              <Text style={styles.name}>
                {user.data.userInformation.firstname}{' '}
                {user.data.userInformation.lastname}
              </Text>
              <Icon name="clipboard-list" style={styles.icon} />
            </View>
            <View style={styles.ageContainer}>
              <Text style={styles.age}>
                {user.data.userInformation.age
                  ? `อายุ (${user.data.userInformation.age})ปี`
                  : null}
                {user.data.userInformation.gender === 'male' ? (
                  <Text style={styles.cText2}>ชาย</Text>
                ) : user.data.userInformation.gender === 'female' ? (
                  <Text style={styles.cText2}>หญิง</Text>
                ) : (
                  <Text style={styles.cText2}>-</Text>
                )}
              </Text>
            </View>
          </View>
          {/** NOTE Open model sign in */}
          {Platform.OS === 'android' && !healthkitEnabled && (
            <TouchableNativeFeedback
              onPress={checkGoogleFitPackage}
              useForeground={true}
            >
              <Card
                wrapperStyle={styles.cardFitWrapper}
                containerStyle={styles.cardFitContainer}
              >
                <View style={{ ...styles.rowCenter, flex: 1, marginRight: 20 }}>
                  <View style={styles.containerTextFit}>
                    <Text style={styles.textFit}>
                      กรุณาทำการเชื่อมต่อกับ{' '}
                      <Text style={{ fontWeight: 'bold' }}>Google Fit</Text>{' '}
                    </Text>
                    <Text style={styles.textFit}>
                      กรุณากดปุ่ม
                      เพื่อทำการเชื่อมต่อข้อมูลกิจกรรมเข้ามาในบันทึกสุขภาพของท่าน
                    </Text>
                  </View>
                  <Image source={Images.google_fit} style={styles.IconFit} />
                </View>
                <Icon bold name="chevron-right" size={20} color="#5f5f5f" />
              </Card>
            </TouchableNativeFeedback>
          )}
          <View style={styles.mainContainer}>
            <Text style={styles.riskTitle}>
              {risk !== null && risk !== undefined
                ? `Thai CV Risk Score: ${risk}`
                : 'Thai CV Risk Score: -'}
            </Text>

            <Text style={styles.todayTitle}>รายการวันนี้</Text>
            <MonitorCard
              glucose={latestGlucose}
              pressure={latestPressure}
              weight={latestWeight}
              temp={latestTemp}
              oxygen={latestOxygen}
              navigation={navigation}
            />
            <View style={styles.walkContainer}>
              <View style={styles.walkBox}>
                <Text style={styles.resultTitle}>การทำกิจกรรม</Text>
                <View style={[styles.valueContainer, { marginBottom: 8 }]}>
                  <Image source={Images.walk} style={styles.image} />
                  <View style={styles.progress}>
                    <Bar
                      progress={progress}
                      width={null}
                      height={15}
                      borderRadius={12}
                      useNativeDriver={true}
                      color="#095394"
                      style={styles.bar}
                    />
                  </View>

                  <Text style={styles.resultValue}>{steps}</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.mediumText}>(ก้าว)</Text>
                  <Text style={styles.mediumText}>ค่าเป้าหมาย 7000</Text>
                </View>
              </View>
            </View>
            <Text style={styles.todayTitle}>การรับประทานยา</Text>
          </View>

          <View style={styles.notiContainer}>
            <Text style={{ textAlign: 'left', marginRight: 20 }}>
              แจ้งเตือนการทานยา
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#acd87d' }}
              thumbColor={drugNotiBtn ? '#68c900' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={sendReminder}
              value={drugNotiBtn}
            />
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.drugBox}
              onPress={() => navigation.replace('MonitorDrugCompliance1')}
            >
              <View style={styles.innerBox}>
                <View style={styles.topInner}>
                  <View>
                    <Text style={styles.resultTitle}>เช้า</Text>
                  </View>
                  {morningBeforeAlert && morningAfterAlert ? (
                    <View>
                      <PulseIndicator color="red" size={18} />
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                <Image source={Images.morning} style={styles.imageDrug} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.drugBox}
              onPress={() => navigation.replace('MonitorDrugCompliance2')}
            >
              <View style={styles.innerBox}>
                <View style={styles.topInner}>
                  <View>
                    <Text style={styles.resultTitle}>กลางวัน</Text>
                  </View>
                  {lunchBeforeAlert && lunchAfterAlert ? (
                    <View>
                      <PulseIndicator color="red" size={18} />
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                <Image source={Images.noon} style={styles.imageDrug} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.drugBox}
              onPress={() => navigation.replace('MonitorDrugCompliance3')}
            >
              <View style={styles.innerBox}>
                <View style={styles.topInner}>
                  <View>
                    <Text style={styles.resultTitle}>เย็น</Text>
                  </View>
                  {eveningBeforeAlert && eveningAfterAlert ? (
                    <View>
                      <PulseIndicator color="red" size={18} />
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                <Image source={Images.evening} style={styles.imageDrug} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.drugBox}
              onPress={() => navigation.replace('MonitorDrugCompliance4')}
            >
              <View style={styles.innerBox}>
                <View style={styles.topInner}>
                  <View>
                    <Text style={styles.resultTitle}>ก่อนนอน</Text>
                  </View>
                  {bedBeforeAlert ? (
                    <View>
                      <PulseIndicator color="red" size={18} />
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
                <Image source={Images.night} style={styles.imageDrug} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userTele: state.userTele,
    // waterDone: state.water.waterDone,
    // waterGoal: state.water.waterGoal,
    // nutritionGoal: state.nutrition.nutritionGoal,
    // nutrition: state.nutrition.nutrition,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(UserActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthActivity);
