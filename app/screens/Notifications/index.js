import React, { Component } from "react";
import { RefreshControl, FlatList,Switch } from "react-native";
import { BaseStyle, BaseColor } from "@config";
import { Header, SafeAreaView, Icon, ListThumbCircle, Text } from "@components";
import styles from "./styles";
import { View, ScrollView, TextInput, TouchableOpacity } from "react-native";

// Load sample data
import { NotificationData } from "@data";

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      notification: NotificationData,
      switch1Value: false,
    };
    toggleSwitch1 = (value) => {
        this.setState({switch1Value: value})
        console.log('Switch 1 is: ' + value)
     }
  }

  render() {
    const { navigation } = this.props;
    let { notification } = this.state;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: "always" }}
      >
        <Header
          title="Notification"
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
        <View style={styles.contain}>
          <TouchableOpacity>
            <View style={{ width: "100%" }}>
              <Text body1>Message</Text>

              <Text style={{ marginTop: 10 }}>
                Receive messages from accomodation andcheck-in. Witch includes
                booking requests
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <Text style={{ marginLeft: 10 }}>Email</Text>
            <View>
            <Switch style={{ marginRight: 10 }}
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>
         </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <Text style={{ marginLeft: 10 }}>SMS</Text>
            <Switch style={{ marginRight: 10 }}
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20 }}>
            <View style={{ width: "100%" }}>
              <Text>Promotion</Text>

              <Text style={{ marginTop: 10 }}>
                Receive coupons promotions surveys new product and great ideas
                from Ever Care
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <Text style={{ marginLeft: 10 }}>Email</Text>
            <Switch style={{ marginRight: 10 }}
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileItem}>
            <Text style={{ marginLeft: 10 }}>SMS</Text>
            <Switch style={{ marginRight: 10 }}
            toggleSwitch1 = {this.toggleSwitch1}
            switch1Value = {this.state.switch1Value}/>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
