import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import moment from 'moment';
import axios from 'axios';
import config from '@_config';
import styles from './styles';
import { uniq } from 'lodash';

function PatientHIEBookingDetail({ navigation, route }) {
  const info = route.params.item;
  const userId = route.params.userId;

  const [fullList, setFullList] = useState();
  const [shortList, setShortList] = useState();
  const [labResults, setLabResults] = useState();

  const storeMedList = () => {
    setFullList([...route.params.item.billingItems]);
    setShortList([...route.params.item.billingItems]);
  };

  const storeLabResults = () => {
    let filteredData = [];

    let uniqType = uniq(
      route.params.item.labResults.map(d => d.labHeadData.formName),
    );

    route.params.item.labResults.map(results => {
      for (let i = 0; i <= route.params.item.labResults.length; i++) {
        if (uniqType[i] === results.labHeadData.formName) {
          const updated = results.labReportData.map(item => {
            const itemData = {
              name: item.labItemsName,
              result: item.labOrderResult,
              ref: item.labItemsNormalValueRef,
              group: item.labgrpName,
              formName: results.labHeadData.formName,
            };
            return itemData;
          });

          filteredData.push({
            id: i,
            data: updated,
          });
        }
      }
    });

    let groupedData = filteredData.reduce((results, item) => {
      results[item.id] = results[item.id] || [];

      results[item.id].push(item.data);

      return results;
    }, []);

    let final = [];

    for (let i = 0; i < groupedData.length; i++) {
      let type = '';
      let data = [];

      for (let y = 0; y < groupedData[i].length; y++) {
        if (groupedData[i]) {
          groupedData[i][y].map(item => {
            type = item.formName;
            data.push(item);
          });
        }
      }

      final.push({ type, data });
    }

    setLabResults(final);
  };

  useEffect(() => {
    storeMedList();
    storeLabResults();
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="รายละเอียดการรักษา"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image source={Images.treatment} style={styles.illustration} />
          <View style={styles.contentContainer}>
            <Text style={styles.contentTitle}>{info.icd10ThaiName}</Text>
            <View style={styles.makeRow}>
              <Icon name="calendar" style={styles.timeIcon} />
              <Text style={styles.timeText}>วันและเวลา:</Text>
            </View>

            {info.visitDateTime ? (
              <View style={styles.appointmentContainer}>
                <Text style={styles.appoitnmentText}>
                  {`วันที่ ${moment(info.visitDateTime).format(
                    'D MMM YYYY',
                  )} เวลา ${moment(info.visitDateTime).format('HH:mm')} น.`}
                </Text>
              </View>
            ) : null}

            <View style={styles.makeRow}>
              <Icon name="notes-medical" style={styles.timeIcon} />
              <Text style={styles.timeText}>แผนก:</Text>
            </View>

            <View style={styles.appointmentContainer}>
              <Text style={styles.appoitnmentText}>
                {info.department && info.department}
              </Text>
            </View>

            <View style={styles.makeRow}>
              <Icon name="map-marker-alt" style={styles.timeIcon} />
              <Text style={styles.timeText}>ห้องตรวจ:</Text>
            </View>

            <View style={styles.appointmentContainer}>
              <Text style={styles.appoitnmentText}>{info.department}</Text>
            </View>

            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={styles.contentSubtitle}>แพทย์ผู้ให้การรักษา</Text>
            <View style={styles.makeRow}>
              <View style={styles.profileImageContainer}>
                <Image style={styles.profileImage} source={Images.user} />
              </View>
              <View>
                <View style={styles.wrapName}>
                  <Text style={styles.doctorName}>{info.doctorName}</Text>
                </View>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="hospital" style={styles.detailIcon} />
                    </View>
                    <Text style={styles.detailText}>{info.department}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DocumentDisplay', {
                name: 'ใบรับรองแพทย์',
              })
            }
            style={{
              borderTopWidth: 1,
              borderColor: '#ccc',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#fff',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 15,
              shadowColor: '#000',
              elevation: 3,
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                name="file-medical"
                style={[styles.detailIcon, { color: '#0A5C3E' }]}
              />
            </View>
            <Text style={[styles.buttonText, { color: '#0A5C3E' }]}>
              ใบรับรองแพทย์
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            margin: 4,
            borderColor: BaseColor.textSecondaryColor,
            marginBottom: 10,
            borderRadius: 10,
            marginBottom: 25,
            backgroundColor: 'white',
            shadowColor: '#000',
            borderColor: '#c0c0c0',
            borderWidth: 1,
            elevation: 3,
          }}
        >
          <View style={styles.presListTitle}>
            <Icon
              name="list-alt"
              style={[styles.titleIcon, { fontSize: 18 }]}
            />
            <Text style={[styles.titleText, { fontSize: 18 }]}>รายการยา</Text>
          </View>

          {fullList && fullList.length > 0 && (
            <Divider
              style={{
                marginBottom: 10,
                color: '#40424B',
              }}
            />
          )}

          {shortList &&
            shortList.splice(0, 2).map((prescription, index) => (
              <View key={index}>
                <View style={styles.presListHead}>
                  <Text bold>{index + 1}.</Text>
                  <Text bold style={styles.presName}>
                    {prescription.drugNondugName}
                  </Text>
                  <Text bold>{prescription.qty} (แผง)</Text>
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  <Text>วิธีใช้:</Text>
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  <Text>{prescription.drugUsage}</Text>
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  {prescription.medlblhlp1_name ? (
                    <Text>{prescription.medlblhlp1_name}</Text>
                  ) : null}
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  {prescription.medlblhlp2_name ? (
                    <Text>{prescription.medlblhlp2_name}</Text>
                  ) : null}
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  {prescription.medlblhlp3 ? (
                    <Text>{prescription.medlblhlp3}</Text>
                  ) : null}
                </View>
                <View style={[styles.presListHead, styles.instructions]}>
                  {prescription.medlblhlp4 ? (
                    <Text>{prescription.medlblhlp4}</Text>
                  ) : null}
                </View>

                {index + 1 < shortList.length && (
                  <Divider
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      color: '#40424B',
                    }}
                  />
                )}
              </View>
            ))}
          {fullList && fullList.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DocumentDisplay', {
                  name: 'รายการยาทั้งหมด',
                  medList: fullList,
                  userId: userId,
                })
              }
              style={{
                backgroundColor: '#09B678',
                flex: 1,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 15,
                shadowColor: '#000',
                elevation: 3,
              }}
            >
              <Text style={styles.buttonText}>รายการยาทั้งหมด</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: '#E5E5E5',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <Text style={styles.resultText}>ผลตรวจห้องปฏิบัติการ</Text>
          <View style={styles.buttonContainer}>
            {labResults !== undefined &&
              labResults.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.lab}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('DocumentDisplay', {
                        name: 'ผลตรวจห้องปฏิบัติการ',
                        type: item.type,
                        data: item.data,
                      })
                    }
                  >
                    <Text style={styles.labText}>{item.type}</Text>
                  </TouchableOpacity>
                );
              })
            /* <View style={styles.buttonItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DocumentDisplay', {
                    name: 'ผลตรวจห้องปฏิบัติการ',
                    blood: [],
                  })
                }
              >
                <Image
                  resizeMode="contain"
                  source={Images.blood}
                  style={styles.buttonGreenIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonGreenText}>โลหิต</Text>
            </View> */
            }

            {/* <View style={styles.buttonItem}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DocumentDisplay', {
                    name: 'ผลตรวจห้องปฏิบัติการ',
                    blood: [],
                  })
                }
              >
                <Image
                  resizeMode="contain"
                  source={Images.urine}
                  style={styles.buttonGreenIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonGreenText}>แลปอื่นๆ</Text>
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default PatientHIEBookingDetail;
