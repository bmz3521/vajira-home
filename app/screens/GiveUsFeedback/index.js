import React, { Component } from 'react';
import { View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { BaseStyle, BaseColor, Images } from '@config';
import { Image, Header, SafeAreaView, Icon, Text, Button } from '@components';
import styles from './styles';

// Load sample data
import { UserData } from '@data';

export default class GiveUsFeedback extends Component {
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
          title="Give us feedback"
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
          <View style={styles.profileItem}>
            <Text title3 bold style={{ marginBottom: 20 }}>
              How do you rate our app?
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Bad-01.png',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Normal-01.png',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Good1-01.png',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={{
                    uri:
                      'https://storage.googleapis.com/ever-storage/icon/mobileapp/Great-01.png',
                  }}
                  style={{
                    width: 35,
                    height: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text body2 grayColor>
              Great
            </Text>
          </View>

          <View
            style={{
              alignItems: 'flex-start',
              marginRight: 40,
              marginBottom: 20,
            }}
          >
            <Text>Can you tell us a little more?</Text>
            <Text grayColor>We’ll use your feedback to improve our app</Text>
          </View>
          <View>
            <View style={styles.textInput}>
              <TextInput>
                <Text grayColor> Add a comments</Text>
              </TextInput>
            </View>
          </View>
        </View>

        <View style={{ padding: 20, marginTop: 50 }}>
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
                        Send feedback
                    </Button> */}
        </View>
      </SafeAreaView>
    );
  }
}
