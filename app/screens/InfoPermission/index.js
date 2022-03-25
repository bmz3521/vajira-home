import React, { Component, Fragment } from 'react';
import { View, ScrollView, FlatList, Image, Linking, StyleSheet, AppRegistry, TouchableOpacity, StatusBar } from "react-native";
import { BaseStyle, BaseColor } from "@config";
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
    Button
    
} from "@components";
import {NavigationEvents} from '@react-navigation/compat';;

import styles from "./styles";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { QRScannerView } from 'react-native-qrcode-scanner-view';

import { RNCamera as Camera } from "react-native-camera";
import { Colors, Dimens as D } from '@resource';

// Load sample data
import { UserData, PackageData, WorkProgressData, HelpBlockData } from "@data";
import { Images } from "../../theme-config/images";

export default class InfoPermission extends Component {
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

    completeFlow = (event) =>{
      const { navigation } = this.props;

      this.props.navigation.navigate("InfoPermission");
    }

    render() {
      const { navigation } = this.props;
      const { clinicPackageItem, workProgress, helpBlock, userData } = this.state;

        return (
          <SafeAreaView
          style={BaseStyle.safeAreaView}
          forceInset={{ top: "always" }}
      >
          <Header
              title="สิทธิที่ยอมรับเพื่อมอบ"
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
                        style={{ marginTop: 0, paddingHorizontal: 20,marginBottom: 14 }}
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
       
           
                  </View>
             <View style={{marginBottom: 30, paddingHorizontal: 20}}>
                
                  <Text headline semibold style={{fontSize: 16}}>
                 โรงพยาบาที่ขอสิทธิ
                  </Text>
                  <View style={{flexDirection:'row'}} >
                  <Text bold style={{ marginTop: 20, fontSize: 30 }}>
                      
                  </Text>
                  <Text  style={{ marginTop: 30 }}>
                  <Icon
                        name="hospital-alt"
                        color={BaseColor.primaryColor}
                        style={{paddingTop: 30}}
                        size={24}
                        solid
                    /> {'    '}โรงพยาบาลสมิติเวช
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
                  </View>
                
             
                  {/* <View style={{marginBottom: 30, paddingHorizontal: 20}}>
                  <Text headline semibold style={{fontSize: 16}}>
                  จะต้องรักษายังไงต่อที่บ้าน
                  </Text>
                  <Text body2 style={{ marginTop: 5 }}>
                  ควรกลับมาพบหมออีกครั้ง ภายในสองเดือน
                  </Text>
                  </View> */}
            
                  <View style={{marginBottom: 30, paddingHorizontal: 20}}>
                
                  <Text headline semibold style={{fontSize: 16}}>
                  สิทธิโรคที่คุณจะมอบให้กับผู้รับ
                  </Text>
                  <View style={{flexDirection:'row'}} >
                  <Text bold style={{ marginTop: 20, fontSize: 30 }}>
                      
                  </Text>
                  <Text  style={{ marginTop: 30 }}>
                  <Icon
                        name="info-circle"
                        color={BaseColor.primaryColor}
                        style={{paddingTop: 30}}
                        size={24}
                        solid
                    /> {'    '}ดูข้อมูลโรคประจำตัว
                  </Text>
                  </View>
                  <View style={{flexDirection:'row'}} >
                  <Text bold style={{ marginTop: 30, fontSize: 30 }}>
                      
                  </Text>
                  <Text style={{ marginTop: 30 }}>
                  <Icon
                        name="info-circle"
                        color={BaseColor.primaryColor}
                        style={{paddingTop: 30}}
                        size={24}
                        solid
                    /> {'    '}ดูข้อมูลแว็คซีน
                  </Text>
                  </View>
                  <View style={{flexDirection:'row'}} >
                  <Text bold style={{ marginTop: 30, fontSize: 30 }}>
                      
                      </Text>
                      <Text style={{ marginTop: 30 }}>
                      <Icon
                        name="info-circle"
                        color={BaseColor.primaryColor}
                        style={{paddingTop: 30}}
                        size={24}
                        solid
                    />   {'    '}ดูข้อมูลโรคภูมิแพ้
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
           
              <Button  onPress={() => {
                            this.setState({ loading: true }, () => {
                                setTimeout(() => {
                                    navigation.navigate("CompletePage");
                                    this.setState({ loading: false });
                                }, 500);
                            });
                        }}
              
              style={{height: 120, width: 120,marginTop: 5, borderRadius: 100, marginLeft: 250, fontSize: 14,}}>ให้สิทธิ</Button>
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

  AppRegistry.registerComponent('default', () => InfoPermission);
