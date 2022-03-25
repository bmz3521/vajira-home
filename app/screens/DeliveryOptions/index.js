import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const byMail = [
  {
    title: 'นัดหมายเภสัชกร',
    text:
      'เมื่อมีการสั่งจ่ายยาโดยแพทย์ ท่านต้องนัดหมายเภสัชกรผ่าน Vajira@home เพื่อรับคำปรึกษาเกี่ยวกับยา',
    image: Images.delivery4,
    to: 'MyBookingsUI',
  },
  {
    title: 'ชำระค่าใช้จ่าย',
    text:
      'เมื่อได้รับคำปรึกษาเกี่ยวกับยากับเภสัชกรแล้ว ท่านต้องชำระค่าใช้จ่ายรายการยา หากไม่ชำระ รายการยาของท่านจะไม่ถูกนำส่ง',
    image: Images.delivery5,
    to: 'TelePharmacist',
  },
  {
    title: 'ติดตามยา',
    text:
      'เมื่อท่านชำระค่าใช้จ่ายแล้ว สามารถติดตามสถานะการจัดส่งพร้อมกับ แจ้งยืนยันการรับยาได้ผ่าน VAJIRA@HOME',
    image: Images.delivery6,
    to: 'TelePharmacist',
  },
];

const byStore = [
  {
    title: 'ชำระค่าใช้จ่าย',
    text:
      'ท่านต้องชำระค่าใช้จ่ายรายการยา หากไม่ชำระ รายการยาของท่านจะไม่ถูกนำส่ง\n\n',
    image: Images.delivery5,
    to: 'TelePharmacist',
  },
  {
    title: 'ติดตามยาและพบเภสัชกร',
    text:
      'เมื่อชำระค่าใช้จ่ายแล้วสามารถติดตาม สถานะการจัดส่งพร้อมกับแจ้งยืนยันการรับยา ได้ผ่าน VAJIRA@HOME หลังพบเถสัชกร\nที่ร้านยาใกล้บ้าน',
    image: Images.delivery7,
    to: 'TelePharmacist',
  },
];

function DeliveryOptions({ navigation, route }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    if (route.params.name === 'รับยาทางไปรษณีย์') {
      setCarouselItems(byMail);
    }

    if (route.params.name === 'รับยาที่ร้านยาใกล้บ้าน') {
      setCarouselItems(byStore);
    }

    setLoading(false);
  }, [setCarouselItems]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <View style={styles.card}>
        <Image source={item.image} style={styles.illustration} />
        <View style={styles.contentContainer}>
          <Text style={styles.contentTitle}>{item.title}</Text>
          <Text style={styles.contentDetail}>{item.text}</Text>
          <View style={styles.nextContainer}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate(item.to, { id: 1 })}
            >
              <Text style={styles.nextStyle}>{item.title}</Text>
            </TouchableOpacity>
          </View>
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
        {index !== carouselItems.length - 1 && (
          <View style={{ backgroundColor: '#fff' }}>
            <Text style={styles.smallText}>ถัดไป</Text>
          </View>
        )}
        {index === carouselItems.length - 1 && (
          <View style={{ backgroundColor: '#fff' }}>
            <Text style={styles.smallText}>{}</Text>
          </View>
        )}
      </View>
    ),
    [carouselItems],
  );

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
      <ImageBackground
        source={Images[route.params.image]}
        style={styles.mainIconContainer}
      ></ImageBackground>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" color="0A7C53" />
        </View>
      ) : (
        <>
          {route.params.name == 'รับยาทางไปรษณีย์' ? (
            <View style={styles.textContent}>
              <ScrollView>
                <Text style={styles.title}>การรับยาผ่านช่องทางไปรษณีย์</Text>
                <Carousel
                  layout="default"
                  ref={ref}
                  data={byMail}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={renderItem}
                  onSnapToItem={index => setActiveIndex(index)}
                />
              </ScrollView>
            </View>
          ) : null}

          {route.params.name == 'รับยาที่ร้านยาใกล้บ้าน' ? (
            <View style={styles.textContent}>
              <ScrollView>
                <Text style={styles.title}>การรับยาที่ร้านยาใกล้บ้าน</Text>
                <Carousel
                  layout="default"
                  ref={ref}
                  data={byStore}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={renderItem}
                  onSnapToItem={index => setActiveIndex(index)}
                />
              </ScrollView>
            </View>
          ) : null}

          {route.params.name == 'รับยาที่โรงพยาบาล' ? (
            <View style={[styles.textContent, { marginHorizontal: 15 }]}>
              <ScrollView>
                <Text style={styles.title}>การรับยาที่โรงพยาบาล</Text>

                <Text style={styles.content2}>
                  ท่านสามารถติดต่อเพื่อชำระค่าใช้จ่ายและรับคำปรึกษา
                  เกี่ยวกับการใช้ยากับเภสัชกร ได้ที่แผนกเภสัชกรรม
                  โรงพยาบาลวชิรพยาบาลในเวลาทำการ คือ{' '}
                  <Text style={{ color: '#09B678', fontWeight: 'bold' }}>
                    วันจันทร์ถึงศุกร์ เวลา 08:00 - 16:00 น.
                  </Text>
                </Text>
              </ScrollView>
            </View>
          ) : null}
        </>
      )}
    </SafeAreaView>
  );
}

export default DeliveryOptions;
