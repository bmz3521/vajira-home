import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class ListYourSpace extends Component {
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
          title="List your space"
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
          <View style={styles.filterItem}>
            <View style={{}}>
              <View>
                <Text body1 bold style={{ marginBottom: 40 }}>
                  Let's set up your listing
                </Text>
                <Text body2>Property and guests</Text>
              </View>
            </View>
            <Button
              style={{
                marginTop: 50,
                width: 120,
                height: 40,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#284F30',
              }}
            >
              <Text style={{ color: '#fff' }}>Continue</Text>
            </Button>
          </View>
        </View>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Location
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Amenities
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Photos
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Title
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Booking settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Availability
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Pricing
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contain}>
          <View style={styles.filterItem}>
            <Text body2 grayColor>
              Review
            </Text>
          </View>
        </TouchableOpacity>

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
