import React from 'react';
import { View, Image, Text, ScrollView, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { Header, SafeAreaView, Icon } from '@components';
import Lightbox from 'react-native-lightbox';
import { Button } from '@components';
import { themeOfInfo, themeTreatment } from '../theme';
import CardChatbot from '../components/CardChatbot';
import { defaultStyle } from '../styles';

export const Elbow = props => {
  if (props.item.isQuestionCarousel) {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.headContainer}>
          <Text style={defaultStyle.headTitle}>{props.item.text}</Text>
        </View>
        <Card
          containerStyle={{
            maxWidth: '95%',
            borderRadius: 15,
            overflow: 'hidden',
            paddingTop: 10,
            marginLeft: 0,
          }}
        >
          {props.item.data.map(item => (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                paddingRight: 10,
              }}
            >
              <Icon bold name="hand-point-right" size={20} color="#000" />
              <Card.Title
                style={{
                  fontSize: 16,
                  color: '#000',
                  paddingLeft: 10,
                  textAlign: 'left',
                }}
              >
                {item.name}
              </Card.Title>
            </View>
          ))}
        </Card>
        <View style={{ marginTop: 20 }}>
          {props.item.goBack && (
            <Button
              icon={
                <Icon
                  bold
                  name="arrow-left"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
              }
              style={defaultStyle.backBtn}
              onPress={() => props.onBack(props.item.goBack)}
            >
              ย้อนกลับ
            </Button>
          )}
          <Button
            style={defaultStyle.btn}
            onPress={() => props.onPressMe('main')}
          >
            กลับสู่เมนูหลัก
          </Button>
        </View>
      </View>
    );
  }

  if (props.item.isSelfcareCarousel) {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.headContainer}>
          <Text style={defaultStyle.headTitle}>{props.item.text}</Text>
        </View>
        <ScrollView
          style={defaultStyle.scroll}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsHorizontalScrollIndicator={
            Platform.OS == 'android' ? false : true
          }
        >
          {props.item.data.map((item, index) => (
            <CardChatbot
              key={index}
              divContent={false}
              bullet={false}
              title={item.title}
              content={[...item.content]}
              titleStyle={{ color: '#fff' }}
              cardBg={'#f9e68f'}
              titleDv={'#936200'}
              titleBg={'#ba8514'}
              contentDv={'#936200'}
            />
          ))}
        </ScrollView>
        <View style={{ marginTop: 20 }}>
          <Button
            style={defaultStyle.btn}
            onPress={() => props.onPressMe('main')}
          >
            กลับสู่เมนูหลัก
          </Button>
        </View>
      </View>
    );
  }

  if (props.item.isCauseCarousel) {
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.headContainer}>
          <Text style={defaultStyle.headTitle}>{props.item.text}</Text>
        </View>

        <ScrollView
          style={defaultStyle.scroll}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsHorizontalScrollIndicator={
            Platform.OS == 'android' ? false : true
          }
        >
          {props.item.data.map(item => (
            <Card
              key={item.id}
              containerStyle={[
                defaultStyle.card,
                { backgroundColor: '#d8c8a4' },
              ]}
            >
              <View style={{ backgroundColor: '#895a08', paddingTop: 10 }}>
                <Card.Title style={[defaultStyle.cardTitle, { color: '#fff' }]}>
                  {item?.name}
                </Card.Title>
              </View>
              <Image
                style={{ width: 220, height: 180 }}
                resizeMode="cover"
                source={item.source}
              />
              <Button
                style={{
                  height: 35,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                  backgroundColor: '#895a08',
                }}
                onPress={() => props.onPressMe(item.option)}
              >
                เลือก
              </Button>
            </Card>
          ))}
        </ScrollView>
        <View style={{ marginTop: 20 }}>
          <Button
            style={defaultStyle.btn}
            onPress={() => props.onPressMe('main')}
          >
            กลับสู่เมนูหลัก
          </Button>
        </View>
      </View>
    );
  }

  if (props.item.isInfoCarousel) {
    const { content, treatment } = props.item.data;
    const data = content ? [...content] : [];
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.headContainer}>
          <Text style={defaultStyle.headTitle}>{props.item.text}</Text>
        </View>
        <ScrollView
          style={defaultStyle.scroll}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsHorizontalScrollIndicator={
            Platform.OS == 'android' ? false : true
          }
        >
          {data.map((itemInfo, indexInfo) => {
            return (
              <CardChatbot
                key={indexInfo}
                bullet={true}
                title={itemInfo.title}
                content={[...itemInfo.content]}
                cardBg={themeOfInfo[indexInfo].cardBg}
                titleDv={themeOfInfo[indexInfo].titleDv}
                titleBg={themeOfInfo[indexInfo].titleBg}
                contentDv={themeOfInfo[indexInfo].contentDv}
              />
            );
          })}
        </ScrollView>
        {treatment && (
          <View style={{ marginTop: 20 }}>
            <Button
              style={[defaultStyle.btn, { backgroundColor: '#61d290' }]}
              onPress={() => props.onPressMe(treatment)}
            >
              <Icon bold name="plus" size={18} color="#2caa6d" /> การรักษา
            </Button>
          </View>
        )}
        <View style={{ marginTop: 20 }}>
          {props.item?.goBack && (
            <Button
              icon={
                <Icon
                  bold
                  name="arrow-left"
                  size={18}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
              }
              style={defaultStyle.backBtn}
              onPress={() => props.onBack(props.item.goBack)}
            >
              ย้อนกลับ
            </Button>
          )}
          <Button
            style={defaultStyle.btn}
            onPress={() => props.onPressMe('main')}
          >
            กลับสู่เมนูหลัก
          </Button>
        </View>
      </View>
    );
  }

  if (props.item.isTreatmentCarousel) {
    const { content, extra, extraKey } = props.item.data;
    const data = content ? [...content] : [];
    return (
      <View style={defaultStyle.container}>
        <View style={defaultStyle.headContainer}>
          <Text style={defaultStyle.headTitle}>{props.item.text}</Text>
        </View>

        <ScrollView
          style={defaultStyle.scroll}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsHorizontalScrollIndicator={
            Platform.OS == 'android' ? false : true
          }
        >
          {data.map((itemTreat, indexTreat) => {
            return (
              <CardChatbot
                key={indexTreat}
                bullet={true}
                title={itemTreat.title}
                content={[...itemTreat.desc]}
                cardBg={themeTreatment[indexTreat].cardBg}
                titleDv={themeTreatment[indexTreat].titleDv}
                titleBg={themeTreatment[indexTreat].titleBg}
                contentDv={themeTreatment[indexTreat].contentDv}
              />
            );
          })}
        </ScrollView>
        {extra && (
          <>
            <View style={defaultStyle.headContainer}>
              <Text style={defaultStyle.headTitle}>{extra}</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                style={[defaultStyle.btn, { backgroundColor: '#61d290' }]}
                onPress={() => props.onPressMe(extraKey)}
              >
                <Icon bold name="info" size={20} color="#2caa6d" /> ดูเพิ่มเติม
              </Button>
            </View>
          </>
        )}
        <View style={{ marginTop: 20 }}>
          <Button
            style={defaultStyle.btn}
            onPress={() => props.onPressMe('main')}
          >
            กลับสู่เมนูหลัก
          </Button>
        </View>
      </View>
    );
  }
  return <View />;
};
