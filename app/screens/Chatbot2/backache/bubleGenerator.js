import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import ImageViewerModal from '../components/ImageViewerModal';
import Entypo from 'react-native-vector-icons/Entypo';
import { defaultStyle } from '../styles';
import { Icon, Button } from '@components';

export const Backache = props => {
  if (props.item.morePicture) {
    const { content } = props.item.data;
    console.log('object', props.item.data);
    const dataList = content ? [...content] : [];
    return (
      <View>
        <Card
          containerStyle={[
            {
              backgroundColor: '#fff',
              width: '85%',
              paddingTop: props.title ? 0 : 15,
              maxWidth: 330,
              borderRadius: 13,
            },
            props.cardStyle,
          ]}
        >
          {props.item?.data?.title && (
            <>
              <View style={{ backgroundColor: props.titleBg, paddingTop: 10 }}>
                <Card.Title style={[styles.cardTitle, props.titleStyle]}>
                  {props.item.data.title}
                </Card.Title>
              </View>
              <Card.Divider
                style={[styles.divider, { borderBottomColor: props.titleDv }]}
              />
            </>
          )}
          <ScrollView nestedScrollEnabled={true} style={{ maxHeight: 320 }}>
            {dataList.map((item, index) => (
              <>
                <View key={index} style={{ paddingBottom: 15 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo name="dot-single" size={18} color="#000" />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        paddingVertical: 5,
                        flex: 1,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                  {!item.image &&
                    item.desc.map((subItem, subIndex) => (
                      <Text style={{ fontSize: 15, paddingVertical: 2 }}>
                        {subItem}
                      </Text>
                    ))}
                  {item.image &&
                    item.desc.map((subItem, subIndex) => (
                      <View key={subIndex}>
                        <Text
                          style={{
                            fontSize: 16,
                            paddingVertical: 2,
                            fontWeight: 'bold',
                            color: '#444',
                          }}
                        >
                          {' '}
                          {subItem.label}
                        </Text>
                        {subItem.image && (
                          <ImageViewerModal images={subItem.image}>
                            <View style={{ marginVertical: 15 }}>
                              <Image
                                source={subItem.image}
                                style={styles.thunbnailImage}
                              />
                              <Text style={styles.imageDesc}>
                                กดเพื่อดูรายละเอียด
                              </Text>
                            </View>
                          </ImageViewerModal>
                        )}
                      </View>
                    ))}
                </View>
                <Card.Divider
                  style={
                    index != content.length - 1
                      ? {
                          borderBottomWidth: 1,
                          borderBottomColor: props.contentDv,
                        }
                      : { borderBottomWidth: 0 }
                  }
                />
              </>
            ))}
          </ScrollView>
        </Card>
        <View style={{ marginTop: 15 }}>
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
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 18,
    paddingLeft: 10,
    color: '#000',
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
  divider: { borderBottomWidth: 2, borderBottomColor: '#ee7488' },
});
