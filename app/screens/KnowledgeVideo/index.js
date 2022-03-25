import React, { useRef, useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import { Header, SafeAreaView, Icon } from '@components';
import { BaseStyle, BaseColor } from '@config';
import styles from './styles';
import _ from 'lodash';
import { WebView } from 'react-native-webview';

const { height, width } = Dimensions.get('window');

const KnowledgeVideo = ({ navigation }) => {
  // NOTE Id of video must be Unqiue
  const [listVid, setListVid] = useState([
    {
      title: 'วิธีพบแพทย์และเภสัชกร',
      desc: 'วิธีการจองนัดพบแพทย์และเภสัชกร Tele-Medicine and Tele-Pharmacy',
      id: '5RoT2c3YeO4',
      expand: false,
    },
    {
      title: 'วิธีสมัครสมาชิก ผ่านระบบ V KYC',
      desc:
        'แนะนำวิธีการสมัครบัญชีผู้ใช้งานผ่านระบบ V-KYC เพื่อใช้งาน Application VAJIRA@HOME',
      id: 'ocCLoiaovGg',
      expand: false,
    },
    {
      title: 'วิธีการชำระเงินด้วย QR code และ\nติดตามรายการยา',
      desc:
        'แนะนำวิธีการดูผล Swab COVID-19 ง่ายด้วยตนเอง ผ่าน Application VAJIRA@HOME สำหรับคนไข้ของโรงพยาบาลวชิรพยาบาล คณะแพทยศาสตร์วชิรพยาบาล',
      id: 'w1PE6PY3I9c',
      expand: false,
    },
  ]);

  const [searchText, setSearchText] = useState('');
  const [dataFilter, setDataFilter] = useState([]);
  const refAnim = useState([...listVid.map(o => new Animated.Value(0))])[0];

  useEffect(() => {
    const filter = _.filter(listVid, item => {
      return _.includes(_.lowerCase(item.title), _.lowerCase(searchText));
    });
    setDataFilter(filter);
  }, [searchText]);

  const expandItem = (ident, index) => {
    const currentExpand = listVid.findIndex(vid => vid.expand === true); // NOTE find current expand before set.
    const itemRef = [...dataFilter];
    itemRef[index]['expand'] = itemRef[index]['expand'] ? false : true;
    if (itemRef[index]['expand']) {
      itemRef.forEach(o => {
        if (o.id !== ident) {
          o.expand = false;
        }
      });
      listVid.forEach(o => {
        if (o.id !== ident) {
          o.expand = false;
        }
      });
    }
    animhandler(ident, itemRef[index]['expand'], currentExpand);
    setListVid(listVid);
    setDataFilter(itemRef);
  };

  const animhandler = (ident, expand, currentExpand) => {
    const index = listVid.findIndex(vid => vid.id == ident);
    if (currentExpand != -1) {
      Animated.parallel([
        Animated.timing(refAnim[index], {
          toValue: expand
            ? (width - 16) / (16 / 9) + ((width - 16) / (16 / 9)) * 0.5
            : 0,
          duration: 350,
          useNativeDriver: false,
        }),
        Animated.timing(refAnim[currentExpand], {
          toValue: 0,
          duration: 350,
          useNativeDriver: false,
        }).start(),
      ]).start();
    } else {
      Animated.timing(refAnim[index], {
        toValue: expand
          ? (width - 16) / (16 / 9) + ((width - 16) / (16 / 9)) * 0.5
          : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <SafeAreaView style={BaseStyle.safeAreaView} forceInset={{ top: 'always' }}>
      <Header
        title="วิดีโอ"
        textStyle={styles.headerText}
        renderLeft={() => {
          return <Icon bold name="chevron-left" size={20} color="#fff" />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.searchSection}>
        <Icon
          name="search"
          color="#8d8d8d"
          solid
          size={20}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setSearchText(text)}
          placeholder="ค้นหาด้วยคำสำคัญ"
          placeholderTextColor={BaseColor.grayColor}
          value={searchText}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {!_.isEmpty(dataFilter) ? (
            dataFilter.map((vid, index) => {
              return (
                <View
                  key={index}
                  style={{ backgroundColor: '#fff', marginBottom: 10 }}
                >
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.kvcButton}
                    onPress={() => {
                      expandItem(vid.id, index);
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.topicText}>{vid.title}</Text>
                      <Text
                        lineBreakMode="tail"
                        numberOfLines={3}
                        style={{ paddingRight: 8 }}
                      >
                        {vid.desc}
                      </Text>
                    </View>
                    <Icon
                      name={vid.expand ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#0A7C53"
                    />
                  </TouchableOpacity>
                  <Animated.View
                    style={[
                      styles.containerVideo,
                      {
                        height: refAnim[listVid.findIndex(o => o.id == vid.id)],
                      },
                    ]}
                  >
                    <Animated.View
                      style={{
                        width: width - 36,
                        height:
                          (width - 16) / (16 / 9) +
                          ((width - 16) / (16 / 9)) * 0.5,
                        paddingVertical: 20,
                      }}
                    >
                      {vid.expand && (
                        <WebView
                          androidLayerType="hardware"
                          mixedContentMode="always"
                          javaScriptEnabled={true}
                          domStorageEnabled={true}
                          onError={err => {
                            console.log('onError', err);
                          }}
                          renderError={() => (
                            <View style={{ backgroundColor: '#f3f3f3' }}>
                              <Text
                                style={{ textAlign: 'center', fontSize: 16 }}
                              >
                                **ผิดพลาดกรุณาลองใหม่อีกครั้ง
                              </Text>
                            </View>
                          )}
                          allowsFullscreenVideo={true}
                          source={{
                            uri: `https://www.youtube.com/embed/${vid.id}`,
                          }}
                        />
                      )}
                    </Animated.View>
                  </Animated.View>
                </View>
              );
            })
          ) : (
            <View style={styles.noResult}>
              <Text grayColor>No results</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default KnowledgeVideo;
