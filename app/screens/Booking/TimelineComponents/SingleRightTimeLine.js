/*React Native TimeLine FlastList*/
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import {
  // Image,
  Icon,
  ClinicItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
  CarouselComponent,
  ImageCardComponent,
} from '@components';
import { NavigationEvents } from '@react-navigation/compat';
import { withNavigation } from '@react-navigation/compat';

class SingleRightTimeLine extends Component {
  constructor() {
    super();
    this.onEventPress = this.onEventPress.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.renderDetail = this.renderDetail.bind(this);

    this.data = [
      {
        time: '24/11/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        description: 'หอผู้ป่วยศัยลกรรมชาย 1',
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'แรกรับที่ PCU เวลา 10.53 น. ผู้ป่วยเดินมาเอง ให้ประวัติว่า มารตรวจตามนัด นัดตรวจ u/s KUB + ฟังผล u/s ฟังผลเลือด PSA วันนี้อาการปกติ ปัสสาวะปกติ ไม่มีปวดท้อง ซักประวัติไม่พบความผิดปกติที่อื่น , มีโรคประจำตัว โรคหัวใจ รักษาที่รพ. ทรวงอก ไม่ขาดยา ไม่แพ้ยา+อาหาร ไม่สูบบุหรี่ ไม่ดื่มสุรา ไม่เคยผ่าตัด, , แนะนำเรื่องการปฏิบัติตัว การรับประทานยาตามแพทย์สั่ง อาการผิดปกติที่ต้องมาพบแพทย์ และมาตรวจตามนัด',
        icd10: '',
      },
      {
        time: '12/11/19',
        title: 'โรงพยาบาลบางบ่อ',
        description: 'ห้อง Emergency Room (ER)',
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'แรกรับที่ PCU เวลา 08.17 น.ผป.เดินมาเองให้ประวัติว่า เวลาปัสสาวะสุดมีเลือดออก ไม่แสบขัด ไม่ไข้ ไม่ปวดท้อง เป็นมา 1 วัน ไม่ได้รักษาที่อื่นมาก่อน ซักประวัติไม่พบความผิดปกติที่ระบบอื่น U/D CAD S/P LAD รักษาที่รพ ทรวงอก ไม่ขาดยา ซักประวัติไม่พบความเจ็บป่วยในอดีตเกี่ยวกับการมาโรงพยาบาลในครั้งนี้ เคยทำบอลลูนหัวใจ ไม่มีประวัติแพ้ยาและสารอาหาร ไม่เคยใช้สารเสพติด ไม่สูบบุหรี่ // ไม่ดื่มสุรา ไม่มีบุคคลในครอบครัวเกี่ยวข้องกับการเจ็บป่วยในครั้งนี้',
      },
      {
        time: '01/11/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        icon: require('../img/place_holder.png'),
        description: 'จุดคัดกรองโรคทั่วไป',
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon6.png',
        screen:
          'แรกรับที่ PCU เวลา 07.43น. ผู้ป่วยเดินมาเองให้ประวัติว่า, ขอใบส่งตัวไปสถาบันโรคทรวงอก case CAD S/P LAD นัด 18/5/60 +เจาะเลือด+นำผลไปรักษาต่อเนื่อง',
      },
      {
        time: '09/10/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        description: 'จุดคัดกรองโรคทั่วไป',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon6.png',
        screen:
          'เวลาปัสสาวะสุดมีเลือดออก ไม่แสบขัด ไม่ไข้ ไม่ปวดท้อง เป็นมา 1 วัน ไม่ได้รักษาที่อื่นมาก่อน ',
      },
      {
        time: '03/10/19',
        title: 'โรงพยาบาลบางบ่อ',
        description: 'จุดคัดกรองประกันสุขภาพ',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'มา F/U ตามนัด TFT ไม่ขาดยา ผู้ป่วยเดินมาซักปว ที่ OPD เวลา 10.00 น. มา F/U มีก่อนที่คอข้างซ้าย ไม่ปวด เป็นมา 1 เดือน ไม่มีเหนื่อยง่าย ไม่มีใจสั่น ทานได้ปกติ โรคประจำตัว TFT แพ้ยาแพ้อาหาร ไม่มีแพ้ยาและอาหาร ไม่สูบบุหรี่แลt ดื่มสุรานานๆครั้ง ไม่เคยผ่าตัด ให้คำแนะนำการดูแลการปฏิบัติตัวและการรับประทานยา การมาตรวจตามนัด Sx note : thyroglossal duct U/S >>> 2*1.9*2.3 cm cystic lesion along Lt paramedian of thyroid cartilage .possible thyroglossal duct cyst RX: refer รพ สป for ENT',
      },
      {
        time: '29/09/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        description: 'จุดคัดกรองประกันสุขภาพ',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon6.png',
        screen:
          'แรกรับที่ OPD เวลา10.45 น. ผู้ป่วยเดินมาเองให้ประวัติว่า มีก้อนโตขึ้นที่คอ ไม่เจ็บคอ ไม่ไข้ ไม่มีเหนื่อย ไม่มีใจสั่น เป็นมา 1 เดือน LMP 11/11/62*4 วัน O2 sat 98% , ปฏิเสธโรคประจำตัว ไม่มีอาการแพ้ยา/ แพ้อาหาร ปฏิเสธการผ่าตัด ปฏิเสธการดื่มสุรา/สูบบุหรี่ ซักประวัติไม่พบความผิดปกติของระบบอื่นๆ ยังไม่ได้รักษาที่ใด',
      },
      {
        time: '28/09/19',
        title: 'โรงพยาบาลบางบ่อ',
        description: 'จุดคัดกรองประกันสุขภาพ',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon6.png',
        screen:
          'ใบแพทย์สมัครงาน บ. พานา ไม่สูบบุหรี่ ไม่ดื่มสุรา ไม่เคยใช้สารเสพติดให้โทษ ไม่เคยใช้ยาลูกกลอน ไม่มี โรคประจำตัว เช่น เบาหวาน โรคความดันโลหิต โรคหัวใจ ไม่มีแพ้ยา ไม่มีแพ้อาหาร ไม่เคยได้รับการผ่าตัด',
      },
      {
        time: '21/07/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        description: 'จุดคัดกรองโรคทั่วไป',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'แรกรับที่ OPD เวลา10.45 น. ผู้ป่วยเดินมาเองให้ประวัติว่า มีก้อนโตขึ้นที่คอ ไม่เจ็บคอ ไม่ไข้ ไม่มีเหนื่อย ไม่มีใจสั่น เป็นมา 1 เดือน LMP 11/11/62*4 วัน O2 sat 98% , ปฏิเสธโรคประจำตัว ไม่มีอาการแพ้ยา/ แพ้อาหาร ปฏิเสธการผ่าตัด ปฏิเสธการดื่มสุรา/สูบบุหรี่ ซักประวัติไม่พบความผิดปกติของระบบอื่นๆ ยังไม่ได้รักษาที่ใด',
      },
      {
        time: '15/05/19',
        title: 'โรงพยาบาลวชิรพยาบาล',
        description: 'จุดคัดกรองโรคทั่วไป',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'ใบแพทย์สมัครงาน บ. พานา ไม่สูบบุหรี่ ไม่ดื่มสุรา ไม่เคยใช้สารเสพติดให้โทษ ไม่เคยใช้ยาลูกกลอน ไม่มี โรคประจำตัว เช่น เบาหวาน โรคความดันโลหิต โรคหัวใจ ไม่มีแพ้ยา ไม่มีแพ้อาหาร ไม่เคยได้รับการผ่าตัด',
      },
      {
        time: '10/02/19',
        title: 'โรงพยาบาลบางบ่อ',
        description: 'จุดคัดกรองโรคทั่วไป',
        icon: require('../img/place_holder.png'),
        imageUrl:
          'https://storage.googleapis.com/ever-storage/react-native/homepages/carousel-object/icon1.png',
        screen:
          'ขอใบส่งตัว รักษาที่รพ. วชิรพยาบาล R/O CA prostate นัด 27/11/62',
      },
    ];
    this.state = { selected: null, hide: true };
  }

  onEventPress(data) {
    this.setState({ selected: data });
    this.setState({ hide: false });

    this.props.navigation.navigate('CareInfoPage', {
      name: 'Brent',
      title: data.title,
    });
  }
  closeObject() {
    this.setState({ hide: true });
  }
  renderSelected() {
    if (this.state.selected)
      return (
        <View
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#cecece',
            marginHorizontal: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#cecece',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: '#2DCFA1',
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Screening
            </Text>

            <View
              style={{
                justifyContent: '',
                righ: 0,
                alignSelf: 'flex-end',
                marginLeft: 210,
              }}
            >
              <TouchableOpacity
                style={styles.itemServiceMany}
                activeOpacity={0.9}
                onPress={() => {
                  this.closeObject();
                }}
              >
                <Icon name={'times'} size={24} color={'white'} solid />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{ marginTop: 0, paddingHorizontal: 20, paddingVertical: 20 }}
          >
            {this.state.selected.screen} at {this.state.selected.time}
          </Text>
        </View>
      );
  }

  renderDetail(rowData, sectionID, rowID) {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>
          <Image source={{ uri: rowData.imageUrl }} style={styles.image} />
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    );
  }

  render() {
    const { hide } = this.state;

    return (
      <View style={styles.container}>
        {/* {hide ? <View/>:<View>{this.renderSelected()}</View>
        } */}
        {/* <View
         style={{
             borderBottomColor: '#f7f7f7',
             borderBottomWidth: 7,
            paddingTop: 15,
             marginLeft: 0,
             marginRight: 0,
         }}
         /> */}
        <Timeline
          style={styles.list}
          data={this.data}
          circleSize={15}
          circleColor="rgba(0,0,0,0)"
          circleColor="#5c9cff"
          lineColor="#5c9cff"
          timeContainerStyle={{
            marginRight: -120,
            marginLeft: 20,
            minWidth: 75,
            marginTop: 0,
          }}
          iconStyle={{ paddingTop: 100 }}
          timeStyle={{
            textAlign: 'center',
            backgroundColor: '#5c9cff',
            color: 'white',
            padding: 5,
            borderRadius: 13,
          }}
          descriptionStyle={{ color: 'gray', marginTop: 30 }}
          options={{
            style: { paddingTop: 5 },
          }}
          innerCircle={'dot'}
          onEventPress={this.onEventPress}
          renderDetail={this.renderDetail}
          separator={false}
          detailContainerStyle={{
            marginTop: 40,
            marginBottom: 20,
            paddingLeft: 5,
            paddingRight: 5,
            marginleft: 20,
            marginRight: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: '#F5F5F5',
          }}
          columnFormat="single-column-left"
        />
      </View>
    );
  }
}

export default withNavigation(SingleRightTimeLine);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
  list: {
    flex: 1,
    marginTop: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionContainer: {
    flexDirection: 'row',
    paddingRight: 50,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 0,
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray',
  },
});
