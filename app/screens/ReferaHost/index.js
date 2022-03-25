import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class ReferHost extends Component {
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
          title="Refer a host"
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
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90%',
          }}
        >
          <Text body1 bold>
            No refer found
          </Text>
          <Text body2 grayColor>
            {' '}
            You have never requestd a refer
          </Text>
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
