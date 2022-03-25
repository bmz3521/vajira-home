import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class InviteFriends extends Component {
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
          title="Invite friends"
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
        <ScrollView>
          <View style={styles.contain}>
            <View style={{ width: '100%' }}>
              <Text body1 bold>
                Invite your friends,
              </Text>
              <Text body1 bold>
                earn travel credit
              </Text>

              <Text style={{ marginTop: 10, marginBottom: 20 }}>
                For each friend who uses your referral links to list their
                hospital or anything in between, you’ll earn a travel credit.
              </Text>

              <Button
                style={{
                  backgroundColor: '#284F30',
                  width: 170,
                  height: 40,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: '#fff' }}>Share your link </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
