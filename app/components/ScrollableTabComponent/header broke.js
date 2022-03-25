import React, { Component } from "react";
import { Text, View, TouchableOpacity, FlatList, ScrollView, Animated, TouchableHighlight, StyleSheet } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";
import {
    Card,
    Button,
    ClinicPackageItem,
    ClinicItem,
    Tag,
    Icon,
    Header
} from "@components";
import * as Utils from "@utils";

import { Images, BaseColor } from "@config";
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
// import { ClinicPackageData } from "@data";
import TabBar from './TabBar'

export default class ScrollableTabComponent extends Component {
    constructor(props) {
        super(props);
        const scrollAnim = new Animated.Value(0);
        const offsetAnim = new Animated.Value(0);

        this.state = {
            loading: false,
            enableFlatListScrollViewScroll: false,   
            scrollAnim,
            offsetAnim,
            scrollY: new Animated.Value(0),
            heightHeader: Utils.heightHeader(),
            clampedScroll: Animated.diffClamp(
                Animated.add(
                    scrollAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                        extrapolateLeft: "clamp"
                    }),
                    offsetAnim
                ),
                0,
                40
            )
        };
        // this.onChangeView = this.onChangeView.bind(this);
        // this.onFilter = this.onFilter.bind(this);
        // this.onChangeSort = this.onChangeSort.bind(this);

    }


    onChangeTab = (tabSelected, tabId) => {

        console.log(tabSelected, tabId);
        this.props.changeTabTrigger(tabSelected,tabId);

        this.tabView.goToPage(tabId);

    }

    handleTabChangeParent = (val) => {
      console.log("handle change tab parent")
      console.log(val);
      console.log("handle change tab parent")

    // if (index.i == 0) {this.props.changeTab(index);}
    // if (index.i == 1) {console.log("working"); this.props.changeTab(index);}
    // if (index.i == 2) this.props.changeTab(index);
    // if (index.i == 3) this.props.changeTab(index);

    if (val == 0) this.onChangeTabChild(val);
    if (val == 1) this.onChangeTabChild(val);
    if (val == 2) this.onChangeTabChild(val);
    if (val == 3) this.onChangeTabChild(val);
  }


    handleScroll = () => {
        console.log("test work");
        // Need to check to prevent null exception. 
        this.props.handleScroll(); // Same as this.props.onPress && this.props.onPress();
      }

      enableFlatlistScroll = () => {
        console.log("test work");

        this.setState({ enableFlatListScrollViewScroll: true });

        // Need to check to prevent null exception. 
         // Same as this.props.onPress && this.props.onPress();
      }

      disableFlatlistScroll = () => {
        console.log("test work");

        this.setState({ enableFlatListScrollViewScroll: false });

        // Need to check to prevent null exception. 
      }


  handleTabChange = (index, tabName) => {
      console.log("handle change tab")
      console.log(index.i);
    // if (index.i == 0) {this.props.changeTab(index);}
    // if (index.i == 1) {console.log("working"); this.props.changeTab(index);}
    // if (index.i == 2) this.props.changeTab(index);
    // if (index.i == 3) this.props.changeTab(index);

    if (index.i == 0) this.onChangeTab('clinicPackages', index.i);
    if (index.i == 1) this.onChangeTab('clinic', index.i);
    if (index.i == 2) this.onChangeTab('doctor', index.i);
    if (index.i == 3) this.onChangeTab('diary', index.i);
  }

//   componentDidUpdate = () => {
//       let activePageId = this.props.activePage;
//       this.onChangeTabChild(activePageId);
//   }

  onChangeTabChild = (tabId) => {
    console.log("tabSelected");
    console.log("tabSelected child");

    console.log("tabId" + tabId);
    console.log("tabSelected child");

  this.tabView.goToPage(tabId);

  }
  
  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    // const clampedScroll = this.props.clampedScroll;
    const navbarTranslate = clampedScroll.interpolate({
        inputRange: [0, 40],
        outputRange: [0, -40],
        extrapolate: "clamp"
    });

    return (
    <Animated.View    
       style={{ transform: [{ translateY: navbarTranslate }]}
    }
    >
    <TouchableHighlight
      key={`${name}_${page}`}
      onPress={() => onPressHandler(page)}
      onLayout={onLayoutHandler}
      style={{flex: 1, width: 100, }}
      underlayColor="#aaaaaa"
    >
      <Text>{name}</Text>
    </TouchableHighlight>
    </Animated.View>
    );
  }

    render() {
        const { modeView, cars, refreshing, clampedScroll, loading, heightHeader } = this.state;

        const {changeTabTrigger, style, title, location, time, image, onPress, clinicPackage, clinicData, scrollable, onScroll, activeTabBar, clinics, doctors } = this.props;
       
        const headerMaxHeight = 150;
const HEADER_MIN_HEIGHT = 60;

const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 60

const HEADER_SCROLL_DISTANCE = headerMaxHeight - HEADER_MIN_HEIGHT;

const heightImageBanner = Utils.scaleWithPixel(140);
const marginTopBanner = heightImageBanner - heightHeader;

        console.log("clinicPackage");

        // console.log(this.props.myScroll);

        console.log("clinicPackage");

        console.log(this.state.enableFlatListScrollViewScroll);

        const headerHeight = this.state.scrollAnim.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [headerMaxHeight, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
          });

        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, 50, 100],
            outputRange: [0, -100, -200],
            extrapolate: "clamp"
        });

        const imageOpacity = this.state.scrollAnim.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
          });
          const imageTranslate = this.state.scrollAnim.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
          });
       
        return (
            <View style={{ flex: 1  }}>

            <Animated.View
            style={[
                {flex: 1, marginTop: 0},
                // { transform: [{ translateY: navbarTranslate }] }

            ]}>
            <ScrollableTabView
            // maxHeight={600}
            ref={(tabView) => { this.tabView = tabView}}
            style={{ backgroundColor: 'white', zIndex: 1, flex: 1, position: 'absolute', top: 0}}
            initialPage={0}
            renderTabBar={() => 
                    (
                    <ScrollableTabBar 
                        style={{backgroundColor: 'white', zIndex: 10, height: 0, position: 'absolute', top: 0}} 
                    />)
                }
            onChangeTab={this.handleTabChange}
            tabBarUnderlineStyle={{backgroundColor: 'black'}}
            prerenderingSiblingsNumber={0}
            // scrollEnabled={false}
          >
              
        <View tabLabel='Package'
          tabView={this.tabView}
                    style={{ backgroundColor: 'white', paddingHorizontal: 5, paddingTop: 10 , flex: 1}}
                    onChangeTab={({i, ref}) => {this.handleTabChange(i, ref.props.tabLabel)}}
                  
                    >
                      <View style={styles.contentList}>
                           <Text
                                    style={{ marginLeft: 20}}
                                    outline={false}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                            {/* <Icon name="chevron" size={20} style={{ marginRight: 10 }} /> */}
                                   Select Location
                                </Text>
                                <Text
                                    style={{ marginLeft: 20}}
                                    outline={true}
                                    onPress={() =>
                                        this.onSelectFacilities(item)
                                    }
                                >
                                   Filter
                                </Text>
     </View>
     <View>
        <Animated.FlatList
            onPress={this.handlePress}
            columnWrapperStyle={{ marginBottom: 0, marginHorizontal: 0 }}
            scrollEnabled={scrollable}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}            // onEndReachedThreshold={8}
            // onEndReached={() => {
            //     console.log(" On End Reached");
            //     this.handleScroll();
            //     }}
            numColumns={2}
            data={clinicPackage}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicPackageItem
                    grid
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        </View>
    </View>

    
    <View tabLabel='Clinic'

style={{ backgroundColor: 'white', paddingHorizontal: 5 , flex: 1}}

                        onChangeTab={({i, ref}) => {this.handleTabChange(i, ref.props.tabLabel)}}
                        tabView={this.tabView}
                        >
         <View>
        <Animated.FlatList
            onPress={this.handlePress}
            // columnWrapperStyle={{ marginBottom: 0, marginHorizontal: 0 }}
            scrollEnabled={false}
            // onScroll={onScroll}
            // onEndReachedThreshold={8}
            // onEndReached={() => {
            //     console.log(" On End Reached");
            //     this.handleScroll();
            //     }}
            numColumns={1}
            data={clinics}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicItem
                renderList
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        </View>
        {/* <FlatList
            columnWrapperStyle={{ marginBottom: 0, marginHorizontal: 0 }}
            scrollEnabled={scrollable}
            numColumns={2}
            data={clinicData}
            keyExtractor={(item, index) => item.id}
            onEndReached={this.handleScroll}
            onEndThreshold={0}
            renderItem={({ item, index }) => (
                <ClinicPackageItem
                    grid
                    image={item.featureImageM}
                    name={item.name}
                    // location={item.address}
                    city={item.city}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginLeft: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        /> */}
    </View>    
    
    <View tabLabel='Doctor'
        style={{ backgroundColor: 'white', paddingHorizontal: 5, flex: 1 }}
        onChangeTab={({i, ref}) => {this.handleTabChange(i, ref.props.tabLabel)}}
                    tabView={this.tabView}
                    // scrollEnabled={true}
                 
                    >
              
                    <View 
                        style={{ flex: 1 }}

                    onStartShouldSetResponderCapture={() => {
                        //   this.setState({ enableScrollViewScroll: false });
                        console.log("not firing")

                          if (this.props.myScroll._value < 132
                     ) {
                            this.props.enableScrollViewScrollFunction();
                            this.disableFlatlistScroll();

                            console.log("firing")
                            // this.setState({ enableScrollViewScroll: true });
                          }

                    //       if (this.props.myScroll._value > 132
                    //  ) {
                            this.props.disableScrollViewScroll();
                            this.enableFlatlistScroll();

                            console.log("firing enable flatlist")
                            console.log(this.state.enableFlatListScrollViewScroll)
                            // this.setState({ enableScrollViewScroll: true });
                          }
                        }
                        >
         
        
        <Animated.FlatList
            contentContainerStyle={{ flexGrow: 1 }}

            // style={{paddingTop: 500, marginTop: -500}}
            // onPress={this.handlePress}
            scrollEnabled={this.state.enableFlatListScrollViewScroll}
            nestedScrollEnabled={this.state.enableFlatListScrollViewScroll}
            // scrollEnabled={this.state.enableFlatListScrollViewScroll}
            // scrollEnabled={false}
            // onScroll={onScroll}
            // onEndReachedThreshold={8}
            // onEndReached={() => {
            //     console.log(" On End Reached");
            //     this.handleScroll();
            //     }}d
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollAnim
                            }
                        }
                    }
                ],
                { useNativeDriver: true }
            )}
            numColumns={1}
            data={doctors}
            keyExtractor={(item, index) => item.id}
            renderItem={({ item, index }) => (
                <ClinicItem
                renderList
                    image={item.featureImageM}
                    name={item.firstName + ' ' + item.lastName}
                    // location={item.address}
                    city={item.lastName}
                    country={item.country}
                    price={item.price}
                    // available={item.available}
                    rate={item.clinicRating}
                    rateStatus={item.rateStatus}
                    numReviews={item.ClinicReviews ? item.ClinicReviews.length : ''}
                    // services={item.services}
                    style={
                        index % 2 ? { marginHo: 15 } : {}
                    }
                    onPress={() =>
                        navigation.navigate("ClinicDetail", {name: item.name})
                    }
                />
            )}
        />
        </View>
        </View>

    
  </ScrollableTabView>
  </Animated.View>

  <Animated.View style={[{ position: 'absolute', top: 0, left: 0},
     {transform: [{ translateY: headerHeight}]},
]}>
                  
                  <Animated.Image
    style={[
        {position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: headerMaxHeight,
        resizeMode: 'cover'},
        {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
    ]}
    source={Images.topSplash}
    />
                 
                  <Header
                    title="Dentistry"
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
                        if (loading) {
                            return (
                                <ActivityIndicator
                                    size="small"
                                    color={BaseColor.primaryColor}
                                />
                            );
                        }
                    }}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                    // renderBottom={() => { return (
                   
                    // )}}
                />

     <Animated.View 
    //  style={{height: headerHeight, top: 0, left: 0}}
     >
            <View
                style={[
                    styles.searchForm,
                    { marginTop: 10 }
                ]}
            >
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Search")
                    }
                    activeOpacity={0.9}
                    style={{
                      
                      }}
                >
                <View style={{flexDirection: 'row'}}>
                     <Icon name="search" size={20} style={{ marginRight: 10 }} />
                    <View>
                        <Text body1>
                            Try "Dentistry in Bangkok" 
                        </Text>
                    </View>
                    </View>
                </TouchableOpacity>
            </View>
        <View style={{ alignItems: "center" }}>
      
        </View>
        <View style={styles.contentList}>
       
                <Tag
                    style={{ marginLeft: 20}}
                    outline={false}
                    onPress={() =>
                        this.onSelectFilter()
                    }
                >
                   Sorting
                </Tag>
                <Tag
                    style={{ marginLeft: 20}}
                    outline={true}
                    onPress={() =>
                        this.onSelectFilter()
                    }
                >
                   Filter
                </Tag>
    </View>

    <ScrollableTabView
             ref={(tabView) => { this.tabView = tabView}}
             tabBarBackgroundColor={'white'}
  
            renderTabBar={() => 
              <ScrollableTabBar 
              style={{backgroundColor: 'white', zIndex: 10}} 
              />

            }
          >
            <View tabLabel="Package" 
                        tabView={this.tabView}  
                        onPress={() => this.handleTabChangeParent(0)}/>

            <View 
            tabView={this.tabView}  
            tabLabel="Clinic"
             onPress={() => this.handleTabChangeParent(1)}
            // onPress={({i, ref}) => {this.handleTabChangeParent(i, ref.props.tabLabel)}}
            />
            <View 
            tabView={this.tabView}  
            tabLabel="Doctor" onPress={() => this.handleTabChangeParent(2)}/>

              </ScrollableTabView>
              </Animated.View>
    </Animated.View>
  </View>
        );
    }
}

ScrollableTabComponent.propTypes = {
    image: PropTypes.node.isRequired,
    title: PropTypes.string,
    time: PropTypes.string,
    location: PropTypes.string,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func
};

ScrollableTabComponent.defaultProps = {
    image: Images.profile2,
    title: "BBC Music Introducing",
    time: "Thu, Oct 31, 9:00am",
    location: "Tobacco Dock, London",
    style: {},
    onPress: () => {}
};

const scrollStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    scrollContainer: {
      padding: 16
    }, 
    title: {
      fontSize: 24,
      marginVertical: 16
    }
  })