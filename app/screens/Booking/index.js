import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import { Header, SafeAreaView, Icon, BookingHistory } from '@components';
import { BookingHistoryData } from '@data';
import styles from './styles';
import { connect } from 'react-redux';
import { AuthActions } from '@actions';
import { bindActionCreators } from 'redux';

import BasicTimeLine from './TimelineComponents/BasicTimeLine';
import CustomTimeLine from './TimelineComponents/CustomTimeLine';
import DotTimeLine from './TimelineComponents/DotTimeLine';
import IconTimeLine from './TimelineComponents/IconTimeLine';
import OverrideRenderTimeLine from './TimelineComponents/OverrideRenderTimeLine';
import RefreshLoadMoreTimeLine from './TimelineComponents/RefreshLoadMoreTimeLine';
import SingleRightTimeLine from './TimelineComponents/SingleRightTimeLine';
import TemplateTimeLine from './TimelineComponents/TemplateTimeLine';
import TimeLinePress from './TimelineComponents/TimeLinePress';
import TwoColumnTimeLine from './TimelineComponents/TwoColumnTimeLine';

class Booking extends Component {
  constructor(props) {
    super(props);

    // Temp data define
    this.state = {
      shouldNotRender: true,
      loading: false,
      refreshing: false,
      bookingHistory: BookingHistoryData,
    };
  }

  checkWhatToRender() {
    let { navigation, auth } = this.props;
    let status = auth.isAuthenticated;
    // console.log(status);
    switch (status) {
      case true:
        setTimeout(() => {
          this.setState({ shouldNotRender: false });
        }, 0);
        break;
      case false:
        setTimeout(() => {
          navigation.navigate('SignIn');
        }, 0);
        break;
      default:
        break;
    }
    const getUserId = async () => {
      let userId = '';
      try {
        userId = (await AsyncStorage.getItem('userId')) || 'none';
      } catch (error) {
        // Error retrieving data
        //   console.log(error.message);
      }
      return userId;
    };

    //   console.log(getUserId.userId);
  }

  onWillFocus() {}

  renderItem(item) {
    return (
      <BookingHistory
        name={item.name}
        checkIn={item.checkIn}
        checkOut={item.checkOut}
        total={item.total}
        price={item.price}
        style={{ paddingVertical: 10, marginHorizontal: 20 }}
        onPress={() => {
          this.props.navigation.navigate('BookingDetail');
        }}
      />
    );
  }

  /**
   * @description Loading booking item history one by one
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  render() {
    const { navigation } = this.props;
    let { refreshing, bookingHistory, shouldNotRender } = this.state;

    // console.log(shouldNotRender);
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        {/* <NavigationEvents onDidFocus={() => this.checkWhatToRender()} /> */}
        <Header
          title="ประวัติการรักษา"
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
            navigation.navigate('Home');
          }}
        />
       <SingleRightTimeLine /> 
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(AuthActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
