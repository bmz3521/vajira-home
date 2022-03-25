import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { BaseStyle, BaseColor, Images } from '@config';
import { Header, SafeAreaView, Icon } from '@components';
import moment from 'moment';
import CodeGenerator from 'react-native-smart-code';
import axios from 'axios';
import config from '@_config';
import styles from './styles';
import ClinicInfo from './clinic';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const ImageWidth = 300;
const ImageHeight = 100;
const { width, height } = Dimensions.get('window');

const option1 = [
  {
    title: 'การปฏิบัติตัว\nเมื่อจะมาตรวจตามนัดหมาย',
    text: 'เอกสารที่ต้องเตรียม ได้แก่ บัตรประชาชน ใบนัด',
  },
  {
    title: 'การปฏิบัติตัว\nเมื่อจะมาตรวจตามนัดหมาย',
    text: 'การนับจำนวนยาฉีด ยารับประทานที่ยังมีอยู่',
  },
  {
    title: 'การปฏิบัติตัว\nเมื่อจะมาตรวจตามนัดหมาย',
    text: 'การเจาะเลือด ก่อนแล้วค่อยฉีดยา',
  },
  {
    title: 'การปฏิบัติตัว\nเมื่อจะมาตรวจตามนัดหมาย',
    text:
      'การงดน้ำและอาหาร หลัง 20.00 น. ดื่มได้เฉพาะน้ำเปล่าในคืนก่อนวันเจาะเลือด',
  },
];

function AppointmentDetail({ navigation, route }) {
  const [hn, setHn] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [showDetail, setShowDetail] = useState(true);
  const ref = useRef(null);
  // console.log(route.params.item);
  const detail = route.params.item;

  useEffect(() => {
    setCarouselItems(option1);
    const generateBarcode = async () => {
      if (route?.params?.item?.hn) {
        const data = await CodeGenerator.generate({
          type: CodeGenerator.Type.Code128,
          code: route.params.item.hn.toString(),
        });
        setHn(data);
      }
    };
    const mapDataClinic = () => {
      const statusClinic = ClinicInfo.filter(
        item => item.LCT === detail.clinic,
      );
      setShowDetail(statusClinic.length ? false : true);
    };
    mapDataClinic();
    generateBarcode();
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text style={styles.contentDetail}>{item.text}</Text>
        </View>

        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={index}
          containerStyle={styles.paginationContainer}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 5,
            backgroundColor: '#09B678',
          }}
          inactiveDotStyle={{}}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <View style={styles.directionContainer}>
          {index !== 0 && (
            <View style={styles.before}>
              <Text style={styles.smallText}>ก่อนหน้า</Text>
            </View>
          )}

          {index === 0 && (
            <View style={styles.next}>
              <Text style={styles.smallText}>ถัดไป</Text>
            </View>
          )}

          {index !== carouselItems.length - 1 && index !== 0 && (
            <View style={styles.whiteBG}>
              <Text style={styles.smallText}>ถัดไป</Text>
            </View>
          )}
          {index === carouselItems.length - 1 && (
            <View style={styles.whiteBG}>
              <Text style={styles.smallText}>{}</Text>
            </View>
          )}
        </View>
      </View>
    ),
    [carouselItems],
  );

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="รายละเอียดการนัดหมาย"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ marginTop: 20 }}>
        <View style={styles.card}>
          <Image
            source={Images.appointment_detail}
            style={styles.illustration}
          />
          <View
            style={[
              styles.contentContainer,
              detail.oappstName !== 'เลื่อนนัด'
                ? { backgroundColor: '#fff' }
                : { backgroundColor: '#eaeaea' },
            ]}
          >
            <Text
              style={[
                styles.contentTitle,
                detail.oappstName !== 'เลื่อนนัด'
                  ? { color: '#09B678' }
                  : { color: '#CC4343' },
              ]}
            >
              {detail.note}
            </Text>
            <View style={styles.makeRow}>
              <Icon name="calendar" style={styles.timeIcon} />
              <Text style={styles.timeText}>วันและเวลา:</Text>
            </View>
            {detail.appointmentDateTime ? (
              <View style={styles.appointmentContainer}>
                <Text
                  style={[
                    styles.appoitnmentText,
                    detail.oappstName !== 'เลื่อนนัด'
                      ? { color: '#535353' }
                      : { color: '#CC4343' },
                  ]}
                >
                  {`วันที่ ${moment(detail.appointmentDateTime).format(
                    'D MMM YYYY',
                  )} เวลา ${moment(detail.appointmentDateTime).format(
                    'HH:mm',
                  )} น.`}
                </Text>
              </View>
            ) : null}
            <View style={styles.makeRow}>
              <Icon name="notes-medical" style={styles.timeIcon} />
              <Text style={styles.timeText}>แผนก:</Text>
            </View>
            <View style={styles.appointmentContainer}>
              <Text style={styles.appoitnmentText}>
                {detail.clinicName && detail.clinicName}
              </Text>
            </View>
            {/* <View style={styles.makeRow}>
              <Icon name="map-marker-alt" style={styles.timeIcon} />
              <Text style={styles.timeText}>ห้องตรวจ:</Text>
            </View>

            <View style={styles.appointmentContainer}>
              <Text style={styles.appoitnmentText}>
                โทรเวชกรรมผ่าน VAJIRA@HOME
              </Text>
            </View> */}
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
                  <Text style={styles.doctorName}>{detail.doctorName}</Text>
                </View>
                <View style={styles.doctorProfile}>
                  <View style={styles.wrapName}>
                    <View>
                      <Icon name="hospital" style={styles.detailIcon} />
                    </View>
                    <Text style={styles.detailText}>{detail.clinicName}</Text>
                  </View>
                </View>
              </View>
            </View>
            {hn && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                >
                  ใบนัด
                </Text>
                <Image
                  source={{ uri: hn }}
                  resizeMode="cover"
                  style={{
                    marginTop: 20,
                    height: ImageHeight,
                    width: ImageWidth,
                    borderColor: 'black',
                    borderWidth: 1,
                  }}
                />
              </View>
            )}

            {/* <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DocumentDisplay', {
                    name: 'ใบนัดหมายแพทย์',
                  })
                }
                style={styles.buttonItem}
              >
                <Image
                  resizeMode="contain"
                  source={Images.appointment}
                  style={styles.buttonGreenIcon}
                />
                <Text style={styles.buttonGreenText}>ใบนัดหมาย</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DocumentDisplay', {
                    name: 'ใบรับรองแพทย์',
                  })
                }
                style={styles.buttonItem}
              >
                <Image
                  resizeMode="contain"
                  source={Images.med_cert}
                  style={styles.buttonGreenIcon}
                />
                <Text style={styles.buttonGreenText}>ใบรับรอง</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('TeleSymptom')}
                style={[styles.buttonItem, { backgroundColor: '#09B678' }]}
              >
                <Image
                  resizeMode="contain"
                  source={Images.teledoc}
                  style={styles.buttonWhiteIcon}
                />
                <Text style={styles.buttonWhiteText}>
                  นัดหมายแพทย์{'\n'}ทางโทรเวชกรรม
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
        {showDetail || (
          <View style={styles.textContent}>
            <ScrollView>
              <Carousel
                layout="default"
                ref={ref}
                data={option1}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={index => setActiveIndex(index)}
              />
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AppointmentDetail;
