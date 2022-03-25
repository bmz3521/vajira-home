import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '@config';
import styles from '../styles';

const data = [
  {
    id: 0,
    title: 'น้ำตาลในเลือด',
    route: 'MonitorBloodGlucose',
    img: Images.diabetes,
    measure: '(มก./ดล.)',
  },
  {
    id: 1,
    title: 'ความดันโลหิต',
    route: 'MonitorBloodPressure',
    img: Images.blood_pressure,
    measure: '(มม.ปรอท)',
  },
  {
    id: 2,
    title: 'ดัชนีมวลกาย',
    route: 'MonitorWeight',
    img: Images.bmi,
    measure: '(กก./ตร.ม.)',
  },
  {
    id: 3,
    title: 'อุณหภูมิ',
    route: 'MonitorTemperature',
    img: Images.temperature,
    measure: '(ซ.)',
  },
  {
    id: 4,
    title: 'ออกซิเจน',
    route: 'MonitorOxygen',
    img: Images.oxygen,
    measure: '(%)',
  },
  {
    id: 5,
    title: '',
    route: '',
    img: '',
    measure: '',
  },
];

function MonitorCard({ glucose, pressure, weight, temp, oxygen, navigation }) {
  return (
    <View style={styles.resultContainer}>
      {data.map(item =>
        item.id === 5 ? (
          <View key={item.id} style={styles.emptyBox} />
        ) : (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => navigation.push(item.route)}
            style={styles.resultBox}
          >
            <Text style={styles.resultTitle}>{item.title}</Text>
            <View style={styles.valueContainer}>
              <Image source={item.img} style={styles.image} />
              {item.id === 0 && (
                <Text style={styles.resultValue}>
                  {glucose ? glucose.glucose : '-'}
                </Text>
              )}
              {item.id === 1 && (
                <Text style={[styles.resultValue, { fontSize: 14 }]}>
                  {pressure && pressure.high && pressure.low
                    ? `${pressure.high}/${pressure.low}`
                    : '-'}
                </Text>
              )}
              {item.id === 2 && (
                <Text style={styles.resultValue}>
                  {weight ? weight.bmi : '-'}
                </Text>
              )}
              {item.id === 3 && (
                <Text style={styles.resultValue}>
                  {temp ? temp.celsius : '-'}
                </Text>
              )}
              {item.id === 4 && (
                <Text style={styles.resultValue}>
                  {oxygen ? oxygen.percent : '-'}
                </Text>
              )}
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.smallText}>{item.measure}</Text>
              {item.id === 0 && glucose && (
                <Text
                  style={[
                    styles.smallText,
                    glucose ? { color: glucose.color } : null,
                  ]}
                >
                  {glucose ? glucose.result : '-'}
                </Text>
              )}
              {item.id === 1 && pressure && (
                <Text
                  style={[
                    styles.smallText,
                    pressure ? { color: pressure.color } : null,
                  ]}
                >
                  {pressure ? pressure.result : '-'}
                </Text>
              )}
              {item.id === 2 && weight && (
                <Text
                  style={[
                    styles.smallText,
                    weight ? { color: weight.color } : null,
                  ]}
                >
                  {weight ? weight.result : '-'}
                </Text>
              )}
              {item.id === 3 && temp && (
                <Text
                  style={[
                    styles.smallText,
                    temp ? { color: temp.color } : null,
                  ]}
                >
                  {temp ? temp.result : '-'}
                </Text>
              )}
              {item.id === 4 && oxygen && (
                <Text
                  style={[
                    styles.smallText,
                    oxygen ? { color: oxygen.color } : null,
                  ]}
                >
                  {oxygen ? oxygen.result : '-'}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
}

export default MonitorCard;

{
  /* <View style={styles.resultContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.push('MonitorBloodGlucose')}
        style={styles.resultBox}
      >
        <Text style={styles.resultTitle}>น้ำตาลในเลือด</Text>
        <View style={styles.valueContainer}>
          <Image source={Images.diabetes} style={styles.image} />
          <Text style={styles.resultValue}>
            {latestGlucose ? latestGlucose.glucose : '-'}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.smallText}>(มก./ดล.)</Text>
          <Text
            style={[
              styles.smallText,
              latestGlucose ? { color: latestGlucose.color } : null,
            ]}
          >
            {latestGlucose ? latestGlucose.result : '-'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.push('MonitorBloodPressure')}
        style={styles.resultBox}
      >
        <Text style={styles.resultTitle}>ความดันโลหิต</Text>
        <View style={styles.valueContainer}>
          <Image source={Images.blood_pressure} style={styles.image} />
          <Text style={[styles.resultValue, { fontSize: 14 }]}>
            {latestPressure && latestPressure.high && latestPressure.low
              ? `${latestPressure.high}/${latestPressure.low}`
              : '-'}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.smallText}>(มม.ปรอท)</Text>
          <Text
            style={[
              styles.smallText,
              latestPressure ? { color: latestPressure.color } : null,
            ]}
          >
            {latestPressure ? latestPressure.result : '-'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.push('MonitorWeight')}
        style={styles.resultBox}
      >
        <Text style={styles.resultTitle}>ดัชนีมวลกาย</Text>
        <View style={styles.valueContainer}>
          <Image source={Images.bmi} style={styles.image} />
          <Text style={styles.resultValue}>
            {latestWeight ? latestWeight.bmi : '-'}
          </Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.smallText}>(กก./ตร.ม.)</Text>
          <Text
            style={[
              styles.smallText,
              latestWeight ? { color: latestWeight.color } : null,
            ]}
          >
            {latestWeight ? latestWeight.result : '-'}
          </Text>
        </View>
      </TouchableOpacity>
    </View> */
}
