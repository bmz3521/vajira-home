import React, { Component, Fragment } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  AppRegistry,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  ClinicPackageItem,
  ProfileDescription,
  ProfilePerformance,
  StepProgress,
  Tag,
  HelpBlock,
  Button,
} from '@components';
import { NavigationEvents } from '@react-navigation/compat';

import styles from './styles';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { QRScannerView } from 'react-native-qrcode-scanner-view';

import { RNCamera as Camera } from 'react-native-camera';
import { Colors, Dimens as D } from '@resource';

// Load sample data
import { UserData, PackageData, WorkProgressData, HelpBlockData } from '@data';
import { Images } from '../../theme-config/images';

export default class CareInfoPage extends Component {
  constructor(props) {
    super();
    this.state = {
      clinicPackageItem: PackageData[0],
      workProgress: WorkProgressData,
      helpBlock: HelpBlockData,
      userData: UserData[0],
      focusedScreen: false,
      torchOn: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const { clinicPackageItem, workProgress, helpBlock, userData } = this.state;

    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title={this.props.navigation.state.params.title}
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
            navigation.goBack();
          }}
        />
        <View
          style={{
            borderBottomColor: '#f7f7f7',
            borderBottomWidth: 20,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 14,
          }}
        />

        <ScrollView>
          <ProfileDescription
            image={userData.image}
            name={userData.name}
            subName={userData.major}
            description={userData.address}
            style={{ marginTop: 0, paddingHorizontal: 20, marginBottom: 14 }}
          />
          <View
            style={{
              borderBottomColor: '#f7f7f7',
              borderBottomWidth: 7,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 14,
            }}
          />
          <View style={{ padding: 0 }}>
            <View style={{ paddingHorizontal: 20 }}>
              <Text headline semibold style={{ fontSize: 16 }}>
                การวินิจฉัย
              </Text>
              <Text style={{ fontsize: 14, marginTop: 5, marginBottom: 30 }}>
                อาการบวมเฉพาะที่ ก้อน และไต ที่คอ
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: 7,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 14,
              }}
            />
            <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
              <Text headline semibold style={{ fontSize: 16 }}>
                รายการยา
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text bold style={{ marginTop: 5 }}>
                  1x
                </Text>
                <Text style={{ marginTop: 5 }}>
                  {'                        '}FREE T3
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text bold style={{ marginTop: 5 }}>
                  1x
                </Text>
                <Text style={{ marginTop: 5 }}>
                  {'                        '}FREE T4
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: 7,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 14,
              }}
            />
            <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
              <Text headline semibold style={{ fontSize: 16 }}>
                สรุปรายการการรักษา
              </Text>
              <Text body2 style={{ marginTop: 5 }}>
                - Chest PA
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: 7,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 14,
              }}
            />
            <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
              <Text headline semibold style={{ fontSize: 16 }}>
                จะต้องรักษายังไงต่อที่บ้าน
              </Text>
              <Text body2 style={{ marginTop: 5 }}>
                ควรกลับมาพบแพทย์อีกครั้ง ภายในสองเดือน
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: '#f7f7f7',
                borderBottomWidth: 7,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 14,
              }}
            />
            <View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
              <Text headline semibold style={{ fontSize: 16 }}>
                โรคที่เกี่ยวข้องและควรระวัง
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text bold style={{ marginTop: 20, fontSize: 30 }}>
                  1
                </Text>
                <Text style={{ marginTop: 30 }}>{'    '}Thyroid Cyst</Text>
                <Button
                  style={{
                    height: 30,
                    width: 150,
                    marginTop: 20,
                    borderRadius: 30,
                    marginLeft: 110,
                    fontSize: 14,
                  }}
                >
                  อ่านเพิ่มเติม
                </Button>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text bold style={{ marginTop: 30, fontSize: 30 }}>
                  2
                </Text>
                <Text style={{ marginTop: 30 }}>{'    '}เบาหวาน</Text>
                <Button
                  style={{
                    height: 30,
                    width: 150,
                    marginTop: 20,
                    borderRadius: 30,
                    marginLeft: 135,
                    fontSize: 14,
                  }}
                >
                  อ่านเพิ่มเติม
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const s = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

const stylesQr = StyleSheet.create({
  imgQRCode: {
    height: D.dp40,
    width: D.dp40,
    resizeMode: 'contain',
    marginBottom: D.dp32,
    alignSelf: 'center',
  },
  rectStyle: {
    marginBottom: D.dp80,
  },
  titleBar: {
    marginTop: StatusBar.currentHeight + D.dp16,
    paddingHorizontal: D.dp16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBottomMenu: {
    height: D.dp24,
    width: D.dp24,
    resizeMode: 'contain',
  },
  cornerStyle: {
    borderColor: Colors.white_fff,
    height: D.dp16,
    width: D.dp16,
    borderWidth: D.dp3,
  },
  flashlightWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: '54%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgFlashlight: {
    width: D.dp24,
    height: D.dp24,
    resizeMode: 'contain',
  },
  flashlightText: {
    color: Colors.white_fff,
    fontSize: D.dp12,
    marginTop: D.dp4,
  },
  titleText: {
    color: Colors.white_fff,
    fontSize: D.dp16,
  },
  subTitleText: {
    color: Colors.white_fff,
    fontSize: D.dp12,
  },
  imgBack: {
    height: D.dp20,
    width: D.dp20,
    resizeMode: 'contain',
  },
  titleContainer: {
    paddingHorizontal: D.dp16,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: StatusBar.currentHeight + D.dp8,
    flexDirection: 'row',
  },
});

AppRegistry.registerComponent('default', () => CareInfoPage);
