import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { Divider } from 'react-native-elements';
import { BaseStyle, BaseColor, Images } from '@config';
import config from '@_config';
import { Header, SafeAreaView, Icon } from '@components';
import LinearGradient from 'react-native-linear-gradient';
import { getAccessToken } from '@utils/asyncStorage';

import styles from './styles';

function DocumentDisplay({ navigation, route }) {
  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [presButton, setPresButton] = useState(false);

  useEffect(() => {
    const checkIfButtonAlreadyPress = async () => {
      const orderNumber = route.params.medList[0].orderNo || '0';

      const ACCESS_TOKEN = await getAccessToken();

      try {
        const { data } = await axios.get(
          `${config.VA_API_URL}/drugCompliances?access_token=${ACCESS_TOKEN.id}&filter[where][orderNumber]=${orderNumber}`,
        );

        if (data.length === 0) {
          setPresButton(true);
        }
      } catch (error) {
        console.log('error calling checkDrugsDetailByOrderNo', error);
      }
    };

    checkIfButtonAlreadyPress();
  }, []);

  const sendDrugs = async () => {
    const ACCESS_TOKEN = await getAccessToken();

    const userId = route.params.userId;
    const orderNumber = route.params.medList[0].orderNo;
    const data = route.params.medList;

    try {
      await axios.post(
        `${config.VA_API_URL}/drugCompliances/updateByPrescriptionId?access_token=${ACCESS_TOKEN.id}`,
        {
          userId,
          orderNumber,
          data,
        },
      );
      setModal(false);
      setModalSuccess(true);
      setPresButton(false);
    } catch (error) {
      setModal(false);
      setModalError(true);
      console.log('error calling updateByPrescriptionId', error);
    }
  };

  const displayComponent = title => {
    if (title === 'ใบนัดหมายแพทย์') {
      return (
        <Image
          resizeMode="contain"
          source={Images.inviterefer}
          style={styles.display}
        />
      );
    }

    if (title === 'ใบรับรองแพทย์') {
      return (
        <>
          <Image
            resizeMode="contain"
            source={Images.inviterefer}
            style={styles.display}
          />
          <View style={{ width: '100%' }}>
            <LinearGradient
              colors={['#0DA36D', '#0A7C53', '#086C48']}
              style={styles.signInGradient}
            >
              <TouchableOpacity full style={styles.button} onPress={() => {}}>
                <Text bold style={styles.text}>
                  บันทึก
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </>
      );
    }

    if (title === 'รายการยาทั้งหมด') {
      return (
        <>
          <View
            style={{
              margin: 4,
              borderColor: BaseColor.textSecondaryColor,
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 10,
              marginBottom: 15,
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
            <Divider
              style={{
                marginBottom: 10,
                color: '#40424B',
              }}
            />
            {route.params.medList.map((prescription, index) => (
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

                {index + 1 !== route.params.medList.length && (
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
          </View>
          {presButton && (
            <View style={styles.modalButtonContainer}>
              <LinearGradient
                style={[styles.add, { marginBottom: 5 }]}
                colors={['#0A905F', '#095C3E']}
              >
                <TouchableOpacity
                  underlayColor="grey"
                  style={{ width: '100%', alignItems: 'center' }}
                  disabled={false}
                  onPress={() => setModal(true)}
                >
                  <Text style={styles.buttonTextAdd}>
                    แจ้งเตือนการทานยาชุดนี้
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}

          <Modal animationType="slide" transparent={true} visible={modal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  ท่านต้องการ
                </Text>

                <Text style={[styles.modalText, { color: '#000' }]}>
                  ให้มีการแจ้งเตือน
                </Text>
                <Text style={[styles.modalText, { color: '#000' }]}>
                  การทานยาชุดนี้
                </Text>

                <View style={styles.modalRowContainer}>
                  <LinearGradient
                    style={[styles.modalButton, { marginBottom: 5 }]}
                    colors={['#8c8c8c', '#c0c0c0']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={() => {
                        setModal(false);
                      }}
                    >
                      <Text style={styles.buttonTextAdd}>ไม่</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                  <LinearGradient
                    style={[styles.modalButton, { marginBottom: 5 }]}
                    colors={['#0A905F', '#095C3E']}
                  >
                    <TouchableOpacity
                      underlayColor="grey"
                      style={{ width: '100%', alignItems: 'center' }}
                      disabled={false}
                      onPress={sendDrugs}
                    >
                      <Text style={styles.buttonTextAdd}>ยืนยัน</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalError}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalFailTitle}>เกิดข้อผิดพลาด</Text>

                  <Text style={{ textAlign: 'center', fontSize: 15 }}>
                    บันทึกรายการไม่สำเร็จ{'\n'} โปรดติดต่อเจ้าหน้าที่
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 20,
                    }}
                  >
                    <LinearGradient
                      colors={['#0DA36D', '#0A7C53', '#086C48']}
                      style={styles.signInGradient}
                    >
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalError(false)}
                      >
                        <Text style={styles.textConfirm}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalSuccess}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalSuccessTitle}>
                    บันทึกรายการสำเร็จ
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginVertical: 20,
                    }}
                  >
                    <LinearGradient
                      colors={['#0DA36D', '#0A7C53', '#086C48']}
                      style={styles.signInGradient}
                    >
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalSuccess(false)}
                      >
                        <Text style={styles.textConfirm}>ตกลง</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </>
      );
    }

    if (title === 'ผลตรวจห้องปฏิบัติการ') {
      return (
        <View
          style={{
            margin: 4,
            borderColor: BaseColor.textSecondaryColor,
            marginBottom: 10,
            borderRadius: 10,
            borderWidth: 2,
            marginBottom: 25,
            backgroundColor: 'white',
            shadowColor: '#000',
            elevation: 3,
          }}
        >
          <View style={styles.presListTitle}>
            {/* <Image
              resizeMode="contain"
              source={Images.blood}
              style={styles.buttonGreenIcon}
            /> */}
            <Text style={[styles.titleText, { fontSize: 18 }]}>
              {route.params.type}
            </Text>
          </View>
          <Divider
            style={{
              marginBottom: 10,
              color: '#40424B',
            }}
          />
          <View
            style={[styles.presListHead, { marginTop: 10, marginBottom: 20 }]}
          >
            <Text bold style={[styles.presName, { fontWeight: 'bold' }]}>
              รายการ
            </Text>
            <Text
              bold
              style={[
                styles.presName,
                { fontWeight: 'bold', textAlign: 'center' },
              ]}
            >
              ผลตรวจ
            </Text>
            <Text
              bold
              style={[
                styles.presName,
                { textAlign: 'right', fontWeight: 'bold' },
              ]}
            >
              เกณฑ์ปกติ
            </Text>
          </View>
          <Divider
            style={{
              marginBottom: 10,
              color: '#40424B',
            }}
          />
          {route.params.data.map((item, index) => (
            <View key={index}>
              <View key={index} style={styles.presListHead}>
                <Text bold style={styles.presName}>
                  {item.name}
                </Text>
                <Text bold style={[styles.presName, { textAlign: 'center' }]}>
                  {item.result}
                </Text>
                <Text bold style={[styles.presName, { textAlign: 'right' }]}>
                  {item.ref}
                </Text>
              </View>

              {index + 1 !== route.params.data.length && (
                <Divider
                  style={{ marginTop: 10, marginBottom: 10, color: '#40424B' }}
                />
              )}
            </View>
          ))}
        </View>
      );
    }

    return (
      <View>
        <Text>No Document Found.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title={route.params.name}
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {displayComponent(route.params.name)}
      </ScrollView>
    </SafeAreaView>
  );
}

export default DocumentDisplay;
