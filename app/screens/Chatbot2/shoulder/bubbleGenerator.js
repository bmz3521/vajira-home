import React from 'react';
import { View, Image, Text, ScrollView, Platform } from 'react-native';
import { Card } from 'react-native-elements';
import { Button } from '@components';
import { themeOfInfo } from '../theme';
import CardChatbot from '../components/CardChatbot';
import { defaultStyle } from '../styles';

export const Shoulder = props => {
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
                { backgroundColor: '#f0912e' },
              ]}
            >
              <View style={{ backgroundColor: '#f0912e', paddingTop: 10 }}>
                <Card.Title style={[defaultStyle.cardTitle, { color: '#fff' }]}>
                  {item?.name}
                </Card.Title>
                <Card.Title style={[defaultStyle.cardTitle, { color: '#fff' }]}>
                  {item?.name2}
                </Card.Title>
              </View>
              <Image
                style={{ width: 220, height: 185 }}
                resizeMode="cover"
                source={item.source}
              />
              <Button
                style={{
                  height: 35,
                  marginLeft: 5,
                  marginRight: 5,
                  marginTop: 5,
                  marginBottom: 2,
                  backgroundColor: '#964003',
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
    const data = props.item.data ? [...props.item.data] : [];
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
