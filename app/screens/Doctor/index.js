import React, { Component } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Animated,
  Platform,
} from 'react-native';
import { BaseStyle, BaseColor } from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  DoctorItem,
  FilterSort,
} from '@components';
import styles from './styles';
import * as Utils from '@utils';
// Load sample data
import { DoctorData } from '@data';

export default class Doctor extends Component {
  constructor(props) {
    super(props);
    const scrollAnim = new Animated.Value(0);
    const offsetAnim = new Animated.Value(0);

    // Temp data define
    this.state = {
      refreshing: false,
      modeView: 'grid',
      doctors: DoctorData,
      scrollAnim,
      offsetAnim,
      clampedScroll: Animated.diffClamp(
        Animated.add(
          scrollAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnim,
        ),
        0,
        40,
      ),
    };
    this.onFilter = this.onFilter.bind(this);
    this.onChangeSort = this.onChangeSort.bind(this);

    console.log(this.state.doctors);
  }

  onChangeSort() {}

  /**
   * @description Open modal when filterring mode is applied
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  onFilter() {
    const { navigation } = this.props;
    navigation.navigate('Filter');
  }

  /**
   * @description Open modal when view mode is pressed
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   */
  // onChangeView() {
  //   let { modeView } = this.state;
  //   Utils.enableExperimental();
  //   switch (modeView) {
  //     case 'block':
  //       this.setState({
  //         modeView: 'grid',
  //       });
  //       break;
  //     case 'grid':
  //       this.setState({
  //         modeView: 'list',
  //       });
  //       break;
  //     case 'list':
  //       this.setState({
  //         modeView: 'block',
  //       });
  //       break;
  //     default:
  //       this.setState({
  //         modeView: 'block',
  //       });
  //       break;
  //   }
  // }

  /**
   * @description Render container view
   * @author Passion UI <passionui.com>
   * @date 2019-08-03
   * @returns
   */
  renderContent() {
    const { modeView, doctors, refreshing, clampedScroll } = this.state;
    const { navigation } = this.props;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, 40],
      outputRange: [0, -40],
      extrapolate: 'clamp',
    });
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          contentInset={{ top: 50 }}
          columnWrapperStyle={{
            marginHorizontal: 20,
          }}
          refreshControl={
            <RefreshControl
              colors={[BaseColor.primaryColor]}
              tintColor={BaseColor.primaryColor}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: this.state.scrollAnim,
                  },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          numColumns={2}
          data={doctors}
          key={'grid'}
          keyExtractor={(item, index) => item.id}
          renderItem={({ item, index }) => (
            <DoctorItem
              grid
              // image={item.imgProfile}
              firstName={item.firstName}
              lastName={item.lastName}
              style={{
                marginBottom: 20,
                marginLeft: index % 2 ? 15 : 0,
              }}
              onPress={() => {
                navigation.navigate('CarDetail');
              }}
            />
          )}
        />
        <Animated.View
          style={[
            styles.navbar,
            {
              transform: [{ translateY: navbarTranslate }],
            },
          ]}
        >
          <FilterSort
            modeView={modeView}
            onChangeSort={this.onChangeSort}
            onFilter={this.onFilter}
          />
        </Animated.View>
      </View>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        forceInset={{ top: 'always' }}
      >
        <Header
          title="Doctor"
          subTitle="24 Dec 2018, 2 Nights, 1 Room"
          renderLeft={() => {
            return (
              <Icon
                name="chevron-left"
                size={20}
                color={BaseColor.primaryColor}
              />
            );
          }}
          renderRight={() => {
            return (
              <Icon name="search" size={20} color={BaseColor.primaryColor} />
            );
          }}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {
            navigation.navigate('SearchHistory');
          }}
        />
        {this.renderContent()}
      </SafeAreaView>
    );
  }
}
