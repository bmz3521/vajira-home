import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class GetHelp extends Component {
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
          title="Get help"
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

        <View style={{ alignItems: 'center' }}>
          <View style={[styles.searchForm, { marginTop: 10 }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.9}
              style={{}}
            >
              <View style={{ flexDirection: 'row' }}>
                <Icon name="search" size={20} style={{ marginRight: 10 }} />
                <View>
                  <Text body1>Try "Dentistry in Bangkok"</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contain}>
          <TouchableOpacity style={styles.buttonHelp}>
            <View>
              <Text bold style={{ marginLeft: 20 }}>
                Appointment
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonHelp}>
            <View>
              <Text bold style={{ marginLeft: 20 }}>
                How Ever Care works
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHelp}>
            <View>
              <Text bold style={{ marginLeft: 20 }}>
                Prescriptions & Referrals
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHelp}>
            <View>
              <Text bold style={{ marginLeft: 20 }}>
                Partnerships
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonHelp}>
            <View>
              <Text bold style={{ marginLeft: 20 }}>
                What we treat
              </Text>
            </View>
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
