import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { Images } from '@config';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import { setTracking } from '@utils/asyncStorage';
import styles from '../styles';
const { width, height } = Dimensions.get('window');

const CarouselMenu = ({ user, navigation, routeAuth, checkIfVerify }) => {
  const checkTime = () => {
    let time = moment();
    const timeFormat = 'HH:mm:ss';
    // let time = moment('21:50:00', timeFormat);

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

    if (
      time.isBetween(
        moment(beginMorning, timeFormat),
        moment(endMorning, timeFormat),
      )
    ) {
      return navigation.navigate('MonitorDrugCompliance1');
    } else if (
      time.isBetween(
        moment(beginLunch, timeFormat),
        moment(endLunch, timeFormat),
      )
    ) {
      return navigation.navigate('MonitorDrugCompliance2');
    } else if (
      time.isBetween(
        moment(beginEvening, timeFormat),
        moment(endEvening, timeFormat),
      )
    ) {
      return navigation.navigate('MonitorDrugCompliance3');
    } else if (
      time.isBetween(moment(beginBed, timeFormat), moment(endBed, timeFormat))
    ) {
      return navigation.navigate('MonitorDrugCompliance4');
    } else {
      return navigation.navigate('MonitorDrugCompliance1');
    }
  };

  const icons = [
    {
      icon: Images.homeicon6,
      name: 'รายการยา',
      route: 'MonitorDrugCompliance1',
      notAuthenticated: 'SignIn2',
    },
    {
      icon: Images.homeicon8,
      name: 'ติดตามยา',
      route: 'TelePharmacist',
      notAuthenticated: 'SignIn2',
    },
    {
      icon: Images.homeicon7,
      name: 'สอบถาม',
      route: 'ChatbotLanding',
      notAuthenticated: 'SignIn2',
    },
    {
      icon: Images.howto,
      name: 'วิธีใช้งาน',
      route: 'FagMain',
      notAuthenticated: 'SignIn2',
    },
    {
      icon: Images.homeicon5,
      name: 'รับยาทางไปรษณีย์',
      notAuthenticated: 'SignIn2',
    },
    {
      icon: Images.homeicon9,
      name: 'ยิ่งเล่น ยิ่งรู้',
      notAuthenticated: 'SignIn2',
    },
    // {
    //   icon: require('./place_holder_video_icon.png'), // TODO Waiting for replace icon
    //   name: 'วิดีโอ',
    //   route: 'KnowledgeVideo',
    // },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [dataMenu, setDataMenu] = useState([]);
  const [chunk, setChunk] = useState(0);
  const cRef = useRef();
  // NOTE Find number of icon per width of device
  useEffect(() => {
    const numofChunk = Math.floor(width / 90); // width of icon 90px
    const newArr = icons.reduce((p, c, index) => {
      const chunkIndex = Math.floor(index / numofChunk);
      p[chunkIndex] = [...(p[chunkIndex] || []), c];
      return p;
    }, []);
    setDataMenu([...newArr]);
    setChunk(numofChunk);
  }, []);

  const onclickHandler = icon => {
    switch (icon.name) {
      case 'รายการยา': {
        (async () => await setTracking('drugTakingCount'))();
        checkTime();
        break;
      }
      case 'ติดตามยา': {
        (async () => await setTracking('drugTrackingCount'))();
        navigation.navigate('TelePharmacist');
        break;
      }
      case 'รับยาทางไปรษณีย์': {
        (async () => await setTracking('pickupByEmsCount'))();
        Linking.openURL('https://lin.ee/gymFOp1');
        break;
      }
      case 'วิธีใช้งาน':
        navigation.navigate('FaqMain');
        break;
      case 'สอบถาม':
        checkIfVerify();
        break;
      case 'วิดีโอ':
        navigation.navigate('KnowledgeVideo');
      case 'ยิ่งเล่น ยิ่งรู้': {
        (async () => await setTracking('gameCount'))();
        Linking.openURL(
          'https://wordwall.net/resource/24252578/hypohyperglycemia',
        );
        break;
      }
      default:
        routeAuth(icon);
        break;
    }
  };

  // NOTE Render chunk of icon
  const renderIconService = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[
          {
            flexDirection: 'row',
            width: '100%',
          },
          item.length == chunk && { justifyContent: 'space-around' },
        ]}
      >
        {item.map((icon, i) => {
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.9}
              onPress={() => onclickHandler(icon)}
              style={{ ...styles.iconParent }}
            >
              <View
                style={[
                  styles.contentServiceIcon,
                  { marginLeft: i == 0 ? 20 : 0 },
                ]}
              >
                <View
                  style={{
                    backgroundColor: '#0A5C3E',
                    borderRadius: 50,
                    width: 70,
                    height: 70,
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={icon.icon}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
                <Text bold style={{ color: '#0A5C3E' }} caption1>
                  {icon.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View>
      <Carousel
        ref={cRef}
        layout="default"
        data={dataMenu}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderIconService}
        onSnapToItem={index => setActiveIndex(index)}
      />
      {dataMenu.length > 0 && (
        <Pagination
          dotsLength={dataMenu.length}
          carouselRef={cRef}
          tappableDots={true}
          activeDotIndex={activeIndex}
          containerStyle={{
            backgroundColor: '#fff',
            paddingTop: 5,
            paddingBottom: 0,
          }}
          dotStyle={{
            borderRadius: 5,
            width: 9,
            height: 9,
            // marginHorizontal: 3,
            backgroundColor: '#09B678',
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
        />
      )}
    </View>
  );
};

export default CarouselMenu;
