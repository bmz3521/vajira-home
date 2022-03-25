import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class SafetyCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: UserData[0].id,
      name: UserData[0].name,
      Fname: UserData[0].Fname,
      Lname: UserData[0].Lname,
      Gender: UserData[0].Gender,
      Bdate: UserData[0].Bdate,
      Pnumber: UserData[0].Pnumber,
      Govid: UserData[0].Govid,
      Emercontact: UserData[0].Emercontact,
      email: UserData[0].email,
      address: UserData[0].address,
      image: UserData[0].image,
      loading: false,
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="Safety Center"
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
          onPressRight={() => {}}
        />
        <View style={styles.contain}>
          <Text>
            Get suppotr for the tools and information you need for safety
          </Text>
          <View style={styles.profileItem}>
            <Text style={{ flexDirection: 'row' }}>Travel Safety Tips</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 15,
            }}
          >
            <TouchableOpacity>
              <View style={styles.buttonSafety}>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Guest.png',
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <Text grayColor style={{ marginTop: 15 }}>
                  For Guest
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View style={styles.buttonSafety}>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Host.png',
                  }}
                  style={{
                    width: 90,
                    height: 90,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />

                <Text grayColor style={{ marginTop: 15 }}>
                  For Host
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.itemtext}>
            <Text>See information about trust and Ever Care security</Text>
          </TouchableOpacity>
        </View>

        <View style={{ padding: 20 }}>
          {/* <Button
                        loading={this.state.loading}
                        full
                        onPress={() => {
                            this.setState(
                                {
                                    loading: true
                                },
                                () => {
                                    setTimeout(() => {
                                        navigation.goBack();
                                    }, 500);
                                }
                            );
                        }}
                    >
                        Confirm
                    </Button> */}
        </View>
      </SafeAreaView>
    );
  }
}
