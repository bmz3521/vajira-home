import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Image } from '@components';
import { Images } from '@config';

function TimeImage({ period, tempTime, navigation }) {
  function checkTime() {
    if (period === 'MORNING') {
      return (
        <View style={styles.periodContainer}>
          <Text style={styles.resultTitle}>เช้า</Text>
          <Image source={Images.morning} style={styles.period} />
        </View>
      );
    } else if (period === 'LUNCH') {
      return (
        <View style={styles.periodContainer}>
          <Text style={styles.resultTitle}>กลางวัน</Text>
          <Image source={Images.noon} style={styles.period} />
        </View>
      );
    } else if (period === 'EVENING') {
      return (
        <View style={styles.periodContainer}>
          <Text style={styles.resultTitle}>เย็น</Text>
          <Image source={Images.evening} style={styles.period} />
        </View>
      );
    } else if (period === 'BED') {
      return (
        <View style={styles.periodContainer}>
          <Text style={styles.resultTitle}>ก่อนนอน</Text>
          <Image source={Images.night} style={styles.period} />
        </View>
      );
    } else {
      return (
        <View style={styles.periodContainer}>
          <ActivityIndicator
            style={styles.period}
            size="large"
            color="0A7C53"
          />
        </View>
      );
    }
  }

  return (
    <View style={styles.headContainer}>
      {checkTime()}
      <View style={{ flexDirection: 'column', marginTop: 10 }}>
        <View style={styles.topCard}>
          <View style={styles.row}>
            <View>
              <View>
                {period === 'MORNING' ? (
                  <Text>เวลาเริ่มต้นช่วง "ช่วงเช้า"</Text>
                ) : period === 'LUNCH' ? (
                  <Text>เวลาเริ่มต้นช่วง "กลางวัน"</Text>
                ) : period === 'EVENING' ? (
                  <Text>เวลาเริ่มต้นช่วง "ช่วงเย็น"</Text>
                ) : period === 'BED' ? (
                  <Text>เวลาเริ่มต้นช่วง "ก่อนนอน"</Text>
                ) : (
                  <Text style={{ color: 'red' }}>ยังไม่ถึงเวลาทานยา</Text>
                )}
              </View>
              <View>
                <Text>{`เวลา ${tempTime.begin ?? '00:00'} น.`}</Text>
              </View>
            </View>
          </View>
        </View>
        {period !== 'BED' ? (
          <View style={styles.bottomCard}>
            <View style={styles.row}>
              <View>
                <View>
                  <Text>เวลาทานอาหาร (โดยประมาณ)</Text>
                </View>
                <View>
                  <Text>{`เวลา ${tempTime.eat ?? '00:00'} น.`}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginBottom: 60 }} />
        )}
      </View>

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.push('SetTime', { period })}
          style={styles.setting}
        >
          <Image style={styles.settingImage} source={Images.set_time} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  periodContainer: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  period: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  resultTitle: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#575757',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  topCard: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 20,
  },
  bottomCard: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 25,
    paddingVertical: 15,
  },
  setting: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 10,
  },
  settingImage: {
    width: 20,
    height: 20,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
});

export default TimeImage;
