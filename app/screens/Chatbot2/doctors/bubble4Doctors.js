import React from 'react';
import { View, Image, Text, ScrollView, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from '@components';

export const UriLink = props => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Card
        containerStyle={{
          padding: 0,
          borderRadius: 15,
          overflow: 'hidden',
          paddingBottom: 7,
          marginLeft: 0,
        }}
      >
        <Image
          style={{ width: 220, height: 210 }}
          resizeMode="cover"
          source={{ uri: props.image }}
        />
        <Card.Divider
          style={{
            marginBottom: 0,
            marginTop: 6,
          }}
        />
        <Button
          style={{
            marginLeft: 5,
            marginRight: 5,
            height: 35,
          }}
          onPress={props.onPressLine}
        >
          {props.message}
        </Button>
      </Card>
      <View style={{ marginTop: 20 }}>
        <Button
          style={{
            marginBottom: 10,
            backgroundColor: '#DAA520',
            paddingHorizontal: 10,
            height: 35,
            width: '60%',
          }}
          onPress={() => props.onPressMe('main')}
        >
          กลับสู่เมนูหลัก
        </Button>
      </View>
    </View>
  );
};

export const DepartmentCarousel = props => {
  return (
    <ScrollView
      style={{ backgroundColor: 'white', marginBottom: 10 }}
      contentContainerStyle={{ paddingVertical: 5 }}
      horizontal={true}
      showsHorizontalScrollIndicator={Platform.OS == 'android' ? false : true}
    >
      {props.data.map(item => (
        <Card
          key={item.title}
          containerStyle={{
            padding: 0,
            borderRadius: 15,
            overflow: 'hidden',
            paddingBottom: 5,
            marginLeft: 0,
          }}
        >
          <Image
            style={{ width: 220, height: 130 }}
            resizeMode="cover"
            source={{ uri: item.image }}
          />
          <Card.Divider />
          <Card.Title>{item.title}</Card.Title>
          <Button
            style={{
              height: 35,
              marginLeft: 5,
              marginRight: 5,
            }}
            onPress={() => props.onPressMe(item.keyword)}
          >
            {props.message}
          </Button>
        </Card>
      ))}
    </ScrollView>
  );
};

export const DoctorCarousel = props => {
  const message = props.message;
  let type = '';
  if (message == 'back_doctors') {
    type = 'ปัญหาของคอและหลัง';
  } else if (message == 'shoulder_doctors') {
    type = 'ปัญหาของไหล่และศอก';
  } else if (message == 'wrist_doctors') {
    type = 'ปัญหาของมือและข้อมือ';
  } else if (message == 'hip_doctors') {
    type = 'ปัญหาของสะโพกและเข่า';
  } else if (message == 'foot_doctors') {
    type = 'ปัญหาของเท้าและข้อเท้า';
  } else if (message == 'bone_doctors') {
    type = 'กระดูกหักและกระดูกพรุน';
  } else if (message == 'sport_doctors') {
    type = 'การบาดเจ็บจากการเล่นกีฬา';
  } else if (message == 'children_doctors') {
    type = 'ความผิดรูปและโรคกระดูกในเด็ก';
  } else if (message == 'tumor_doctors') {
    type = 'เนื้องอกกระดูก';
  }

  return (
    <View
      style={{
        flexDirection: 'column',
        marginRight: 45,
      }}
    >
      <View style={{ marginTop: 20, paddingLeft: 12 }}>
        <Text
          style={{ fontSize: 16, fontWeight: 'bold' }}
        >{`แพทย์ให้คำปรึกษาเรื่อง${type}`}</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 5 }}
        style={{ backgroundColor: 'white', marginBottom: 10 }}
        horizontal={true}
        showsHorizontalScrollIndicator={Platform.OS == 'android' ? false : true}
      >
        {props.data.map(item => (
          <Card
            key={item.title}
            containerStyle={{
              padding: 0,
              borderRadius: 15,
              overflow: 'hidden',
              paddingTop: 10,
              marginLeft: 0,
            }}
          >
            <Card.Title style={{ fontSize: 16 }}>{item.title}</Card.Title>
            <Card.Divider />
            <Button
              style={{
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
                height: 35,
                backgroundColor: '#016400',
              }}
              onPress={() => props.onPressMe([item.cvType, item.cv, 'cv'])}
            >
              ดูประวัติความเชี่ยวชาญ
            </Button>
            <Button
              style={{
                marginBottom: 10,
                marginLeft: 5,
                marginRight: 5,
                height: 35,
                backgroundColor: '#b57009',
              }}
              onPress={() =>
                props.onPressMe([item.tableType, item.table, 'table'])
              }
            >
              ดูวันและเวลาออกตรวจ
            </Button>
            <Image
              style={{ width: '100%', height: 240 }}
              resizeMode="cover"
              source={{ uri: item.image }}
            />
          </Card>
        ))}
      </ScrollView>
      <View style={{ marginTop: 20 }}>
        <Button
          style={{
            marginBottom: 10,
            paddingHorizontal: 10,
            height: 35,
            width: '60%',
          }}
          onPress={() => props.onPressMe('elbow-department')}
        >
          ดูรายการอีกครั้ง
        </Button>
        <Button
          style={{
            marginBottom: 10,
            backgroundColor: '#F08080',
            paddingHorizontal: 10,
            height: 35,
            width: '60%',
          }}
          onPress={() => props.navigation.navigate('TeleSymptom')}
        >
          ปรึกษาแพทย์ทางไกล
        </Button>
        <Button
          style={{
            marginBottom: 10,
            backgroundColor: '#DAA520',
            paddingHorizontal: 10,
            height: 35,
            width: '60%',
          }}
          onPress={() => props.onPressMe('main')}
        >
          กลับสู่เมนูหลัก
        </Button>
      </View>
    </View>
  );
};
