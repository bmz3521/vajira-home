import React, { Component } from 'react';
import { RefreshControl, FlatList, View, Text, ScrollView } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import {
  Header,
  SafeAreaView,
  PostItem,
  Animated,
  ProfileAuthor,
  Icon,
  EventCard,
  CarouselComponent,
  CardListMedication,
  EventItem,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';

// Load sample data
import { PostData } from '@data';

export default class Allergy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      Medications: PostData,
      data: [
        {
          id: '1',
          image: Images.trip1,
          title: 'โรคภูมิแพ้',
          subtitle: 'นพ. ธันตกร รพ.วชิรพยาบาล',
          rate: '1 เม็ดเช้ากลางวันเย็นหลังอาหาร',
          content:
            'ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น',
        },
        {
          id: '2',
          image: Images.trip2,
          title: 'ภูมิแพ้อาหารทะเลเปลือกแข็ง',
          subtitle: 'นพ. ธันตกร รพ.วชิรพยาบาล',
          rate: '2 เม็ดเช้าเย็น',
          content:
            'ในช่วงไม่กี่ปีที่ผ่านมา สังคมกำลังให้ความสนใจเกี่ยวกับประสบการณ์ในเรื่องคนที่กำลังจะเสียชีวิตและการเสียชีวิตมากขึ้นเรื่อย ๆ มีหลายเหตุผลที่ทำให้เกิดเหตุการณ์นี้แต่มีหลายคนที่อาจจะโต้แย้งว่าธุรกิจที่เกี่ยวข้องกับเรื่องความตายเน้นเรื่องผลกำไรมากกว่าให้ความสำคัญกับตัวบุคคล ซึ่งมันทำให้แต่ละคนรู้สึกไม่สบายใจเมื่อคิดถึงเรื่องการตายของตนเอง BJ Miller ผู้บริหารระดับสูงของ Zen Hospice Project ในเมืองซานฟรานซิสโกได้กล่าวไว้ในรายการ TED talk 2015 ว่าการตายนั้นเป็นสิ่งที่หลีกเลี่ยงไม่ได้ เราไม่ควรมองว่าการเสียชีวิตนั้นเป็นบทสุดท้ายของชีวิตคนคนหนึ่ง การเสียชีวิตนั้นไม่ควรเกิดขึ้นในความเงียบและโดดเดี่ยว ทุกคนต้องการการสนับสนุนเมื่อตนเองกำลังก้าวผ่านช่วงเวลาเหล่านี้ของชีวิต หลายคนคาดหวังให้การเสียชีวิตเป็นไปอย่างสง่างาม เต็มไปด้วยความรักและความเคารพ อย่างไรก็ตามโรงพยาบาลส่วนใหญ่ที่ดูแลผู้ป่วยระยะสุดท้ายนั้นไม่ได้ถูกออกแบบมาเพื่อสนับสนุนการดูแลผู้ป่วยกลุ่มนี้ นอกจากนั้นหลายคนก็อยากเลือกสถานที่และวิธีการเสียชีวิตของตนเองซึ่งไม่ได้จำกัดอยู่เพียงแต่ภายในโรงพยาบาลเท่านั้น',
        },
      ],
      relate: [
        {
          id: '0',
          image: Images.trending1,
          title: 'พารา',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending2,
          title: 'แอนซิลิน',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending3,
          title: 'โรคผิวหนัง',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending4,
          title: 'ความสวย',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending5,
          title: 'ผิวหน้า',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending6,
          title: 'ระบบสืบพันธุ์',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending7,
          title: 'สุขภาวะ',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
        {
          id: '1',
          image: Images.trending8,
          title: 'รักษาทางเลือก',
          time: 'Thu, Oct 31, 9:00am',
          location: 'Tobacco Dock, London',
        },
      ],
    };
  }

  render() {
    const { navigation } = this.props;
    const {
      promotion,
      packages,
      clinics,
      heightHeader,
      normalClinics,
      relate,
      search,
      data,
    } = this.state;

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="รายการโรคภูมิแพ้ประจำตัว"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          onPressLeft={() => {
            navigation.navigate('Home');
          }}
        />
        <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: 'always' }}
        >
          <ScrollView scrollEventThrottle={8}>
            <View
              style={{
                marginTop: 5,
              }}
            ></View>

            <View style={{ paddingRight: 10 }}>
              <Text
                title3
                bold
                style={{
                  fontWeight: 'bold',
                  marginLeft: 20,
                  marginBottom: 10,
                  marginTop: 12,
                }}
              >
                สิ่งที่ต้องระวัง
              </Text>
              <FlatList
                contentContainerStyle={{
                  marginBottom: 12,
                }}
                refreshControl={
                  <RefreshControl
                    colors={[BaseColor.primaryColor]}
                    tintColor={BaseColor.primaryColor}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {}}
                  />
                }
                data={data}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) => (
                  <CardListMedication
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    rate={item.rate}
                    style={{ marginBottom: 20 }}
                    onPress={() => {
                      navigation.navigate('MedicationDetail', {
                        ImageBanner: item.image,
                        otherParam: 'anything you want here',
                        content: item.content,
                        subtitle: item.subtitle,
                      });
                    }}
                  />
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}
