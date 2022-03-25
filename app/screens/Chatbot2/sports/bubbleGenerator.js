import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Card } from 'react-native-elements';
import { Icon, Button } from '@components';
import ImageViewerModal from '../components/ImageViewerModal';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CardChatbot from '../components/CardChatbot';
import { themeSportInfo } from '../theme';
import { defaultStyle } from '../styles';

export const Sport = props => {
  const [update, setUpdate] = useState(false);
  if (props.item.isScrollCarousel) {
    const isOnecolor =
      props.item.isOneColor != undefined ? props.item.isOneColor : false;
    const { content } = props.item.data;
    const data = content ? [...content] : [];
    const isBullet = props.item.bullet != undefined ? props.item.bullet : true;
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
          {data.map((data, index) => {
            return (
              <CardChatbot
                image={data.image ? true : false}
                key={index}
                title={data.title}
                bullet={isBullet}
                inlineImg={data.inlineImg}
                content={data.desc ? [...data.desc] : [data.image]}
                cardBg={isOnecolor ? '#FEFFE2' : themeSportInfo[index].cardBg}
                titleDv={isOnecolor ? '#C3BA85' : themeSportInfo[index].titleDv}
                titleBg={isOnecolor ? '#F0F0CB' : themeSportInfo[index].titleBg}
                contentDv={
                  isOnecolor ? '#DAD5AB' : themeSportInfo[index].contentDv
                }
              />
            );
          })}
        </ScrollView>
        {props.item?.twoMoreBtn && (
          <>
            <Text style={defaultStyle.headTitle}>
              ท่าน "มี" หรือ "ไม่มี" อาการใดอาการหนึ่ง
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                width: 260,
                justifyContent: 'space-around',
                paddingLeft: 10,
              }}
            >
              <Button
                style={[
                  { ...defaultStyle.btn, minWidth: 50, width: 115 },
                  { backgroundColor: '#61d290' },
                ]}
                onPress={() =>
                  props.onPressMe(props.item?.twoMoreBtn?.negative)
                }
              >
                ไม่มีอาการ
              </Button>
              <Button
                style={[
                  { ...defaultStyle.btn, minWidth: 50, width: 115 },
                  { backgroundColor: 'red' },
                ]}
                onPress={() =>
                  props.onPressMe(props.item?.twoMoreBtn?.positive)
                }
              >
                มีอาการ
              </Button>
            </View>
          </>
        )}
        {props.item?.moreBtn && (
          <View style={{ marginTop: 20 }}>
            <Button
              icon={
                <Icon
                  bold
                  name={props.item.moreBtn?.icon}
                  size={18}
                  color="#2caa6d"
                  style={{ marginRight: 10 }}
                />
              }
              style={[defaultStyle.btn, { backgroundColor: '#61d290' }]}
              onPress={() => props.onPressMe(props.item.moreBtn?.val)}
            >
              {props.item.moreBtn?.title}
            </Button>
          </View>
        )}
        <View style={{ marginTop: 15 }}>
          {props.item.goBackSub && (
            <Button
              icon={
                <Icon
                  bold
                  name={props.item.goBackSub?.icon}
                  size={18}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
              }
              style={defaultStyle.backSubBtn}
              onPress={() => props.onBack(props.item.goBackSub?.val)}
            >
              {props.item.goBackSub?.title}
            </Button>
          )}
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
  } else if (props.item.isMainMenuSport) {
    const data = props.item.data ? [...props.item.data] : [];
    return (
      <View style={defaultStyle.container}>
        <ScrollView
          style={defaultStyle.scroll}
          horizontal={true}
          contentContainerStyle={{ paddingVertical: 5 }}
          showsHorizontalScrollIndicator={
            Platform.OS == 'android' ? false : true
          }
        >
          {data.map((item, index) => {
            return (
              <Card key={index} containerStyle={{ ...defaultStyle.card }}>
                <Card.Image source={item.img} />
                <Card.Title>{item.title}</Card.Title>
                <Button
                  style={{
                    height: 35,
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 5,
                    marginBottom: 2,
                    backgroundColor: '#607f02',
                  }}
                  onPress={async () => {
                    await props.saveMessage(item.title);
                    props.onPressMe(item.value);
                  }}
                >
                  เลือก
                </Button>
              </Card>
            );
          })}
        </ScrollView>
      </View>
    );
  } else if (props.item.isFAQSport) {
    const data = props.item.data ? [...props.item.data] : [];
    return (
      <View style={{ width: '100%' }}>
        <Card
          containerStyle={{
            ...defaultStyle.card,
            margin: 0,
            width: '80%',
            borderRadius: 15,
          }}
        >
          <Card.Title
            style={{ fontSize: 18, paddingTop: 15, paddingHorizontal: 5 }}
          >
            {props.item.text}
          </Card.Title>
          <View style={styles.containerlistFAQ}>
            {data.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={{
                      backgroundColor: item.expand ? bgFAQ : null,
                      paddingVertical: 15,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        item.expand = !item.expand;
                        setUpdate(prev => !prev);
                      }}
                    >
                      <View style={styles.containerFAQ}>
                        <Text
                          style={{
                            fontSize: 16,
                            flex: 1,
                            fontWeight: 'bold',
                            color: '#333',
                          }}
                        >
                          {item.title}
                        </Text>
                        <MaterialIcons
                          name={item.expand ? 'expand-less' : 'expand-more'}
                          size={24}
                        />
                      </View>
                    </TouchableOpacity>
                    {item.expand && (
                      <View
                        style={{
                          paddingHorizontal: 15,
                          paddingTop: 15,
                          paddingBottom: 5,
                        }}
                      >
                        {renderDescription(item)}
                      </View>
                    )}
                  </View>
                  <View style={styles.customDivider} />
                </View>
              );
            })}
          </View>
        </Card>
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

  return <View />;
};

const renderDescription = item => {
  if (item.normal) {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={{ maxHeight: 230, paddingHorizontal: 10 }}
      >
        {item.description.length > 1 ? (
          item.description.map((txtDes, i) => {
            return (
              <Text key={i} style={{ ...styles.textLabel, paddingVertical: 2 }}>
                <Text style={{ fontWeight: 'bold' }}>-</Text> {txtDes}
              </Text>
            );
          })
        ) : (
          <Text style={styles.textLabel}>{item.description}</Text>
        )}
      </ScrollView>
    );
  } else if (item.option) {
    return (
      <ScrollView
        style={{ ...defaultStyle.scroll, backgroundColor: bgFAQ }}
        horizontal={true}
        contentContainerStyle={{ paddingVertical: 5 }}
      >
        {item.description.map((data, index) => {
          return (
            <CardChatbot
              bullet={false}
              key={index}
              inlineImg={data.inlineImg}
              // bullet={true}
              title={data.title}
              cardStyle={{ width: 250 }}
              content={[...data.content]}
              cardBg={'#FEFFE2'}
              titleDv={'#C3BA85'}
              titleBg={'#F0F0CB'}
              contentDv={'#DAD5AB'}
            />
          );
        })}
      </ScrollView>
    );
  } else if (item.imageScript) {
    return (
      <ScrollView
        nestedScrollEnabled={true}
        style={{ maxHeight: 230, paddingHorizontal: 10 }}
      >
        {item.description.map((desc, index) => (
          <View key={index}>
            {desc.title && (
              <Text
                style={{
                  ...styles.textLabel,
                  paddingVertical: 2,
                  fontWeight: 'bold',
                }}
              >
                {`- ${desc.title}`}
              </Text>
            )}
            {desc.desc && (
              <Text style={{ ...styles.textLabel, fontSize: 15 }}>
                {desc.desc}
              </Text>
            )}
            {desc.image && (
              <ImageViewerModal images={desc.image}>
                <View style={{ marginVertical: 15 }}>
                  <Image source={desc.image} style={styles.thunbnailImage} />
                  <Text style={styles.imageDesc}>กดเพื่อดูรายละเอียด</Text>
                </View>
              </ImageViewerModal>
            )}
          </View>
        ))}
      </ScrollView>
    );
  }
};

const bgFAQ = '#FDFAF6';

const styles = StyleSheet.create({
  textLabel: {
    fontSize: 15,
    color: '#444',
  },
  containerlistFAQ: {
    paddingBottom: 20,
  },
  customDivider: {
    height: 1,
    backgroundColor: '#E4EFE7',
    width: '100%',
    alignSelf: 'center',
  },
  containerFAQ: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageDesc: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    marginTop: 5,
    marginHorizontal: 5,
  },
  thunbnailImage: {
    borderRadius: 3,
    borderColor: '#e3e3e3',
    borderWidth: 1,
    width: '95%',
    height: 160,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
