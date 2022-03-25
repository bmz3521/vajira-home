import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Header, SafeAreaView, Text, Icon } from '@components';
import { useSelector } from 'react-redux';
import _, { size } from 'lodash';
import { BaseStyle, BaseColor } from '@config';
import config from '@_config';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { store } from 'app/store';
import { getFcmToken } from '@utils/asyncStorage';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

function PackageConsult(props) {
  const telemedicine = useSelector(state => state.telemedicine);
  const { navigation, userTele, user } = props;
  const auth = store.getState().auth || [];
  const token = userTele.dataTele.id;
  const userId = user.data.id;

  const type = props.route.params.type || null;

  useEffect(() => {
    const addFcmToken = async () => {
      const fcmToken = await getFcmToken();
      const res = await axios.post(
        `${config.apiUrl}/userFcmTokens/upsertWithWhere?where={"fcmToken":"${fcmToken}"}&access_token=${token}`,
        {
          fcmToken,
          userId,
        },
      );
    };
    if (auth && auth.isAuthenticated) {
      addFcmToken();
    }
  }, []);

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="นัดหมายแพทย์"
        textStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
      />
      <View style={styles.centeredView}>
        <ScrollView>
          <View style={styles.TopPart}>
            <View style={styles.congratsContainer}>
              <Icon
                name="check-circle"
                size={100}
                style={{ color: '#1DAF0C', marginBottom: 20 }}
              />
              {type === 'เภสัชกร' ? (
                <Text style={styles.successTitle}>
                  ท่านได้นัดหมายเภสัชกรเรียบร้อย
                </Text>
              ) : (
                <Text style={styles.successTitle}>
                  ท่านได้นัดหมายแพทย์เรียบร้อย
                </Text>
              )}

              <Text style={styles.successSubtitle}>
                ขอขอบคุณที่ท่านเข้ามาใช้บริการ
              </Text>
              <Text style={styles.methodTitle}>
                ท่านสามารถรับการบริการผ่าน VAJIRA@HOME ได้ ดังนี้
              </Text>
              <View style={styles.methodContainer}>
                <Text
                  style={[
                    styles.methodText,
                    { color: '#0A5C3E', fontWeight: 'bold' },
                  ]}
                >
                  1.
                </Text>
                <Text style={styles.methodText}>
                  <Text
                    style={[
                      styles.methodText,
                      { color: '#0A5C3E', fontWeight: 'bold' },
                    ]}
                  >
                    โทรเวชกรรม
                  </Text>{' '}
                  - ท่านสามารถโทรปรึกษาแพทย์เบื้องต้น การปรึกษาการรักษาเบื้องต้น
                  และการปรึกษาต่อเนื่อง
                </Text>
              </View>

              <View style={styles.methodContainer}>
                <Text
                  style={[
                    styles.methodText,
                    { color: '#0A5C3E', fontWeight: 'bold' },
                  ]}
                >
                  2.
                </Text>
                <Text style={styles.methodText}>
                  <Text
                    style={[
                      styles.methodText,
                      { color: '#0A5C3E', fontWeight: 'bold' },
                    ]}
                  >
                    ปรึกษาเภสัชกรทางไกล
                  </Text>{' '}
                  - หากมีการสั่งจ่ายยาจากแพทย์
                  ท่านสามารถโทรปรึกษาเภสัชกรเพื่อรับยาได้
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bottomPart}>
            {/* <View style={styles.noteContainer}>
              <Text
                style={[
                  styles.methodText,
                  { color: '#0A5C3E', fontWeight: 'bold' },
                ]}
              >
                โรงพยาบาลขอความร่วมมือท่านในการตอบแบบสอบถาม
              </Text>

              <Text style={styles.methodText}>
                ความพึงพอใจก่อนการใช้บริการ ทั้งนี้หากท่านไม่สะดวก
                หรือเคยตอบแบบสอบถามแล้ว สามารถกดปุ่ม "ข้าม" ได้
              </Text>
            </View> */}
            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                style={styles.okButton}
                onPress={() => {
                  navigation.navigate('Survey', {
                    bookingId: userTele.dataTele.id,
                    userTeleId: userTele.dataTele.userId,
                  });
                }}
              >
                <Text style={styles.okStyle}>ตอบแบบสอบถาม</Text>
              </TouchableOpacity> */}

              <LinearGradient
                colors={['#0DA36D', '#0A7C53', '#086C48']}
                style={styles.skipGradient}
              >
                <TouchableOpacity
                  full
                  style={styles.skipButton}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text style={styles.skipText}>เสร็จสิ้น</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// export default PackageConsult;

PackageConsult.propTypes = {
  user: PropTypes.object,
  userTele: PropTypes.object,
  auths: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    auths: state.auth,
    user: state.user,
    userTele: state.userTele,
  };
};

export default connect(mapStateToProps)(PackageConsult);
